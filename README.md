# Dr.Ouss - Cabinet Dentaire Website

Site web moderne pour le cabinet dentaire Dr.Ouss à Trappes.

## Fonctionnalités

- 🏠 Page d'accueil avec hero section
- 👨‍⚕️ Section "À propos" avec présentation de la clinique
- 🦷 Grille de services dentaires
- 💬 Témoignages clients avec carousel
- 📅 **Système de réservation en ligne avec vérification par email**
- 🗺️ Section contact avec carte interactive
- 📱 Design responsive (mobile, tablette, desktop)

## Système de Réservation

Le système de réservation permet aux patients de :

1. **Choisir une date et un horaire** depuis un calendrier interactif
2. **Remplir leurs informations personnelles** (prénom, nom, date de naissance, email, téléphone)
3. **Recevoir un email de vérification** pour confirmer leur rendez-vous
4. **Confirmer leur rendez-vous** en cliquant sur le lien dans l'email

### Configuration de l'Email (Resend)

Pour activer l'envoi d'emails de vérification, vous devez configurer Resend :

#### 1. Créer un compte Resend (Gratuit)

1. Allez sur [resend.com](https://resend.com)
2. Créez un compte gratuit (100 emails/jour inclus)
3. Vérifiez votre email

#### 2. Obtenir votre clé API

1. Dans le dashboard Resend, allez dans **API Keys**
2. Cliquez sur **Create API Key**
3. Donnez-lui un nom (ex: "Dr.Ouss Production")
4. Copiez la clé API (elle commence par `re_`)

#### 3. Ajouter la clé API à votre projet

Ajoutez les variables d'environnement suivantes dans les paramètres de votre projet Vercel ou dans un fichier `.env.local` :

\`\`\`env
RESEND_API_KEY=re_votre_cle_api_ici
NEXT_PUBLIC_APP_URL=https://votre-domaine.com
\`\`\`

Pour le développement local :
\`\`\`env
RESEND_API_KEY=re_votre_cle_api_ici
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

#### 4. Configurer votre domaine (Optionnel mais recommandé)

Par défaut, les emails sont envoyés depuis `onboarding@resend.dev`. Pour utiliser votre propre domaine :

1. Dans Resend, allez dans **Domains**
2. Ajoutez votre domaine (ex: `drouss.fr`)
3. Configurez les enregistrements DNS (SPF, DKIM, DMARC)
4. Modifiez le fichier `app/actions/send-verification.ts` :

\`\`\`typescript
from: "Cabinet Dentaire <contact@votredomaine.com>",
\`\`\`

### Test du système

1. Cliquez sur "Prendre Rendez Vous" n'importe où sur le site
2. Sélectionnez une date et un horaire
3. Remplissez vos informations
4. Cliquez sur "Confirmer"
5. Vérifiez votre boîte mail
6. Cliquez sur le lien de vérification

## Installation

\`\`\`bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
\`\`\`

## Technologies utilisées

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS v4** - Styling
- **Shadcn/ui** - Composants UI
- **Resend** - Envoi d'emails
- **date-fns** - Manipulation de dates
- **Lucide React** - Icônes

## Structure du projet

\`\`\`
├── app/
│   ├── actions/
│   │   └── send-verification.ts    # Server action pour l'envoi d'emails
│   ├── verify/
│   │   └── page.tsx                # Page de vérification
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── booking-dialog.tsx          # Dialog de réservation
│   ├── header.tsx
│   ├── hero-section.tsx
│   ├── about-section.tsx
│   ├── services-section.tsx
│   ├── testimonials-section.tsx
│   ├── process-section.tsx
│   ├── contact-section.tsx
│   ├── footer.tsx
│   └── ui/                         # Composants UI (shadcn)
└── public/                         # Images et assets
\`\`\`

## Personnalisation

### Modifier les horaires disponibles

Éditez le fichier `components/booking-dialog.tsx` :

\`\`\`typescript
const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
]
\`\`\`

### Modifier le template d'email

Éditez le fichier `app/actions/send-verification.ts` dans la fonction `sendVerificationEmail`.

### Ajouter une base de données

Pour un système de production complet, vous devriez :

1. Ajouter une base de données (Supabase, Neon, etc.)
2. Stocker les rendez-vous avec leur token de vérification
3. Vérifier le token contre la base de données
4. Marquer le rendez-vous comme confirmé

## Déploiement

Le site est prêt à être déployé sur Vercel :

\`\`\`bash
# Déployer sur Vercel
vercel

# Ou via GitHub
# Connectez votre repo GitHub à Vercel
\`\`\`

N'oubliez pas d'ajouter les variables d'environnement dans les paramètres de votre projet Vercel !

## Support

Pour toute question ou problème, contactez l'équipe de développement.

---

Développé avec ❤️ pour Dr.Ouss Cabinet Dentaire
