"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import { BookingDialog } from "@/components/booking-dialog"
import { useState } from "react"

export function AboutSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <>
      <section id="apropos" className="py-24 bg-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-40 left-10 w-20 h-20 text-primary/10">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <polygon points="50,10 61,35 88,41 69,59 73,86 50,73 27,86 31,59 12,41 39,35" />
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src="/dentist-examining-patient-teeth.jpg"
                    alt="Dentiste examinant un patient"
                    width={300}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg mt-12">
                  <Image
                    src="/modern-dental-office.png"
                    alt="Cabinet dentaire moderne"
                    width={300}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Decorative star */}
              <div className="absolute -bottom-8 -left-8 w-16 h-16 text-primary/20">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <polygon points="50,10 61,35 88,41 69,59 73,86 50,73 27,86 31,59 12,41 39,35" />
                </svg>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-semibold text-primary uppercase tracking-wider">+ QUI SOMMES NOUS?</p>
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-balance">
                  Votre parcours vers un sourire plus <span className="text-primary">sain</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  L'objectif de notre clinique est d'offrir des soins dentaires conviviaux et attentionnés ainsi que des
                  traitements dentaires généraux, esthétiques et spécialisés du plus haut niveau.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Avec des cabinets dentaires, partout dans le monde.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Équipe expérimentée</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Services complets</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Technologie de pointe</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Services dentaires d'urgence</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="rounded-full gap-2" onClick={() => setIsBookingOpen(true)}>
                Prendre Rendez Vous
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <BookingDialog open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </>
  )
}
