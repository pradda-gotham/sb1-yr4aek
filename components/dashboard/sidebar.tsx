'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  MessageSquare,
  Settings,
  BarChart,
  Play,
} from 'lucide-react';

const routes = [
  {
    label: 'Overview',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Interview',
    icon: Play,
    href: '/interview',
    color: 'text-green-500',
  },
  {
    label: 'Practice',
    icon: MessageSquare,
    href: '/dashboard/practice',
    color: 'text-violet-500',
  },
  {
    label: 'Resume',
    icon: FileText,
    href: '/dashboard/resume',
    color: 'text-pink-700',
  },
  {
    label: 'Jobs',
    icon: Briefcase,
    href: '/dashboard/jobs',
    color: 'text-orange-700',
  },
  {
    label: 'Progress',
    icon: BarChart,
    href: '/dashboard/progress',
    color: 'text-emerald-500',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col space-y-4 bg-gray-50 py-4 dark:bg-gray-900">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Navigation</h2>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800',
                pathname === route.href
                  ? 'bg-gray-100 dark:bg-gray-800'
                  : 'text-gray-500 dark:text-gray-400',
                route.color
              )}
            >
              <route.icon className={cn('mr-3 h-5 w-5')} />
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}