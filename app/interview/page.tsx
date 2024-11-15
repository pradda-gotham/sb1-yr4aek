import { InterviewWorkflow } from '@/components/workflow/interview-workflow';

export default function InterviewPage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Interview Preparation</h1>
          <p className="text-muted-foreground">
            Complete each step to prepare for your interview
          </p>
        </div>
        <InterviewWorkflow />
      </div>
    </div>
  );
}