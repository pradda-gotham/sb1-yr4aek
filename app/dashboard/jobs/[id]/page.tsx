'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MatchAnalysis } from '@/components/jobs/match-analysis';
import { SkillRadar } from '@/components/jobs/skill-radar';
import { useJobStore } from '@/hooks/use-job-store';
import { analyzeJobMatch } from '@/lib/ai/job-matching';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export default function JobDetailsPage() {
  const params = useParams();
  const { toast } = useToast();
  const { jobMatch, isAnalyzing, setJobMatch, setIsAnalyzing } = useJobStore();

  useEffect(() => {
    const fetchJobMatch = async () => {
      setIsAnalyzing(true);
      try {
        // In a real app, we'd fetch the job details and user's resume
        const mockJobDescription = "Mock job description";
        const mockResume = "Mock resume content";
        
        const match = await analyzeJobMatch(mockJobDescription, mockResume);
        setJobMatch(match);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to analyze job match. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsAnalyzing(false);
      }
    };

    fetchJobMatch();
  }, [params.id, setIsAnalyzing, setJobMatch, toast]);

  if (isAnalyzing) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Analyzing job match...</span>
      </div>
    );
  }

  if (!jobMatch) return null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Job Match Analysis</h2>
        <p className="text-muted-foreground">
          Detailed analysis of your compatibility with this position.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <MatchAnalysis jobMatch={jobMatch} onApply={() => {}} />
        <SkillRadar
          skills={jobMatch.skillMatches.map((skill) => ({
            name: skill.skill,
            required: skill.required,
            current: skill.current,
          }))}
        />
      </div>
    </div>
  );
}