"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { BookingDialog } from "@/components/booking-dialog"
import { useState } from "react"

export function HeroSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <>
      <section id="accueil" className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-secondary/30 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-16 h-16 text-primary/20">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <polygon points="50,10 61,35 88,41 69,59 73,86 50,73 27,86 31,59 12,41 39,35" />
          </svg>
        </div>
        <div className="absolute bottom-32 left-20 w-12 h-12 text-primary/10">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <polygon points="50,10 61,35 88,41 69,59 73,86 50,73 27,86 31,59 12,41 39,35" />
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-balance">
                  Découvrez l'expérience <span className="text-primary">dentaire</span> avec une touche de douceur
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Des soins dentaires modernes et adaptés à chaque patient. Prenez rendez-vous en ligne en toute
                  simplicité.
                </p>
              </div>

              <Button size="lg" className="rounded-full gap-2" onClick={() => setIsBookingOpen(true)}>
                Prendre Rendez Vous
                <ArrowRight className="w-5 h-5" />
              </Button>

              <p className="text-sm text-muted-foreground">
                Plus de <span className="text-accent font-semibold">200 clients</span> qui ont retrouvés leur{" "}
                <span className="text-accent font-semibold">sourire de rêve</span>
              </p>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/dentist-treating-patient-in-modern-clinic.jpg"
                  alt="Dentiste traitant un patient"
                  width={500}
                  height={600}
                  className="w-full h-auto"
                />

                {/* Floating tooth icons */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-float">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-8 h-8 text-primary"
                  >
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  </svg>
                </div>

                <div
                  className="absolute bottom-8 left-8 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-8 h-8 text-primary"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>

                <div
                  className="absolute top-1/2 left-8 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-float"
                  style={{ animationDelay: "0.5s" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-8 h-8 text-primary"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 9h6v6H9z" />
                  </svg>
                </div>

                <div
                  className="absolute bottom-1/3 right-8 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-float"
                  style={{ animationDelay: "1.5s" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-8 h-8 text-primary"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>

                {/* Doctor card */}
                <div className="absolute bottom-8 right-8 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                    <Image src="/professional-dentist-portrait.png" alt="Dr.Ouss" width={48} height={48} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Dr.Ouss</p>
                    <p className="text-xs text-muted-foreground">Dentiste</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BookingDialog component */}
      <BookingDialog open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </>
  )
}
