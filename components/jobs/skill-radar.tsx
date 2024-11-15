'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

interface SkillRadarProps {
  skills: {
    name: string;
    required: number;
    current: number;
  }[];
}

export function SkillRadar({ skills }: SkillRadarProps) {
  const data = skills.map((skill) => ({
    subject: skill.name,
    required: skill.required,
    current: skill.current,
    fullMark: 100,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Required"
                dataKey="required"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
              <Radar
                name="Current"
                dataKey="current"
                stroke="hsl(var(--secondary))"
                fill="hsl(var(--secondary))"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}