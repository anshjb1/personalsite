/*
  # Resume Management System Schema

  1. New Tables
    - `profile` - Personal information and profile photo
    - `experiences` - Work experience entries
    - `projects` - Project portfolio entries
    - `publications` - Academic publications and research
    - `skills` - Technical and professional skills
    - `education` - Educational background
    - `certifications` - Professional certifications

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Public read access for portfolio display

  3. Features
    - Optional location fields for all entries
    - Rich text support for descriptions
    - Ordering system for display priority
    - Status flags for published/draft content
*/

-- Profile table for personal information
CREATE TABLE IF NOT EXISTS profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  title text,
  email text,
  phone text,
  location text,
  website text,
  linkedin_url text,
  github_url text,
  bio text,
  profile_photo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Experiences table for work history
CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  company text NOT NULL,
  location text,
  start_date date NOT NULL,
  end_date date,
  is_current boolean DEFAULT false,
  description text,
  achievements text[],
  skills_used text[],
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects table for portfolio
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  long_description text,
  technologies text[],
  project_url text,
  github_url text,
  image_url text,
  start_date date,
  end_date date,
  status text DEFAULT 'completed',
  category text,
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Publications table for academic work
CREATE TABLE IF NOT EXISTS publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  authors text[],
  journal text,
  conference text,
  publication_date date,
  doi text,
  url text,
  abstract text,
  keywords text[],
  publication_type text DEFAULT 'journal',
  citation_count integer DEFAULT 0,
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Skills table for technical and professional skills
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  category text NOT NULL,
  proficiency_level integer DEFAULT 3,
  years_experience integer,
  is_featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Education table for academic background
CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  institution text NOT NULL,
  degree text NOT NULL,
  field_of_study text,
  location text,
  start_date date,
  end_date date,
  is_current boolean DEFAULT false,
  gpa text,
  honors text[],
  relevant_coursework text[],
  description text,
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  issuing_organization text NOT NULL,
  issue_date date,
  expiration_date date,
  credential_id text,
  credential_url text,
  description text,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Policies for profile table
CREATE POLICY "Users can read own profile"
  ON profile FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profile FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profile FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can read published profiles"
  ON profile FOR SELECT
  TO anon
  USING (true);

-- Policies for experiences table
CREATE POLICY "Users can manage own experiences"
  ON experiences FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can read published experiences"
  ON experiences FOR SELECT
  TO anon
  USING (is_published = true);

-- Policies for projects table
CREATE POLICY "Users can manage own projects"
  ON projects FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can read published projects"
  ON projects FOR SELECT
  TO anon
  USING (is_published = true);

-- Policies for publications table
CREATE POLICY "Users can manage own publications"
  ON publications FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can read published publications"
  ON publications FOR SELECT
  TO anon
  USING (is_published = true);

-- Policies for skills table
CREATE POLICY "Users can manage own skills"
  ON skills FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can read skills"
  ON skills FOR SELECT
  TO anon
  USING (true);

-- Policies for education table
CREATE POLICY "Users can manage own education"
  ON education FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can read published education"
  ON education FOR SELECT
  TO anon
  USING (is_published = true);

-- Policies for certifications table
CREATE POLICY "Users can manage own certifications"
  ON certifications FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can read active certifications"
  ON certifications FOR SELECT
  TO anon
  USING (is_active = true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_experiences_user_id ON experiences(user_id);
CREATE INDEX IF NOT EXISTS idx_experiences_display_order ON experiences(display_order);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_publications_user_id ON publications(user_id);
CREATE INDEX IF NOT EXISTS idx_publications_display_order ON publications(display_order);
CREATE INDEX IF NOT EXISTS idx_skills_user_id ON skills(user_id);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_education_user_id ON education(user_id);
CREATE INDEX IF NOT EXISTS idx_certifications_user_id ON certifications(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON profile FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_publications_updated_at BEFORE UPDATE ON publications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();