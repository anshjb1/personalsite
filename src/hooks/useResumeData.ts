import { useState, useEffect } from 'react';
import { supabase, Profile, Experience, Project, Publication, Skill, Education, Certification } from '../lib/supabase';

export interface ResumeData {
  profile: Profile | null;
  experiences: Experience[];
  projects: Project[];
  publications: Publication[];
  skills: Skill[];
  education: Education[];
  certifications: Certification[];
}

export const useResumeData = (userId?: string) => {
  const [data, setData] = useState<ResumeData>({
    profile: null,
    experiences: [],
    projects: [],
    publications: [],
    skills: [],
    education: [],
    certifications: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from('profile')
        .select('*')
        .maybeSingle();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      // Fetch experiences
      const { data: experiences, error: experiencesError } = await supabase
        .from('experiences')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (experiencesError) throw experiencesError;

      // Fetch projects
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (projectsError) throw projectsError;

      // Fetch publications
      const { data: publications, error: publicationsError } = await supabase
        .from('publications')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (publicationsError) throw publicationsError;

      // Fetch skills
      const { data: skills, error: skillsError } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true })
        .order('display_order', { ascending: true });

      if (skillsError) throw skillsError;

      // Fetch education
      const { data: education, error: educationError } = await supabase
        .from('education')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (educationError) throw educationError;

      // Fetch certifications
      const { data: certifications, error: certificationsError } = await supabase
        .from('certifications')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (certificationsError) throw certificationsError;

      setData({
        profile: profile || null,
        experiences: experiences || [],
        projects: projects || [],
        publications: publications || [],
        skills: skills || [],
        education: education || [],
        certifications: certifications || []
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

// CRUD operations for each table
export const useProfileOperations = () => {
  const createProfile = async (profileData: Omit<Profile, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('profile')
      .insert([profileData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const updateProfile = async (id: string, profileData: Partial<Profile>) => {
    const { data, error } = await supabase
      .from('profile')
      .update(profileData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  return { createProfile, updateProfile };
};

export const useExperienceOperations = () => {
  const createExperience = async (experienceData: Omit<Experience, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('experiences')
      .insert([experienceData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const updateExperience = async (id: string, experienceData: Partial<Experience>) => {
    const { data, error } = await supabase
      .from('experiences')
      .update(experienceData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const deleteExperience = async (id: string) => {
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  };

  return { createExperience, updateExperience, deleteExperience };
};

export const useProjectOperations = () => {
  const createProject = async (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const updateProject = async (id: string, projectData: Partial<Project>) => {
    const { data, error } = await supabase
      .from('projects')
      .update(projectData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  };

  return { createProject, updateProject, deleteProject };
};