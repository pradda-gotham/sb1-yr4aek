import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Lightbulb } from 'lucide-react';

interface ResumeAnalysisProps {
  experience: {
    years: number;
    highlights: string[];
  };
  suggestions: string[];
}

export function ResumeAnalysis({ experience, suggestions }: ResumeAnalysisProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Experience Highlights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Badge variant="secondary" className="mb-2">
                {experience.years} Years Experience
              </Badge>
            </div>
            <ul className="list-disc pl-4 space-y-2">
              {experience.highlights.map((highlight, index) => (
                <li key={index} className="text-muted-foreground">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5" />
            <span>Improvement Suggestions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-4 space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-muted-foreground">
                {suggestion}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}