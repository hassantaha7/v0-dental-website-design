"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Check, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      return
    }

    // Simulate verification (in production, verify against database)
    setTimeout(() => {
      console.log("[v0] Verifying token:", token)
      setStatus("success")
    }, 1500)
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center">
        {status === "loading" && (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Vérification en cours...</h1>
            <p className="text-muted-foreground">Veuillez patienter</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Rendez-vous confirmé !</h1>
            <p className="text-muted-foreground">
              Votre rendez-vous a été confirmé avec succès. Vous recevrez un email de rappel 24h avant votre
              rendez-vous.
            </p>
            <div className="pt-4">
              <Link href="/">
                <Button>Retour à l'accueil</Button>
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <X className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Erreur de vérification</h1>
            <p className="text-muted-foreground">
              Le lien de vérification est invalide ou a expiré. Veuillez prendre un nouveau rendez-vous.
            </p>
            <div className="pt-4">
              <Link href="/">
                <Button>Retour à l'accueil</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
