import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Instagram } from "lucide-react"
import { ArrowRight } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2632.8!2d1.9889!3d48.7753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDQ2JzMxLjEiTiAxwrA1OSczMi4wIkU!5e0!3m2!1sfr!2sfr!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale"
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">+ NOUS CONTACTER</p>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Retrouvez nous au</h2>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary">cabinet</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">1 rue Jean Jaurès, Trappes</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">07 59 51 61 87</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">oussakri.reda@hotmail.fr</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Snap: sami78190 / akagami_75</p>
                </div>
              </div>
            </div>

            <Button size="lg" className="rounded-full gap-2">
              Prendre Rendez Vous
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
