import { create } from 'zustand';
import { ResumeAnalysis } from '@/lib/ai/resume';
import { JobMatch } from '@/lib/ai/job-matching';
import { Question, FeedbackAnalysis } from '@/lib/ai/interview';

export type WorkflowStage = 
  | 'upload'
  | 'analysis'
  | 'job-selection'
  | 'compatibility'
  | 'interview-prep'
  | 'interview'
  | 'feedback'
  | 'complete';

interface WorkflowState {
  stage: WorkflowStage;
  resume: File | null;
  resumeAnalysis: ResumeAnalysis | null;
  selectedJob: any | null;
  jobMatch: JobMatch | null;
  questions: Question[];
  responses: Map<string, { audio: Blob; feedback: FeedbackAnalysis | null }>;
  isLoading: boolean;
  error: string | null;
  setStage: (stage: WorkflowStage) => void;
  setResume: (file: File | null) => void;
  setResumeAnalysis: (analysis: ResumeAnalysis | null) => void;
  setSelectedJob: (job: any | null) => void;
  setJobMatch: (match: JobMatch | null) => void;
  setQuestions: (questions: Question[]) => void;
  addResponse: (questionId: string, audio: Blob, feedback: FeedbackAnalysis | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  stage: 'upload' as WorkflowStage,
  resume: null,
  resumeAnalysis: null,
  selectedJob: null,
  jobMatch: null,
  questions: [],
  responses: new Map(),
  isLoading: false,
  error: null,
};

export const useWorkflowStore = create<WorkflowState>((set) => ({
  ...initialState,
  setStage: (stage) => set({ stage }),
  setResume: (file) => set({ resume: file }),
  setResumeAnalysis: (analysis) => set({ resumeAnalysis: analysis }),
  setSelectedJob: (job) => set({ selectedJob: job }),
  setJobMatch: (match) => set({ jobMatch: match }),
  setQuestions: (questions) => set({ questions }),
  addResponse: (questionId, audio, feedback) =>
    set((state) => ({
      responses: new Map(state.responses).set(questionId, { audio, feedback }),
    })),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));