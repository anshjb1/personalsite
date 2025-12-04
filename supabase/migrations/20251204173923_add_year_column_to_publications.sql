/*
  # Add year column to publications table
  
  1. Changes
    - Add `year` column to publications table to support year-based filtering and sorting
    - Populate year from existing publication_date values
    - Add index for better query performance
  
  2. Notes
    - The year column will be automatically populated from publication_date when present
    - Queries can now efficiently filter and sort by year
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'publications' AND column_name = 'year'
  ) THEN
    ALTER TABLE publications ADD COLUMN year integer;
  END IF;
END $$;

UPDATE publications 
SET year = EXTRACT(YEAR FROM publication_date)::integer 
WHERE publication_date IS NOT NULL AND year IS NULL;

CREATE INDEX IF NOT EXISTS idx_publications_year ON publications(year DESC);
