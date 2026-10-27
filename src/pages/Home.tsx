import { Hero } from '../components/Hero';
import { Journey } from '../components/Journey';
import { useLayer } from '../layer';

// The agent copy only needs the hero: that's the only place the lens appears.
export function Home() {
  const agent = useLayer() === 'agent';
  return (
    <main>
      <Hero />
      {!agent && <Journey />}
    </main>
  );
}
