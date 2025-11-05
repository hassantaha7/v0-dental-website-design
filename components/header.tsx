"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { BookingDialog } from "@/components/booking-dialog"
import { useState } from "react"

export function Header() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md">
                <img
                  src="/logo.png"
                  alt="Dr. Ouss Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-primary">DR.OUSS</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="#accueil" className="text-sm font-medium hover:text-primary transition-colors">
                Accueil
              </Link>
              <Link href="#apropos" className="text-sm font-medium hover:text-primary transition-colors">
                A propos
              </Link>
              <Link href="#services" className="text-sm font-medium hover:text-primary transition-colors">
                Services
              </Link>
              <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
                Nous contacter
              </Link>
            </nav>

            <Button className="rounded-full gap-2" onClick={() => setIsBookingOpen(true)}>
              Prendre Rendez Vous
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <BookingDialog open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </>
  )
}
