import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { PostPage } from './pages/PostPage';
import { NotFound } from './pages/NotFound';
import { Corner } from './components/Corner';

export default function App() {
  return (
    <BrowserRouter>
      <Corner />
      <Routes>
        <Route index element={<Home />} />
        <Route path="writing/:slug" element={<PostPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
