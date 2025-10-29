"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Maxime",
    text: '« Je tiens à remercier DR Ouss ! J\'ai pris la formule " Fauteuil classique" et je ne peux que valider le résultat. Je recommande»',
    image: "/happy-patient-portrait.jpg",
  },
  {
    name: "Sophie",
    text: "« Excellente expérience ! Le personnel est très professionnel et attentionné. Je recommande vivement ce cabinet dentaire.»",
    image: "/satisfied-patient-portrait.jpg",
  },
  {
    name: "Thomas",
    text: "« Un service impeccable et des résultats au-delà de mes attentes. Merci à toute l'équipe pour leur professionnalisme.»",
    image: "/smiling-patient-portrait.jpg",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">RETOURS</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">
            Ce que disent nos <span className="text-primary">clients</span>?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/happy-dental-patient-smiling.jpg"
                alt="Patient satisfait"
                width={400}
                height={500}
                className="w-full h-auto"
              />
            </div>

            <Card className="absolute -bottom-8 -left-8 bg-primary text-primary-foreground border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="text-5xl font-bold mb-2">100 %</div>
                <div className="text-sm mb-3">
                  De Clients Satisfaits
                  <br />
                  Après Être Passé Chez Nous
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <div className="text-6xl text-primary/20 leading-none">"</div>
              <p className="text-xl leading-relaxed">{testimonials[currentIndex].text}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                <Image
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  width={64}
                  height={64}
                />
              </div>
              <div>
                <p className="font-semibold text-lg">{testimonials[currentIndex].name}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-lg bg-transparent" onClick={prevTestimonial}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-lg bg-transparent" onClick={nextTestimonial}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
