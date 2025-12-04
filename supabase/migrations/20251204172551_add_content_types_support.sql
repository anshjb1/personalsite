/*
  # Add Content Types Support to Publications

  ## Overview
  Extends the publications table to support multiple content types including videos, blog posts, academic publications, and other content.

  ## Changes
  
  1. New Columns
    - `type` (text) - Content type: 'publication', 'blog', 'video', or 'other'
    - `video_url` (text) - URL for video content (YouTube, Vimeo, etc.)
    - `external_url` (text) - URL for blog posts or external content
    - `content_description` (text) - Additional description for non-publication content
    
  2. Updates
    - Make publication-specific fields nullable since they won't apply to all content types
    - Add default type 'publication' for existing records
    
  3. Security
    - Maintain existing RLS policies (already configured)
*/

-- Add new columns for different content types
DO $$
BEGIN
  -- Add type column with default 'publication'
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'publications' AND column_name = 'type'
  ) THEN
    ALTER TABLE publications ADD COLUMN type text DEFAULT 'publication' CHECK (type IN ('publication', 'blog', 'video', 'other'));
  END IF;

  -- Add video_url column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'publications' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE publications ADD COLUMN video_url text;
  END IF;

  -- Add external_url column for blog posts and other external content
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'publications' AND column_name = 'external_url'
  ) THEN
    ALTER TABLE publications ADD COLUMN external_url text;
  END IF;

  -- Add content_description for additional context
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'publications' AND column_name = 'content_description'
  ) THEN
    ALTER TABLE publications ADD COLUMN content_description text;
  END IF;
END $$;

-- Make publication-specific fields nullable (they're only required for type='publication')
ALTER TABLE publications ALTER COLUMN authors DROP NOT NULL;
ALTER TABLE publications ALTER COLUMN journal DROP NOT NULL;

-- Create an index on type for faster filtering
CREATE INDEX IF NOT EXISTS idx_publications_type ON publications(type);

-- Add a comment to explain the table's expanded purpose
COMMENT ON TABLE publications IS 'Stores various types of content including academic publications, blog posts, videos, and other featured content';