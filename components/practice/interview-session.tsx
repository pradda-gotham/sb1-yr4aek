'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { AudioRecorder } from '@/components/practice/audio-recorder';
import { FeedbackDisplay } from '@/components/practice/feedback-display';
import { InterviewConfig } from '@/components/practice/interview-setup';
import { generateQuestions, analyzeResponse } from '@/lib/ai/interview';
import { transcribeAudio } from '@/lib/ai/speech';
import { useInterviewStore } from '@/hooks/use-interview-store';
import {
  Brain,
  Mic,
  SkipForward,
  Loader2,
  Timer,
} from 'lucide-react';

interface InterviewSessionProps {
  config: InterviewConfig;
}

export function InterviewSession({ config }: InterviewSessionProps) {
  const {
    questions,
    currentQuestionIndex,
    responses,
    setQuestions,
    setCurrentQuestionIndex,
    addResponse,
  } = useInterviewStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(config.duration * 60);
  const { toast } = useToast();

  useEffect(() => {
    const initializeQuestions = async () => {
      try {
        const generatedQuestions = await generateQuestions(
          config.type,
          config.difficulty
        );
        setQuestions(generatedQuestions);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to generate questions. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeQuestions();

    return () => useInterviewStore.getState().reset();
  }, [config, setQuestions, toast]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      toast({
        title: 'Interview Complete',
        description: 'You have completed all the questions.',
      });
    }
  };

  const handleRecordingComplete = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      const currentQuestion = questions[currentQuestionIndex];
      const transcription = await transcribeAudio(audioBlob);
      const feedback = await analyzeResponse(currentQuestion, transcription);
      addResponse(currentQuestion.id, audioBlob, feedback);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process response. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Preparing your interview questions...</span>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentResponse = responses.get(currentQuestion.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Timer className="h-5 w-5" />
          <span className="font-medium">
            Time Remaining: {formatTime(timeRemaining)}
          </span>
        </div>
        <Progress
          value={(currentQuestionIndex / questions.length) * 100}
          className="w-1/3"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium">{currentQuestion.text}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mic className="h-5 w-5" />
            <span>Your Response</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AudioRecorder
            isRecording={isRecording}
            onRecordingComplete={handleRecordingComplete}
            onRecordingChange={setIsRecording}
          />
        </CardContent>
      </Card>

      {isProcessing && (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Analyzing your response...</span>
          </CardContent>
        </Card>
      )}

      {currentResponse?.feedback && (
        <FeedbackDisplay feedback={currentResponse.feedback} />
      )}

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={handleNextQuestion}
          disabled={isRecording || isProcessing}
        >
          <SkipForward className="mr-2 h-4 w-4" />
          Next Question
        </Button>
      </div>
    </div>
  );
}