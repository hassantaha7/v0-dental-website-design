import { verifyAppointment } from "@/app/actions/appointments"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export const dynamic = "force-dynamic"

export default async function VerifyAppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const params = await searchParams
  const token = params.token

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <X className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl text-center">Token manquant</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Le lien de vérification est invalide. Veuillez vérifier votre email et réessayer.
            </p>
            <Button asChild>
              <Link href="/">Retour à l'accueil</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const result = await verifyAppointment(token)

  if (!result.success) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <X className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl text-center">Vérification échouée</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">{result.error}</p>
            <Button asChild>
              <Link href="/">Retour à l'accueil</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { appointment } = result

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Rendez-vous confirmé !</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">Votre rendez-vous a été confirmé avec succès.</p>
          <div className="bg-muted/50 p-4 rounded-lg text-left">
            <p className="text-sm">
              <strong>Patient :</strong> {appointment.firstName} {appointment.lastName}
            </p>
            <p className="text-sm">
              <strong>Date :</strong>{" "}
              {format(new Date(appointment.date), "EEEE d MMMM yyyy", {
                locale: fr,
              })}
            </p>
            <p className="text-sm">
              <strong>Heure :</strong> {appointment.time}
            </p>
          </div>
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-sm text-primary font-medium">
              📍 Dr.Ouss Cabinet Dentaire
              <br />1 rue Jean Jaurès, 78190 Trappes
              <br />📞 09 01 10 10 20
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Nous vous attendons avec impatience. En cas d'empêchement, merci de nous prévenir au moins 24h à l'avance.
          </p>
          <Button asChild className="w-full">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
