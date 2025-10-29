"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function UnavailabilityPage() {
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [reason, setReason] = useState("")
  const [list, setList] = useState<any[]>([])

  const fetchList = async () => {
    const { data } = await supabase
      .from("dentist_unavailability")
      .select("*")
      .order("start_time", { ascending: true })
    setList(data || [])
  }

  const addUnavailability = async () => {
    if (!start || !end) return alert("Veuillez remplir les champs")
    await supabase.from("dentist_unavailability").insert({
      start_time: start,
      end_time: end,
      reason,
    })
    setStart("")
    setEnd("")
    setReason("")
    fetchList()
  }

  const deleteUnavailability = async (id: string) => {
    await supabase.from("dentist_unavailability").delete().eq("id", id)
    fetchList()
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-[#1B9FBD]">Plages horaires non disponibles</h2>

      <div className="flex flex-col md:flex-row gap-2">
        <Input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
        <Input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} />
        <Input placeholder="Raison (facultatif)" value={reason} onChange={(e) => setReason(e.target.value)} />
        <Button onClick={addUnavailability}>Ajouter</Button>
      </div>

      <ul className="divide-y divide-gray-200">
        {list.map((item) => (
          <li key={item.id} className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">
                {new Date(item.start_time).toLocaleString("fr-FR")} →{" "}
                {new Date(item.end_time).toLocaleString("fr-FR")}
              </p>
              {item.reason && <p className="text-sm text-gray-500">{item.reason}</p>}
            </div>
            <Button variant="destructive" onClick={() => deleteUnavailability(item.id)}>
              Supprimer
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
