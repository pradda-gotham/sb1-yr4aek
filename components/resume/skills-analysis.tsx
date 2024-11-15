'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import { ResumeAnalysis } from '@/lib/ai/resume';

interface SkillsAnalysisProps {
  skills: ResumeAnalysis['skills'];
}

export function SkillsAnalysis({ skills }: SkillsAnalysisProps) {
  const categories = Array.from(
    new Set(skills.map((skill) => skill.category))
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5" />
          <span>Skills Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {categories.map((category) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category
            );

            return (
              <div key={category}>
                <h3 className="mb-4 font-semibold">{category}</h3>
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {skill.name}
                        </span>
                        <Badge
                          variant={skill.level >= 70 ? 'default' : 'secondary'}
                        >
                          {skill.level}%
                        </Badge>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}