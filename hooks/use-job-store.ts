import { create } from 'zustand';
import { JobMatch } from '@/lib/ai/job-matching';

interface JobState {
  selectedJob: any | null;
  jobMatch: JobMatch | null;
  isAnalyzing: boolean;
  error: string | null;
  setSelectedJob: (job: any | null) => void;
  setJobMatch: (match: JobMatch | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useJobStore = create<JobState>((set) => ({
  selectedJob: null,
  jobMatch: null,
  isAnalyzing: false,
  error: null,
  setSelectedJob: (job) => set({ selectedJob: job }),
  setJobMatch: (match) => set({ jobMatch: match }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing: isAnalyzing }),
  setError: (error) => set({ error: error }),
  reset: () =>
    set({
      selectedJob: null,
      jobMatch: null,
      isAnalyzing: false,
      error: null,
    }),
}));