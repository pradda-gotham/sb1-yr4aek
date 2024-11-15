'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, MapPin } from 'lucide-react';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    matchScore: number;
    description: string;
    requiredSkills: string[];
  };
  onSelect: (job: any) => void;
}

export function JobCard({ job, onSelect }: JobCardProps) {
  return (
    <Card className="hover:border-primary cursor-pointer transition-all">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">{job.title}</h3>
              <Badge variant="secondary">{job.matchScore}% Match</Badge>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Building2 className="mr-1 h-4 w-4" />
                {job.company}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {job.location}
              </div>
            </div>
          </div>
          <Button variant="ghost" onClick={() => onSelect(job)}>
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
  );
}