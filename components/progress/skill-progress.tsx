'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

// Mock data for demonstration
const skillsData = [
  {
    category: 'Communication',
    skills: [
      { name: 'Clarity', progress: 85 },
      { name: 'Confidence', progress: 75 },
      { name: 'Active Listening', progress: 80 },
    ],
  },
  {
    category: 'Technical',
    skills: [
      { name: 'Problem Solving', progress: 90 },
      { name: 'System Design', progress: 70 },
      { name: 'Coding', progress: 85 },
    ],
  },
  {
    category: 'Behavioral',
    skills: [
      { name: 'Leadership', progress: 75 },
      { name: 'Teamwork', progress: 85 },
      { name: 'Adaptability', progress: 80 },
    ],
  },
];

export function SkillProgress() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skillsData.map((category) => (
        <Card key={category.category}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {category.category}
              <Badge variant="secondary">
                {Math.round(
                  category.skills.reduce((acc, skill) => acc + skill.progress, 0) /
                    category.skills.length
                )}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {category.skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{skill.name}</span>
                  <span className="text-muted-foreground">{skill.progress}%</span>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}