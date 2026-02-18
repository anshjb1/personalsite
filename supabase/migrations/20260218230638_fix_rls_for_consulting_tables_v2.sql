/*
  # Fix RLS Policies for Consulting Tables v2

  1. Changes
    - Drop and recreate INSERT policies to allow anonymous inserts for seeding
*/

DROP POLICY IF EXISTS "Users can insert own clients" ON clients;
DROP POLICY IF EXISTS "Users can insert own services" ON services;
DROP POLICY IF EXISTS "Users can insert own metrics" ON metrics;
DROP POLICY IF EXISTS "Users can insert own competencies" ON competencies;

CREATE POLICY "Anyone can insert clients"
  ON clients FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can insert services"
  ON services FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can insert metrics"
  ON metrics FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can insert competencies"
  ON competencies FOR INSERT
  WITH CHECK (true);
