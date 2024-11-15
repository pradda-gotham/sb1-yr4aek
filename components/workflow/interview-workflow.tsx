'use client';

import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FileUploader } from '@/components/resume/file-uploader';
import { AnalysisOverview } from '@/components/resume/analysis-overview';
import { JobList } from '@/components/jobs/job-list';
import { SkillGapAnalysis } from '@/components/jobs/skill-gap';
import { InterviewSetup } from '@/components/practice/interview-setup';
import { InterviewSession } from '@/components/practice/interview-session';
import { FeedbackDisplay } from '@/components/practice/feedback-display';
import { useWorkflowStore } from '@/hooks/use-workflow-store';
import { analyzeResume, extractTextFromPDF } from '@/lib/ai/resume';
import { analyzeJobMatch } from '@/lib/ai/job-matching';
import { Loader2 } from 'lucide-react';

export function InterviewWorkflow() {
  const {
    stage,
    resume,
    resumeAnalysis,
    selectedJob,
    jobMatch,
    questions,
    responses,
    isLoading,
    error,
    setStage,
    setResume,
    setResumeAnalysis,
    setSelectedJob,
    setJobMatch,
    setQuestions,
    setIsLoading,
    setError,
  } = useWorkflowStore();

  const { toast } = useToast();

  useEffect(() => {
    return () => {
      useWorkflowStore.getState().reset();
    };
  }, []);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const text = await extractTextFromPDF(file);
      const analysis = await analyzeResume(text);
      setResume(file);
      setResumeAnalysis(analysis);
      setStage('analysis');
    } catch (error) {
      setError('Failed to analyze resume');
      toast({
        title: 'Error',
        description: 'Failed to analyze resume. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobSelect = async (job: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const match = await analyzeJobMatch(job.description, resume?.name || '');
      setSelectedJob(job);
      setJobMatch(match);
      setStage('compatibility');
    } catch (error) {
      setError('Failed to analyze job match');
      toast({
        title: 'Error',
        description: 'Failed to analyze job match. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStage = () => {
    switch (stage) {
      case 'upload':
        return (
          <Card className="p-6">
            <FileUploader onUpload={handleFileUpload} isUploading={isLoading} />
          </Card>
        );

      case 'analysis':
        return resumeAnalysis && (
          <div className="space-y-6">
            <AnalysisOverview analysis={resumeAnalysis} />
            <Button onClick={() => setStage('job-selection')}>
              Continue to Job Selection
            </Button>
          </div>
        );

      case 'job-selection':
        return <JobList onJobSelect={handleJobSelect} />;

      case 'compatibility':
        return (
          jobMatch && (
            <div className="space-y-6">
              <SkillGapAnalysis job={selectedJob} />
              <Button onClick={() => setStage('interview-prep')}>
                Start Interview Prep
              </Button>
            </div>
          )
        );

      case 'interview-prep':
        return (
          <InterviewSetup
            onStart={(config) => {
              setQuestions([]);
              setStage('interview');
            }}
          />
        );

      case 'interview':
        return questions.length > 0 ? (
          <InterviewSession
            config={{
              type: selectedJob?.type || 'general',
              duration: 30,
              difficulty: 70,
            }}
          />
        ) : (
          <div className="text-center">Loading questions...</div>
        );

      default:
        return null;
    }
  };

  if (error) {
    return (
      <div className="text-center text-destructive">
        <p>{error}</p>
        <Button
          variant="outline"
          onClick={() => {
            setError(null);
            setStage('upload');
          }}
        >
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>Processing...</p>
            </div>
          </Card>
        </div>
      )}
      {renderStage()}
    </div>
  );
}