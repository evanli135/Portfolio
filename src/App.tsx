import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Corner } from './components/Corner';
import { Lens } from './components/Lens';
import { LayerCtx, SharedCtx, type Theme } from './layer';
import { categories } from './data';

const tabs = categories.map((c) => c.id);
const fromHash = () => {
  const id = window.location.hash.slice(1);
  return tabs.includes(id) ? id : tabs[0];
};

function readTheme(): Theme {
  try {
    const t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') return t;
  } catch { /* storage blocked */ }
  return 'auto';
}

function Site() {
  return (
    <>
      <Corner />
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default function App() {
  const [chapter, setChapter] = useState(0);
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [tab, setTabState] = useState(fromHash);
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [found, setFound] = useState(0);
  const [finds, setFinds] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'auto') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);
    try {
      if (theme === 'auto') localStorage.removeItem('theme');
      else localStorage.setItem('theme', theme);
    } catch { /* storage blocked */ }
  }, [theme]);

  useEffect(() => {
    const onHash = () => setTabState(fromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const setTab = useCallback((id: string) => {
    setTabState(id);
    history.replaceState(null, '', `#${id}`);
  }, []);
  const changeChapter = useCallback((i: number) => { setChapter(i); setHover(null); setPinned(null); }, []);
  const togglePin = useCallback((p: string | null) => setPinned((cur) => (p === cur ? null : p)), []);
  const onFind = useCallback((n: number, total: number) => { setFound(n); setFinds(total); }, []);

  const shared = { chapter, setChapter: changeChapter, phase: hover ?? pinned, setHover, togglePin, tab, setTab, theme, setTheme, found, finds };

  return (
    <BrowserRouter>
      <SharedCtx.Provider value={shared}>
        <LayerCtx.Provider value="human">
          <div className="human-layer"><Site /></div>
        </LayerCtx.Provider>
        <LayerCtx.Provider value="agent">
          <div className="agent-layer" aria-hidden="true" inert><Site /></div>
        </LayerCtx.Provider>
        <Lens onFind={onFind} />
      </SharedCtx.Provider>
    </BrowserRouter>
  );
}
