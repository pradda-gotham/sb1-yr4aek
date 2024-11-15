'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  Briefcase,
  MessageSquare,
  BarChart,
  Brain,
  Sparkles,
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Resume Analysis',
    description: 'AI-powered resume analysis to identify your strengths and areas for improvement.',
  },
  {
    icon: Briefcase,
    title: 'Job Matching',
    description: 'Find the perfect job matches based on your skills and experience.',
  },
  {
    icon: MessageSquare,
    title: 'Practice Interviews',
    description: 'Realistic interview simulations with AI-generated questions.',
  },
  {
    icon: BarChart,
    title: 'Performance Tracking',
    description: 'Track your progress and improvement over time.',
  },
  {
    icon: Brain,
    title: 'Smart Feedback',
    description: 'Get instant, detailed feedback on your interview responses.',
  },
  {
    icon: Sparkles,
    title: 'Personalized Coaching',
    description: 'Custom tips and strategies based on your performance.',
  },
];

export function Features() {
  return (
    <section className="container py-24">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group rounded-lg border p-8 hover:border-primary"
          >
            <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}