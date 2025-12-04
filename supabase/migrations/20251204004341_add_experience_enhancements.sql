/*
  # Enhance Experiences Table
  
  1. Changes to `experiences` table
     - Add `logo_url` (text, nullable) - URL to company logo image
     - Add `website_url` (text, nullable) - Optional company website URL
     - Add `role_changes` (jsonb, nullable) - Track role progressions/changes within the same company
       Each role change entry contains: { date, title, description }
  
  2. Purpose
     - Enable visual branding with company logos
     - Link to company websites for context
     - Track career progression within the same organization
  
  3. Security
     - No RLS changes needed (inherits existing policies)
*/

-- Add new columns to experiences table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'experiences' AND column_name = 'logo_url'
  ) THEN
    ALTER TABLE experiences ADD COLUMN logo_url text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'experiences' AND column_name = 'website_url'
  ) THEN
    ALTER TABLE experiences ADD COLUMN website_url text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'experiences' AND column_name = 'role_changes'
  ) THEN
    ALTER TABLE experiences ADD COLUMN role_changes jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Add helpful comment for role_changes structure
COMMENT ON COLUMN experiences.role_changes IS 'Array of role changes: [{"date": "2023-01-01", "title": "Senior Developer", "description": "Promoted to..."}]';
