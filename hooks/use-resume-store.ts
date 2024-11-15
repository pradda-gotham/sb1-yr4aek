import { create } from 'zustand';
import { ResumeAnalysis } from '@/lib/ai/resume';

interface ResumeState {
  currentResume: File | null;
  analysis: ResumeAnalysis | null;
  isAnalyzing: boolean;
  error: string | null;
  setCurrentResume: (file: File | null) => void;
  setAnalysis: (analysis: ResumeAnalysis | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  currentResume: null,
  analysis: null,
  isAnalyzing: false,
  error: null,
  setCurrentResume: (file) => set({ currentResume: file }),
  setAnalysis: (analysis) => set({ analysis }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setError: (error) => set({ error }),
  reset: () => set({
    currentResume: null,
    analysis: null,
    isAnalyzing: false,
    error: null,
  }),
}));