"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false) 
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true) 
  
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
  
    if (error) {
      console.log("Login error:", error)
      setError("Identifiants incorrects")
      setLoading(false)
      return
    }
  
    console.log("Login successful!")
  
    // ✅ Wait until Supabase confirms the session has changed
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        console.log("Session detected, redirecting...")
        router.push("/dashboard")
      }
    })
  
    // Optional: unsubscribe after 3s to avoid leaks
    setTimeout(() => subscription.unsubscribe(), 3000)
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md space-y-4 w-80"
      >
        <h2 className="text-xl font-semibold text-center text-[#1B9FBD]">
          Connexion Dentiste
        </h2>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          className="w-full"
          disabled={loading} 
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connexion...
            </>
          ) : (
            "Se connecter"
          )}
        </Button>
      </form>
    </div>
  )
}
