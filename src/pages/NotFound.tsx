import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main className="page post">
      <h1>Nothing here.</h1>
      <p><Link to="/">Back to Evan Li</Link></p>
    </main>
  );
}
