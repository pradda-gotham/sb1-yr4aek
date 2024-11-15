'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Building2, MapPin, Timer } from 'lucide-react';

interface SkillGapAnalysisProps {
  job: {
    title: string;
    company: string;
    location: string;
    type: string;
    matchScore: number;
    requiredSkills: string[];
    description: string;
  };
}

// Mock skill gap data
const skillGapData = [
  { skill: 'React', current: 90, required: 80 },
  { skill: 'TypeScript', current: 85, required: 90 },
  { skill: 'Node.js', current: 70, required: 85 },
];

export function SkillGapAnalysis({ job }: SkillGapAnalysisProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{job.title}</CardTitle>
          <CardDescription>
            <div className="flex items-center space-x-2 text-sm">
              <Building2 className="h-4 w-4" />
              <span>{job.company}</span>
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
              <Timer className="h-4 w-4" />
              <span>{job.type}</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="mb-4 text-sm font-medium">Match Score</h4>
              <div className="flex items-center space-x-4">
                <Progress value={job.matchScore} className="w-full" />
                <span className="text-sm font-medium">{job.matchScore}%</span>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-medium">Skills Analysis</h4>
              <div className="space-y-4">
                {skillGapData.map((skill) => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{skill.skill}</span>
                      <span className="text-muted-foreground">
                        {skill.current}% / {skill.required}%
                      </span>
                    </div>
                    <Progress
                      value={(skill.current / skill.required) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Button className="w-full">
              Apply Now
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}