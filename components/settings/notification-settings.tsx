'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    email: {
      interviews: true,
      feedback: true,
      tips: false,
      newsletter: false,
    },
    push: {
      interviews: true,
      feedback: true,
      reminders: true,
    },
  });

  const handleToggle = (category: 'email' | 'push', setting: string) => {
    setNotifications((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting as keyof typeof prev[typeof category]],
      },
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: 'Settings saved',
        description: 'Your notification preferences have been updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>
            Choose what emails you'd like to receive.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="email-interviews">Interview reminders</Label>
            <Switch
              id="email-interviews"
              checked={notifications.email.interviews}
              onCheckedChange={() => handleToggle('email', 'interviews')}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="email-feedback">Interview feedback</Label>
            <Switch
              id="email-feedback"
              checked={notifications.email.feedback}
              onCheckedChange={() => handleToggle('email', 'feedback')}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="email-tips">Weekly tips & tricks</Label>
            <Switch
              id="email-tips"
              checked={notifications.email.tips}
              onCheckedChange={() => handleToggle('email', 'tips')}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="email-newsletter">Monthly newsletter</Label>
            <Switch
              id="email-newsletter"
              checked={notifications.email.newsletter}
              onCheckedChange={() => handleToggle('email', 'newsletter')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>
            Configure your push notification preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="push-interviews">Upcoming interviews</Label>
            <Switch
              id="push-interviews"
              checked={notifications.push.interviews}
              onCheckedChange={() => handleToggle('push', 'interviews')}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="push-feedback">New feedback available</Label>
            <Switch
              id="push-feedback"
              checked={notifications.push.feedback}
              onCheckedChange={() => handleToggle('push', 'feedback')}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="push-reminders">Practice reminders</Label>
            <Switch
              id="push-reminders"
              checked={notifications.push.reminders}
              onCheckedChange={() => handleToggle('push', 'reminders')}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={isLoading} className="w-full">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Preferences
      </Button>
    </div>
  );
}