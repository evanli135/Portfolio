import { createContext, useContext } from 'react';

// The site renders twice: the page a person reads, and the same page as an agent
// sees it. The agent copy only shows inside the lens. Both read one shared state.
export type Layer = 'human' | 'agent';
export const LayerCtx = createContext<Layer>('human');
export const useLayer = () => useContext(LayerCtx);

export type Theme = 'auto' | 'light' | 'dark';

export type Shared = {
  chapter: number;
  setChapter: (i: number) => void;
  phase: string | null; // highlighted diagram phase (hover, else pinned)
  setHover: (p: string | null) => void;
  togglePin: (p: string | null) => void;
  tab: string;
  setTab: (id: string) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
};
export const SharedCtx = createContext<Shared>(null!);
export const useShared = () => useContext(SharedCtx);

/** An id only the human layer gets, so the agent copy never duplicates one. */
export const useId = () => {
  const layer = useLayer();
  return (id: string) => (layer === 'human' ? id : undefined);
};
