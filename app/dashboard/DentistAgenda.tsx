"use client"

import React, { useEffect, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

// ✅ Moved outside
function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-gray-600 hover:text-red-500 border border-gray-300 rounded-md px-3 py-1"
    >
      Déconnexion
    </button>
  )
}

// ✅ Nouveau bouton pour ajouter une indisponibilité
function AddUnavailabilityButton() {
  const router = useRouter()

  const handleNavigate = () => {
    router.push("/dashboard/unavailability")
  }

  return (
    <button
      onClick={handleNavigate}
      className="text-sm text-white bg-[#1B9FBD] hover:bg-[#13839C] rounded-md px-3 py-1 transition"
    >
      + Ajouter indisponibilité
    </button>
  )
}
export default function DentistAgenda() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [unavailability, setUnavailability] = useState<any[]>([])

  // --- Fetch appointments ---
  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: true })

    if (!error && data) setAppointments(data)
    else console.error("Error fetching appointments:", error)
  }

  // --- Fetch dentist unavailability ---
  const fetchUnavailability = async () => {
    const { data, error } = await supabase
      .from("dentist_unavailability")
      .select("*")

    if (!error && data) setUnavailability(data)
    else console.error("Error fetching unavailability:", error)
  }

  // --- Subscribe to real-time changes ---
  const subscribeToChanges = () => {
    const channel = supabase
      .channel("realtime-appointments")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "appointments" },
        () => fetchAppointments()
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }

  useEffect(() => {
    fetchAppointments()
    fetchUnavailability()
    const cleanup = subscribeToChanges()
    return cleanup
  }, [])

  // --- Combine appointments + unavailability ---
  const events = [
    ...appointments.map((a) => ({
      title: `${a.first_name} ${a.last_name} (${a.appointment_type === 'blanchiment' ? 'Blanchiment' : 'Devis'})`,
      start: `${a.appointment_date}T${a.appointment_time}`,
      color: a.is_verified ? "#1B9FBD" : "#ccc",
    })),
    ...unavailability.map((u) => ({
      title: u.reason || "Indisponible",
      start: u.start_time,
      end: u.end_time,
      color: "#f87171",
    })),
  ]

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#1B9FBD]">
          Agenda du Cabinet
        </h2>

         {/* ✅ Groupe de boutons */}
         <div className="flex gap-2">
          <AddUnavailabilityButton />
          <LogoutButton />
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale="fr"
        height="auto"
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        allDaySlot={false}
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventClick={(info) =>
          alert(
            `Événement : ${info.event.title}\nHeure : ${info.event.start?.toLocaleString()}`
          )
        }
      />
    </div>
  )
}
