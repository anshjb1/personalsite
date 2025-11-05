/*
  # Fix Security and Performance Issues

  ## Changes

  1. **Add Missing Indexes**
     - Add index on profile.user_id to cover the foreign key
  
  2. **Optimize RLS Policies**
     - Replace auth.uid() with (SELECT auth.uid()) in all policies to prevent re-evaluation
     - This significantly improves query performance at scale
  
  3. **Fix Function Search Path**
     - Add SECURITY DEFINER and explicit schema to update_updated_at_column function
  
  4. **Note on Unused Indexes**
     - Indexes are kept as they will be used as data volume grows
     - They're currently "unused" because the database is new with minimal data
*/

-- Add missing index on profile.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_profile_user_id ON profile(user_id);

-- Drop and recreate all RLS policies with optimized auth.uid() calls
-- Profile table policies
DROP POLICY IF EXISTS "Users can read own profile" ON profile;
DROP POLICY IF EXISTS "Users can insert own profile" ON profile;
DROP POLICY IF EXISTS "Users can update own profile" ON profile;

CREATE POLICY "Users can read own profile"
  ON profile FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert own profile"
  ON profile FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update own profile"
  ON profile FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- Experiences table policies
DROP POLICY IF EXISTS "Users can manage own experiences" ON experiences;

CREATE POLICY "Users can manage own experiences"
  ON experiences FOR ALL
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- Projects table policies
DROP POLICY IF EXISTS "Users can manage own projects" ON projects;

CREATE POLICY "Users can manage own projects"
  ON projects FOR ALL
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- Publications table policies
DROP POLICY IF EXISTS "Users can manage own publications" ON publications;

CREATE POLICY "Users can manage own publications"
  ON publications FOR ALL
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- Skills table policies
DROP POLICY IF EXISTS "Users can manage own skills" ON skills;

CREATE POLICY "Users can manage own skills"
  ON skills FOR ALL
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- Education table policies
DROP POLICY IF EXISTS "Users can manage own education" ON education;

CREATE POLICY "Users can manage own education"
  ON education FOR ALL
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- Certifications table policies
DROP POLICY IF EXISTS "Users can manage own certifications" ON certifications;

CREATE POLICY "Users can manage own certifications"
  ON certifications FOR ALL
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- Fix function search path mutability by dropping with CASCADE and recreating
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Recreate all triggers (they were dropped with CASCADE)
CREATE TRIGGER update_profile_updated_at 
  BEFORE UPDATE ON profile 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at 
  BEFORE UPDATE ON experiences 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_publications_updated_at 
  BEFORE UPDATE ON publications 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at 
  BEFORE UPDATE ON skills 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_education_updated_at 
  BEFORE UPDATE ON education 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at 
  BEFORE UPDATE ON certifications 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();