import { LandingHero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Navbar } from '@/components/landing/navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <LandingHero />
      <Features />
    </main>
  );
}