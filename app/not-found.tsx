import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <Brain className="h-12 w-12" />
      <h2 className="text-lg font-semibold">Page Not Found</h2>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}