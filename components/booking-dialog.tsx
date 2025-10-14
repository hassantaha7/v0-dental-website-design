"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { createAppointment, getBookedSlots } from "@/app/actions/appointments"
import { useToast } from "@/hooks/use-toast"

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
]

export function BookingDialog({ open, onOpenChange }: BookingDialogProps) {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    if (selectedDate) {
      setIsLoadingSlots(true)
      const dateString = format(selectedDate, "yyyy-MM-dd")

      getBookedSlots(dateString)
        .then((slots) => {
          setBookedSlots(slots)
        })
        .catch((error) => {
          console.error("[v0] Error loading booked slots:", error)
          toast({
            title: "Erreur",
            description: "Impossible de charger les créneaux disponibles.",
            variant: "destructive",
          })
        })
        .finally(() => {
          setIsLoadingSlots(false)
        })
    }
  }, [selectedDate, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) return

    setIsSubmitting(true)

    try {
      await createAppointment({
        appointmentDate: format(selectedDate, "yyyy-MM-dd"),
        appointmentTime: selectedTime,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        email: formData.email,
        phone: formData.phone,
      })

      setIsSuccess(true)
      toast({
        title: "Email envoyé !",
        description: "Veuillez vérifier votre boîte mail pour confirmer votre rendez-vous.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetDialog = () => {
    setStep(1)
    setSelectedDate(undefined)
    setSelectedTime(undefined)
    setIsSuccess(false)
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      phone: "",
    })
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      setTimeout(resetDialog, 300)
    }
    onOpenChange(open)
  }

  const isStep1Valid = selectedDate && selectedTime
  const isStep2Valid =
    formData.firstName && formData.lastName && formData.dateOfBirth && formData.email && formData.phone

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl mb-2">Email de vérification envoyé !</DialogTitle>
            <p className="text-muted-foreground mb-6">
              Nous avons envoyé un email de vérification à <strong>{formData.email}</strong>. Veuillez cliquer sur le
              lien dans l'email pour confirmer votre rendez-vous.
            </p>
            <Button onClick={() => handleClose(false)}>Fermer</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {step === 1 ? "Choisissez votre rendez-vous" : "Vos informations"}
              </DialogTitle>
              <div className="flex gap-2 mt-4">
                <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
                <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
              </div>
            </DialogHeader>

            {step === 1 && (
              <div className="space-y-6 py-4">
                <div>
                  <Label className="text-base mb-3 block">Sélectionnez une date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    locale={fr}
                    className="rounded-md border mx-auto"
                  />
                </div>

                {selectedDate && (
                  <div>
                    <Label className="text-base mb-3 block">
                      Choisissez un horaire
                      {isLoadingSlots && <span className="text-sm text-muted-foreground ml-2">(Chargement...)</span>}
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((time) => {
                        const isBooked = bookedSlots.includes(time)
                        return (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            onClick={() => setSelectedTime(time)}
                            disabled={isBooked || isLoadingSlots}
                            className="w-full relative"
                          >
                            {time}
                            {isBooked && (
                              <span className="absolute inset-0 flex items-center justify-center bg-muted/80 rounded-md text-xs text-muted-foreground">
                                Réservé
                              </span>
                            )}
                          </Button>
                        )
                      })}
                    </div>
                    {bookedSlots.length === TIME_SLOTS.length && !isLoadingSlots && (
                      <p className="text-sm text-muted-foreground text-center mt-4">
                        Tous les créneaux sont réservés pour cette date. Veuillez choisir une autre date.
                      </p>
                    )}
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button onClick={() => setStep(2)} disabled={!isStep1Valid} className="gap-2">
                    Suivant
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Jean"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Dupont"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date de naissance *</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jean.dupont@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="06 12 34 56 78"
                    required
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Récapitulatif :</strong>
                    <br />
                    Date : {selectedDate && format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
                    <br />
                    Heure : {selectedTime}
                  </p>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Retour
                  </Button>
                  <Button onClick={handleSubmit} disabled={!isStep2Valid || isSubmitting} className="gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Confirmer
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
