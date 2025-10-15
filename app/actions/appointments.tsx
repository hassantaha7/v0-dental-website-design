"use server"

import { createClient } from "@/lib/supabase/server"

export interface AppointmentData {
  appointmentDate: string
  appointmentTime: string
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  phone: string
}

export async function getBookedSlots(date: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("appointments")
      .select("appointment_time")
      .eq("appointment_date", date)
      .eq("is_verified", true)

    if (error) {
      console.error("[v0] Error fetching booked slots:", error)
      return []
    }

    return data.map((slot) => slot.appointment_time)
  } catch (error) {
    console.error("[v0] Error in getBookedSlots:", error)
    return []
  }
}

export async function createAppointment(appointmentData: AppointmentData) {
  try {
    const supabase = await createClient()

    // Generate verification token
    const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    // Insert appointment into database
    const { data, error } = await supabase
      .from("appointments")
      .insert({
        appointment_date: appointmentData.appointmentDate,
        appointment_time: appointmentData.appointmentTime,
        first_name: appointmentData.firstName,
        last_name: appointmentData.lastName,
        date_of_birth: appointmentData.dateOfBirth,
        email: appointmentData.email,
        phone: appointmentData.phone,
        verification_token: verificationToken,
        is_verified: false,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating appointment:", error)
      throw new Error("Cette date et heure sont déjà réservées. Veuillez choisir un autre créneau.")
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend")
        const resend = new Resend(process.env.RESEND_API_KEY)

        const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-appointment?token=${verificationToken}`

        await resend.emails.send({
          from: "Dr.Ouss Cabinet Dentaire <onboarding@resend.dev>",
          to: appointmentData.email,
          subject: "Confirmez votre rendez-vous - Dr.Ouss",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1B9FBD; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0;">Confirmez votre rendez-vous</h1>
              </div>
              <div style="background: white; padding: 30px; border: 1px solid #e5e7eb;">
                <p>Bonjour ${appointmentData.firstName} ${appointmentData.lastName},</p>
                <p>Merci d'avoir pris rendez-vous avec Dr.Ouss Cabinet Dentaire.</p>
                <div style="background: #F8FAFB; padding: 20px; border-radius: 6px; margin: 20px 0;">
                  <h3 style="margin-top: 0;">Détails du rendez-vous:</h3>
                  <p><strong>Date:</strong> ${new Date(appointmentData.appointmentDate).toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                  <p><strong>Heure:</strong> ${appointmentData.appointmentTime}</p>
                  <p><strong>Lieu:</strong> 1 rue Jean Jaurès, 78190 Trappes</p>
                </div>
                <p>Pour confirmer votre rendez-vous, veuillez cliquer sur le bouton ci-dessous:</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${verificationUrl}" style="display: inline-block; background-color: #1B9FBD; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                    Confirmer mon rendez-vous
                  </a>
                </div>
                <p style="color: #666; font-size: 14px;">Si vous n'avez pas demandé ce rendez-vous, vous pouvez ignorer cet email.</p>
              </div>
              <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
                <p>Dr.Ouss Cabinet Dentaire<br>1 rue Jean Jaurès, 78190 Trappes<br>📞 09 01 10 10 20</p>
              </div>
            </div>
          `,
        })
      } catch (emailError) {
        console.error("[v0] Error sending verification email:", emailError)
        // Don't delete the appointment if email fails, just log the error
        console.log("[v0] Appointment created but email failed. Token:", verificationToken)
      }
    } else {
      console.log("[v0] RESEND_API_KEY not configured. Skipping email verification.")
      console.log("[v0] Verification token:", verificationToken)
      console.log(
        "[v0] Verification URL:",
        `${process.env.NEXT_PUBLIC_APP_URL}/verify-appointment?token=${verificationToken}`,
      )
    }

    return { success: true, appointmentId: data.id, token: verificationToken }
  } catch (error) {
    console.error("[v0] Error in createAppointment:", error)
    throw error
  }
}

export async function verifyAppointment(token: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("appointments")
      .update({ is_verified: true })
      .eq("verification_token", token)
      .eq("is_verified", false)
      .select()
      .single()

    if (error || !data) {
      console.error("[v0] Error verifying appointment:", error)
      return {
        success: false,
        error: "Token invalide ou rendez-vous déjà confirmé.",
      }
    }

    return {
      success: true,
      appointment: {
        date: data.appointment_date,
        time: data.appointment_time,
        firstName: data.first_name,
        lastName: data.last_name,
      },
    }
  } catch (error) {
    console.error("[v0] Error in verifyAppointment:", error)
    return {
      success: false,
      error: "Une erreur est survenue lors de la vérification.",
    }
  }
}
