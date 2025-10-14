"use server"

import { createClient } from "@/lib/supabase/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

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
}

export async function createAppointment(appointmentData: AppointmentData) {
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

  // Send verification email
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-appointment?token=${verificationToken}`

  try {
    await resend.emails.send({
      from: "Dr.Ouss Cabinet Dentaire <onboarding@resend.dev>",
      to: appointmentData.email,
      subject: "Confirmez votre rendez-vous - Dr.Ouss",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1B9FBD;">Confirmez votre rendez-vous</h2>
          <p>Bonjour ${appointmentData.firstName} ${appointmentData.lastName},</p>
          <p>Merci d'avoir pris rendez-vous avec Dr.Ouss Cabinet Dentaire.</p>
          <p><strong>Détails du rendez-vous:</strong></p>
          <ul>
            <li>Date: ${new Date(appointmentData.appointmentDate).toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</li>
            <li>Heure: ${appointmentData.appointmentTime}</li>
          </ul>
          <p>Pour confirmer votre rendez-vous, veuillez cliquer sur le bouton ci-dessous:</p>
          <a href="${verificationUrl}" style="display: inline-block; background-color: #1B9FBD; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
            Confirmer mon rendez-vous
          </a>
          <p style="color: #666; font-size: 14px;">Si vous n'avez pas demandé ce rendez-vous, vous pouvez ignorer cet email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">Dr.Ouss Cabinet Dentaire<br>1 rue Jean Jaurès, 78190 Trappes<br>09 01 10 10 20</p>
        </div>
      `,
    })
  } catch (emailError) {
    console.error("[v0] Error sending verification email:", emailError)
    // Delete the appointment if email fails
    await supabase.from("appointments").delete().eq("id", data.id)
    throw new Error("Erreur lors de l'envoi de l'email de vérification. Veuillez réessayer.")
  }

  return { success: true, appointmentId: data.id }
}

export async function verifyAppointment(token: string) {
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
    return { success: false, error: "Token invalide ou rendez-vous déjà confirmé." }
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
}
