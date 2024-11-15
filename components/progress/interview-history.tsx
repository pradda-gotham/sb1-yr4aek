'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, BarChart, ArrowRight } from 'lucide-react';

// Mock data for demonstration
const interviewHistory = [
  {
    id: 1,
    type: 'Technical Interview',
    date: '2024-03-30',
    duration: '45 mins',
    score: 85,
    feedback: 'Strong problem-solving skills, could improve system design explanations.',
  },
  {
    id: 2,
    type: 'Behavioral Interview',
    date: '2024-03-25',
    duration: '30 mins',
    score: 78,
    feedback: 'Good communication, needs more specific examples in responses.',
  },
  {
    id: 3,
    type: 'General Interview',
    date: '2024-03-20',
    duration: '35 mins',
    score: 82,
    feedback: 'Well-structured answers, could work on conciseness.',
  },
];

export function InterviewHistory() {
  return (
    <div className="space-y-4">
      {interviewHistory.map((interview) => (
        <Card key={interview.id}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{interview.type}</h3>
                  <Badge
                    variant={interview.score >= 80 ? 'default' : 'secondary'}
                  >
                    {interview.score}%
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(interview.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {interview.duration}
                  </div>
                  <div className="flex items-center">
                    <BarChart className="mr-1 h-4 w-4" />
                    Score: {interview.score}%
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4">
              <p className="text-sm text-muted-foreground">{interview.feedback}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}