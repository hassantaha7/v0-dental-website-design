"use client"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function ProcessSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl sticky top-32">
            <Image
              src="/dentist-showing-tooth-shade-samples-to-patient.jpg"
              alt="Consultation dentaire"
              width={500}
              height={600}
              className="w-full h-auto"
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">+ COMMENT ÇA MARCHE?</p>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-balance">
                Ce que nous faisons pour vos
              </h2>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary">dents</h2>
              <p className="text-muted-foreground leading-relaxed">
                Chaque patient est différent. Nous nous engageons donc à conseiller au mieux pour garantir la meilleure
                prestation
              </p>
            </div>

            <Accordion type="single" collapsible defaultValue="item-1" className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-2xl px-6 bg-card">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">
                  Prenez Rendez Vous
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  L'objectif de notre clinique est d'offrir des soins dentaires conviviaux et attentionnés, ainsi que le
                  plus haut niveau de soins généraux, esthétiques et dentaires.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-2xl px-6 bg-card">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">Etape 2</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  Nous effectuons un examen complet de votre santé bucco-dentaire et établissons un plan de traitement
                  personnalisé adapté à vos besoins spécifiques.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-2xl px-6 bg-card">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">Etape 3</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  Nous réalisons les soins avec les technologies les plus avancées et assurons un suivi régulier pour
                  garantir votre satisfaction et votre santé dentaire optimale.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
