'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  BarChart,
} from 'lucide-react';
import { FeedbackAnalysis } from '@/lib/ai/interview';

interface FeedbackDisplayProps {
  feedback: FeedbackAnalysis;
}

export function FeedbackDisplay({ feedback }: FeedbackDisplayProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>AI Feedback</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Progress value={feedback.score} className="h-2" />
              </div>
              <Badge variant={feedback.score >= 70 ? 'default' : 'secondary'}>
                {feedback.score}%
              </Badge>
            </div>

            <p className="text-muted-foreground">{feedback.feedback}</p>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 flex items-center text-sm font-medium">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Strengths
                </h4>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  {feedback.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-2 flex items-center text-sm font-medium">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Areas for Improvement
                </h4>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  {feedback.improvements.map((improvement, index) => (
                    <li key={index}>{improvement}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="mb-2 text-sm font-medium">Clarity</h4>
                <Progress value={feedback.clarity} />
              </div>
              <div>
                <h4 className="mb-2 text-sm font-medium">Confidence</h4>
                <Progress value={feedback.confidence} />
              </div>
              <div>
                <h4 className="mb-2 text-sm font-medium">Relevance</h4>
                <Progress value={feedback.relevance} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}