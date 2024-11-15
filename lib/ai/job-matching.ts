import { OpenAI } from 'openai';

const openai = process.env.NODE_ENV === 'development'
  ? null
  : new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

export interface JobMatch {
  score: number;
  skillMatches: {
    skill: string;
    required: number;
    current: number;
  }[];
  missingSkills: string[];
  recommendations: string[];
}

// Mock job match data for development
const mockJobMatch: JobMatch = {
  score: 85,
  skillMatches: [
    { skill: 'React', required: 90, current: 85 },
    { skill: 'TypeScript', required: 80, current: 90 },
    { skill: 'Node.js', required: 70, current: 75 },
  ],
  missingSkills: ['GraphQL', 'AWS'],
  recommendations: [
    'Consider getting AWS certification',
    'Build projects using GraphQL',
    'Contribute to open source React projects',
  ],
};

export async function analyzeJobMatch(
  jobDescription: string,
  resume: string
): Promise<JobMatch> {
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockJobMatch), 1000);
    });
  }

  try {
    const completion = await openai!.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Analyze the job requirements and candidate's resume. Provide a detailed match analysis in JSON format with:
          - Overall match score (0-100)
          - Skill matches with required and current levels
          - Missing skills
          - Specific recommendations for improvement`,
        },
        { role: 'user', content: `Job Description: ${jobDescription}` },
        { role: 'user', content: `Resume: ${resume}` },
      ],
      model: 'gpt-4',
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    return JSON.parse(completion.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error analyzing job match:', error);
    throw error;
  }
}

// Mock job suggestions for development
const mockJobSuggestions = [
  'Senior Frontend Developer',
  'Full Stack Engineer',
  'Technical Lead',
  'Software Architect',
];

export async function generateJobSuggestions(
  skills: string[],
  experience: string
): Promise<string[]> {
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockJobSuggestions), 1000);
    });
  }

  try {
    const completion = await openai!.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: 'Based on the candidate\'s skills and experience, suggest relevant job titles and roles.',
        },
        { role: 'user', content: `Skills: ${skills.join(', ')}` },
        { role: 'user', content: `Experience: ${experience}` },
      ],
      model: 'gpt-4',
      temperature: 0.7,
    });

    return JSON.parse(completion.choices[0].message.content || '[]');
  } catch (error) {
    console.error('Error generating job suggestions:', error);
    throw error;
  }
}