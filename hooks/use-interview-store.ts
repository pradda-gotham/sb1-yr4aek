import { create } from 'zustand';
import { Question, FeedbackAnalysis } from '@/lib/ai/interview';

interface InterviewState {
  questions: Question[];
  currentQuestionIndex: number;
  responses: Map<string, { audio: Blob; feedback: FeedbackAnalysis | null }>;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  addResponse: (questionId: string, audio: Blob, feedback: FeedbackAnalysis | null) => void;
  reset: () => void;
}

export const useInterviewStore = create<InterviewState>((set) => ({
  questions: [],
  currentQuestionIndex: 0,
  responses: new Map(),
  setQuestions: (questions) => set({ questions }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  addResponse: (questionId, audio, feedback) =>
    set((state) => ({
      responses: new Map(state.responses).set(questionId, { audio, feedback }),
    })),
  reset: () => set({ questions: [], currentQuestionIndex: 0, responses: new Map() }),
}));