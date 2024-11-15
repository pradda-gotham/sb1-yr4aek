'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2 } from 'lucide-react';

// Mock data for demonstration
const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    matchScore: 92,
    requiredSkills: ['React', 'TypeScript', 'Node.js'],
    description: 'Looking for an experienced frontend developer to join our team...',
  },
  {
    id: 2,
    title: 'Full Stack Engineer',
    company: 'StartupX',
    location: 'Remote',
    type: 'Full-time',
    matchScore: 85,
    requiredSkills: ['React', 'Python', 'AWS'],
    description: 'Join our fast-growing startup as a full stack engineer...',
  },
  {
    id: 3,
    title: 'Software Engineer',
    company: 'BigTech Inc',
    location: 'New York, NY',
    type: 'Full-time',
    matchScore: 78,
    requiredSkills: ['Java', 'Spring', 'SQL'],
    description: 'Seeking a software engineer to work on our core platform...',
  },
];

interface JobListProps {
  onJobSelect: (job: any) => void;
}

export function JobList({ onJobSelect }: JobListProps) {
  return (
    <div className="space-y-4">
      {mockJobs.map((job) => (
        <Card key={job.id} className="hover:border-primary cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{job.title}</h3>
                  <Badge variant="secondary">{job.matchScore}% Match</Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Building2 className="mr-1 h-4 w-4" />
                  {job.company} • {job.location}
                </div>
              </div>
              <Button variant="ghost" onClick={() => onJobSelect(job)}>
                View Match
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {job.description}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.requiredSkills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}