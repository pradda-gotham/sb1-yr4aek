'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PerformanceChart } from '@/components/progress/performance-chart';
import { SkillProgress } from '@/components/progress/skill-progress';
import { InterviewHistory } from '@/components/progress/interview-history';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProgressPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Progress Tracking</h2>
        <p className="text-muted-foreground">
          Monitor your interview performance and skill development.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <SkillProgress />
        </TabsContent>

        <TabsContent value="history">
          <InterviewHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}