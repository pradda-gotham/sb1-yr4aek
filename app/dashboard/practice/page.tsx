'use client';

import { useState } from 'react';
import { InterviewSetup } from '@/components/practice/interview-setup';
import { InterviewSession } from '@/components/practice/interview-session';
import { useToast } from '@/components/ui/use-toast';

export default function PracticePage() {
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [sessionConfig, setSessionConfig] = useState<any>(null);
  const { toast } = useToast();

  const handleStartSession = async (config: any) => {
    try {
      setSessionConfig(config);
      setIsSessionStarted(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to start interview session. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Interview Practice</h2>
        <p className="text-muted-foreground">
          Practice your interview skills with AI-powered feedback.
        </p>
      </div>

      {!isSessionStarted ? (
        <InterviewSetup onStart={handleStartSession} />
      ) : (
        <InterviewSession config={sessionConfig} />
      )}
    </div>
  );
}