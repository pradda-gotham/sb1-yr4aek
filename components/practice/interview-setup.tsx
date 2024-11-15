'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Brain, Clock, Play, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const interviewTypes = [
  {
    id: 'behavioral',
    name: 'Behavioral Interview',
    description: 'Focus on past experiences and soft skills',
    icon: Brain,
  },
  {
    id: 'technical',
    name: 'Technical Interview',
    description: 'Programming and problem-solving questions',
    icon: Settings,
  },
  {
    id: 'general',
    name: 'General Interview',
    description: 'Mix of various question types',
    icon: Brain,
  },
];

interface InterviewSetupProps {
  onStart: (config: InterviewConfig) => void;
}

export interface InterviewConfig {
  type: string;
  duration: number;
  difficulty: number;
}

export function InterviewSetup({ onStart }: InterviewSetupProps) {
  const [selectedType, setSelectedType] = useState<string>('');
  const [duration, setDuration] = useState<number>(30);
  const [difficulty, setDifficulty] = useState<number>(50);

  const handleStart = () => {
    if (!selectedType) return;
    
    onStart({
      type: selectedType,
      duration,
      difficulty,
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Interview Type</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          {interviewTypes.map((type) => (
            <Button
              key={type.id}
              variant={selectedType === type.id ? 'default' : 'outline'}
              className="h-auto flex-col space-y-4 p-6"
              onClick={() => setSelectedType(type.id)}
            >
              <type.icon className="h-8 w-8" />
              <div className="space-y-2">
                <h3 className="font-semibold">{type.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Duration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Session Length</Label>
              <Badge variant="secondary">{duration} minutes</Badge>
            </div>
            <Slider
              value={[duration]}
              onValueChange={(value) => setDuration(value[0])}
              min={15}
              max={60}
              step={15}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Difficulty</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Question Complexity</Label>
              <Badge variant="secondary">
                {difficulty < 33
                  ? 'Beginner'
                  : difficulty < 66
                  ? 'Intermediate'
                  : 'Advanced'}
              </Badge>
            </div>
            <Slider
              value={[difficulty]}
              onValueChange={(value) => setDifficulty(value[0])}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Button
        className="md:col-span-2"
        size="lg"
        onClick={handleStart}
        disabled={!selectedType}
      >
        <Play className="mr-2 h-4 w-4" />
        Start Interview
      </Button>
    </div>
  );
}