'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUploader } from '@/components/resume/file-uploader';
import { AnalysisOverview } from '@/components/resume/analysis-overview';
import { ExperienceTimeline } from '@/components/resume/experience-timeline';
import { SkillsAnalysis } from '@/components/resume/skills-analysis';
import { useResumeStore } from '@/hooks/use-resume-store';
import { analyzeResume, extractTextFromPDF } from '@/lib/ai/resume';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export default function ResumePage() {
  const {
    currentResume,
    analysis,
    isAnalyzing,
    error,
    setCurrentResume,
    setAnalysis,
    setIsAnalyzing,
    setError,
  } = useResumeStore();
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      useResumeStore.getState().reset();
    };
  }, []);

  const handleFileUpload = async (file: File) => {
    setCurrentResume(file);
    setIsAnalyzing(true);
    setError(null);

    try {
      const text = await extractTextFromPDF(file);
      const result = await analyzeResume(text);
      setAnalysis(result);
      
      toast({
        title: 'Analysis Complete',
        description: 'Your resume has been successfully analyzed.',
      });
    } catch (error) {
      setError('Failed to analyze resume. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to analyze resume. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Resume Analysis</h2>
        <p className="text-muted-foreground">
          Upload your resume for AI-powered analysis and insights.
        </p>
      </div>

      {!analysis ? (
        <Card>
          <CardHeader>
            <CardTitle>Upload Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUploader onUpload={handleFileUpload} isUploading={isAnalyzing} />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <AnalysisOverview analysis={analysis} />
          
          <div className="grid gap-6 md:grid-cols-2">
            <SkillsAnalysis skills={analysis.skills} />
            <ExperienceTimeline experience={analysis.experience} />
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card>
            <CardContent className="flex items-center space-x-4 p-6">
              <Loader2 className="h-8 w-8 animate-spin" />
              <div>
                <h3 className="font-semibold">Analyzing Resume</h3>
                <p className="text-sm text-muted-foreground">
                  Please wait while we process your resume...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}