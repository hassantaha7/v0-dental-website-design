import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#0F3D4A] text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-7 h-7 text-white"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <path d="M9 9h.01M15 9h.01" />
                </svg>
              </div>
              <span className="text-xl font-bold">DR.OUSS</span>
            </Link>
            <p className="text-sm text-white/80 leading-relaxed">
              L'objectif de notre clinique est d'offrir des soins dentaires conviviaux et attentionnés, ainsi que des
              traitements dentaires généraux, esthétiques et spécialisés du plus haut niveau.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#accueil" className="text-sm text-white/80 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="#apropos" className="text-sm text-white/80 hover:text-white transition-colors">
                  A propos
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-sm text-white/80 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-sm text-white/80 hover:text-white transition-colors">
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Réseaux sociaux</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                  Snapchat
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                  Tiktok
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Nous contacter</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:Ouss@blanchiment.com"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Ouss@blanchiment.com
                </a>
              </li>
              <li>
                <a href="tel:0901101020" className="text-sm text-white/80 hover:text-white transition-colors">
                  09 01 10 10 20
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
