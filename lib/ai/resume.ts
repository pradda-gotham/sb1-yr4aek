import { OpenAI } from 'openai';

const openai = process.env.NODE_ENV === 'development'
  ? null
  : new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

export interface ResumeAnalysis {
  skills: {
    name: string;
    level: number;
    category: string;
  }[];
  experience: {
    years: number;
    highlights: string[];
    roles: {
      title: string;
      company: string;
      duration: string;
      achievements: string[];
    }[];
  };
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  suggestions: {
    improvements: string[];
    keywords: string[];
    formatting: string[];
  };
  score: {
    overall: number;
    skills: number;
    experience: number;
    education: number;
    formatting: number;
  };
}

// Mock resume analysis for development
const mockResumeAnalysis: ResumeAnalysis = {
  skills: [
    { name: 'React', level: 90, category: 'Frontend' },
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'TypeScript', level: 88, category: 'Languages' },
  ],
  experience: {
    years: 5,
    highlights: [
      'Led development of major features',
      'Improved application performance by 40%',
    ],
    roles: [
      {
        title: 'Senior Developer',
        company: 'Tech Corp',
        duration: '2020-Present',
        achievements: [
          'Implemented CI/CD pipeline',
          'Mentored junior developers',
        ],
      },
    ],
  },
  education: [
    {
      degree: 'B.S. Computer Science',
      institution: 'Tech University',
      year: '2018',
    },
  ],
  suggestions: {
    improvements: [
      'Add more quantifiable achievements',
      'Include certifications section',
    ],
    keywords: ['React', 'Node.js', 'TypeScript', 'AWS'],
    formatting: [
      'Use consistent date format',
      'Add summary section',
    ],
  },
  score: {
    overall: 85,
    skills: 90,
    experience: 85,
    education: 80,
    formatting: 85,
  },
};

export async function analyzeResume(text: string): Promise<ResumeAnalysis> {
  if (process.env.NODE_ENV === 'development') {
    return mockResumeAnalysis;
  }

  try {
    const completion = await openai!.chat.completions.create({
      messages: [
        { 
          role: 'user', 
          content: `Analyze this resume and provide detailed feedback in JSON format with the following structure:
          {
            "skills": [{ "name": string, "level": number, "category": string }],
            "experience": {
              "years": number,
              "highlights": string[],
              "roles": [{ "title": string, "company": string, "duration": string, "achievements": string[] }]
            },
            "education": [{ "degree": string, "institution": string, "year": string }],
            "suggestions": {
              "improvements": string[],
              "keywords": string[],
              "formatting": string[]
            },
            "score": {
              "overall": number,
              "skills": number,
              "experience": number,
              "education": number,
              "formatting": number
            }
          }`
        },
        { role: 'user', content: text },
      ],
      model: 'gpt-4',
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    return JSON.parse(completion.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
}

export async function extractTextFromPDF(file: File): Promise<string> {
  // For demo purposes, return mock text
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Mock resume text for demonstration purposes. Contains professional experience and skills.");
    }, 1000);
  });
}