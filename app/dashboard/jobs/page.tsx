'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JobSearch } from '@/components/jobs/job-search';
import { JobList } from '@/components/jobs/job-list';
import { SkillGapAnalysis } from '@/components/jobs/skill-gap';
import { Briefcase } from 'lucide-react';

export default function JobsPage() {
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const handleJobSelect = (job: any) => {
    setSelectedJob(job);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Job Matching</h2>
        <p className="text-muted-foreground">
          Find relevant jobs and analyze skill requirements.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-6">
          <JobSearch />
          <JobList onJobSelect={handleJobSelect} />
        </div>

        <div className="lg:col-span-3 space-y-6">
          {selectedJob ? (
            <SkillGapAnalysis job={selectedJob} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Job Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Select a job to view skill requirements and gap analysis.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}