"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { BookingDialog } from "@/components/booking-dialog"
import { useState } from "react"

const services = [
  {
    title: "Devis Invisalign",
    description: "Description de la prestation en 3 lignes Description de la prestation en 3 lignes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
        <rect x="8" y="8" width="8" height="8" rx="1" />
      </svg>
    ),
  },
  {
    title: "Fauteuil Classique",
    description: "Description de la prestation en 3 lignes Description de la prestation en 3 lignes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
        <path d="M8 10h8M8 14h8" />
      </svg>
    ),
  },
  {
    title: "2nd Fauteuil Classique",
    description: "Description de la prestation en 3 lignes Description de la prestation en 3 lignes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
        <path d="M12 6v12M6 12h12" />
      </svg>
    ),
  },
  {
    title: "Fauteuil Boost 40 %",
    description: "Description de la prestation en 3 lignes Description de la prestation en 3 lignes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
        <path d="M8 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "2nd Fauteuil Bosst",
    description: "Description de la prestation en 3 lignes Description de la prestation en 3 lignes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Gouttières Blanchiment",
    description: "Description de la prestation en 3 lignes Description de la prestation en 3 lignes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
]

export function ServicesSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <>
      <section id="services" className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 text-primary/10">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <polygon points="50,10 61,35 88,41 69,59 73,86 50,73 27,86 31,59 12,41 39,35" />
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">+ NOS SERVICES</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-balance">
              Des services de <span className="text-primary">haute qualité</span> pour vous.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Sous titre réfléchir</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="text-primary p-0 gap-2" onClick={() => setIsBookingOpen(true)}>
                    Voir les disponibilités
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center space-y-6">
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Nous croyons en l'utilisation des technologies et des techniques les plus récentes afin de garantir les
              meilleurs résultats pour nos patients.
            </p>
            <Button size="lg" className="rounded-full gap-2" onClick={() => setIsBookingOpen(true)}>
              Prendre Rendez Vous
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <BookingDialog open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </>
  )
}
