'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart,
} from 'lucide-react';
import { JobMatch } from '@/lib/ai/job-matching';

interface MatchAnalysisProps {
  jobMatch: JobMatch;
  onApply?: () => void;
}

export function MatchAnalysis({ jobMatch, onApply }: MatchAnalysisProps) {
  const getSkillMatchColor = (match: number) => {
    if (match >= 80) return 'text-green-500';
    if (match >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Match Analysis</CardTitle>
          <CardDescription>
            Detailed breakdown of your compatibility with this role
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="mb-4 text-sm font-medium">Overall Match</h4>
            <div className="flex items-center space-x-4">
              <Progress value={jobMatch.score} className="flex-1" />
              <Badge
                variant={jobMatch.score >= 70 ? 'default' : 'secondary'}
                className="w-16 justify-center"
              >
                {jobMatch.score}%
              </Badge>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium">Skill Analysis</h4>
            <div className="space-y-4">
              {jobMatch.skillMatches.map((skill) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{skill.skill}</span>
                    <span
                      className={getSkillMatchColor(
                        (skill.current / skill.required) * 100
                      )}
                    >
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

          {jobMatch.missingSkills.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-medium flex items-center">
                <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                Missing Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {jobMatch.missingSkills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="mb-2 text-sm font-medium">Recommendations</h4>
            <ul className="space-y-2">
              {jobMatch.recommendations.map((recommendation, index) => (
                <li
                  key={index}
                  className="flex items-start text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          {onApply && (
            <Button className="w-full" onClick={onApply}>
              Apply Now
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}