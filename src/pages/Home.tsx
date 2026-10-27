import { Hero } from '../components/Hero';
import { Story } from '../components/Story';
import { Record } from '../components/Record';

export function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <Record />
    </main>
  );
}
