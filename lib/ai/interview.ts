import { OpenAI } from 'openai';

const openai = process.env.NODE_ENV === 'development' 
  ? null 
  : new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

export interface Question {
  id: string;
  text: string;
  type: 'behavioral' | 'technical' | 'general';
  difficulty: number;
  expectedTopics?: string[];
}

export interface FeedbackAnalysis {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  clarity: number;
  confidence: number;
  relevance: number;
}

// Mock questions for development
const mockQuestions: Question[] = [
  {
    id: '1',
    text: 'Tell me about a challenging project you worked on.',
    type: 'behavioral',
    difficulty: 70,
    expectedTopics: ['Problem Solving', 'Teamwork'],
  },
  {
    id: '2',
    text: 'Explain how you would design a scalable web application.',
    type: 'technical',
    difficulty: 80,
    expectedTopics: ['System Design', 'Architecture'],
  },
  {
    id: '3',
    text: 'What are your career goals?',
    type: 'general',
    difficulty: 50,
    expectedTopics: ['Career Planning', 'Motivation'],
  },
];

// Mock feedback for development
const mockFeedback: FeedbackAnalysis = {
  score: 85,
  feedback: 'Strong response with good examples and clear communication.',
  strengths: [
    'Clear communication style',
    'Good use of specific examples',
    'Structured response',
  ],
  improvements: [
    'Could provide more technical details',
    'Consider adding metrics to showcase impact',
  ],
  clarity: 90,
  confidence: 85,
  relevance: 80,
};

export async function generateQuestions(
  type: string,
  difficulty: number,
  count: number = 5
): Promise<Question[]> {
  if (process.env.NODE_ENV === 'development') {
    return mockQuestions;
  }

  try {
    const completion = await openai!.chat.completions.create({
      messages: [{ 
        role: 'user', 
        content: `Generate ${count} ${type} interview questions at ${difficulty}% difficulty level. Format as JSON array with properties: id, text, type, difficulty, expectedTopics.`
      }],
      model: 'gpt-4',
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');
    return response.questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
}

export async function analyzeResponse(
  question: Question,
  response: string
): Promise<FeedbackAnalysis> {
  if (process.env.NODE_ENV === 'development') {
    return mockFeedback;
  }

  try {
    const completion = await openai!.chat.completions.create({
      messages: [
        { 
          role: 'user', 
          content: `Analyze this interview response to the question: "${question.text}". 
          Provide feedback in JSON format with: score (0-100), feedback (detailed explanation), 
          strengths (array), improvements (array), clarity (0-100), confidence (0-100), 
          relevance (0-100).`
        },
        { role: 'user', content: response },
      ],
      model: 'gpt-4',
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    return JSON.parse(completion.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error analyzing response:', error);
    throw error;
  }
}