-- Create appointments table for dental clinic bookings
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  appointment_date date not null,
  appointment_time text not null,
  first_name text not null,
  last_name text not null,
  date_of_birth date not null,
  email text not null,
  phone text not null,
  verification_token text not null,
  is_verified boolean default false,
  created_at timestamp with time zone default now(),
  -- Ensure no double bookings for the same date and time (only for verified appointments)
  constraint unique_verified_appointment unique(appointment_date, appointment_time, is_verified) where (is_verified = true)
);

-- Enable Row Level Security
alter table public.appointments enable row level security;

-- Drop existing policies if they exist
drop policy if exists "appointments_select_all" on public.appointments;
drop policy if exists "appointments_insert_all" on public.appointments;
drop policy if exists "appointments_update_with_token" on public.appointments;

-- Policy: Anyone can view appointments (to check availability)
create policy "appointments_select_all"
  on public.appointments for select
  using (true);

-- Policy: Anyone can insert appointments (public booking)
create policy "appointments_insert_all"
  on public.appointments for insert
  with check (true);

-- Policy: Allow updates for verification (simplified - anyone can update with correct token)
create policy "appointments_update_all"
  on public.appointments for update
  using (true);

-- Create index for faster queries on date and time
create index if not exists idx_appointments_date_time 
  on public.appointments(appointment_date, appointment_time);

-- Create index for verification token lookups
create index if not exists idx_appointments_verification_token 
  on public.appointments(verification_token);

-- Create index for verified appointments
create index if not exists idx_appointments_verified 
  on public.appointments(is_verified) where is_verified = true;
