"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface BookingData {
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  phone: string
  appointmentDate: string
  appointmentTime: string
}

export async function sendVerificationEmail(data: BookingData) {
  try {
    // Generate a verification token (in production, store this in a database)
    const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify-appointment?token=${verificationToken}`

    // In production, you would store the booking data with the token in a database
    console.log("[v0] Booking data:", data)
    console.log("[v0] Verification token:", verificationToken)

    const { error } = await resend.emails.send({
      from: "Dr.Ouss Cabinet Dentaire <onboarding@resend.dev>",
      to: data.email,
      subject: "Confirmez votre rendez-vous - Dr.Ouss",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #0F2C3F; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #1B9FBD; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
              .button { display: inline-block; background: #1B9FBD; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .info-box { background: #F8FAFB; padding: 20px; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; padding: 20px; color: #6B7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Confirmez votre rendez-vous</h1>
              </div>
              <div class="content">
                <p>Bonjour ${data.firstName} ${data.lastName},</p>
                
                <p>Merci d'avoir pris rendez-vous avec le Cabinet Dentaire Dr.Ouss. Pour confirmer votre rendez-vous, veuillez cliquer sur le bouton ci-dessous :</p>
                
                <div style="text-align: center;">
                  <a href="${verificationUrl}" class="button">Confirmer mon rendez-vous</a>
                </div>
                
                <div class="info-box">
                  <h3 style="margin-top: 0;">Détails de votre rendez-vous :</h3>
                  <p><strong>Date :</strong> ${data.appointmentDate}</p>
                  <p><strong>Heure :</strong> ${data.appointmentTime}</p>
                  <p><strong>Lieu :</strong> 1 rue Jean Jaurès, 78190 Trappes</p>
                </div>
                
                <p>Si vous n'avez pas demandé ce rendez-vous, vous pouvez ignorer cet email.</p>
                
                <p>À bientôt,<br>L'équipe Dr.Ouss</p>
              </div>
              <div class="footer">
                <p>Cabinet Dentaire Dr.Ouss<br>
                1 rue Jean Jaurès, 78190 Trappes<br>
                Tél : 09 01 10 10 20</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Send verification email error:", error)
    return {
      success: false,
      error: "Une erreur est survenue lors de l'envoi de l'email",
    }
  }
}
