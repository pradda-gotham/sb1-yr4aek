'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  BookOpen,
  BriefcaseIcon,
  GraduationCap,
  FileText,
} from 'lucide-react';
import { ResumeAnalysis } from '@/lib/ai/resume';

interface AnalysisOverviewProps {
  analysis: ResumeAnalysis;
}

export function AnalysisOverview({ analysis }: AnalysisOverviewProps) {
  const scoreCategories = [
    { name: 'Overall', score: analysis.score.overall, icon: BarChart },
    { name: 'Skills', score: analysis.score.skills, icon: BookOpen },
    { name: 'Experience', score: analysis.score.experience, icon: BriefcaseIcon },
    { name: 'Education', score: analysis.score.education, icon: GraduationCap },
    { name: 'Formatting', score: analysis.score.formatting, icon: FileText },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Analysis Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {scoreCategories.map((category) => (
            <div
              key={category.name}
              className="flex items-center space-x-4 rounded-lg border p-4"
            >
              <category.icon className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {category.name}
                </p>
                <div className="flex items-center space-x-2">
                  <Progress value={category.score} className="h-2" />
                  <span className="text-sm text-muted-foreground">
                    {category.score}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Key Suggestions</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="mb-2 text-sm font-medium">Improvements</h4>
              <ul className="space-y-2">
                {analysis.suggestions.improvements.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.suggestions.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Formatting</h4>
              <ul className="space-y-2">
                {analysis.suggestions.formatting.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}