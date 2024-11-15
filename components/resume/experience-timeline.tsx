'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BriefcaseIcon, Calendar } from 'lucide-react';
import { ResumeAnalysis } from '@/lib/ai/resume';

interface ExperienceTimelineProps {
  experience: ResumeAnalysis['experience'];
}

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BriefcaseIcon className="h-5 w-5" />
          <span>Professional Experience</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-8">
          {experience.roles.map((role, index) => (
            <div
              key={index}
              className="relative flex items-start space-x-4 pb-8 last:pb-0"
            >
              <div className="absolute left-0 top-0 flex h-full w-10 items-center justify-center">
                <div className="h-full w-px bg-border" />
              </div>
              <div className="absolute left-0 top-1 h-8 w-8 rounded-full border bg-background" />
              <div className="ml-10 space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{role.title}</h3>
                  <Badge variant="secondary">{role.company}</Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  {role.duration}
                </div>
                <ul className="list-inside list-disc space-y-1">
                  {role.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}