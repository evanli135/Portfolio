import { Link, useParams } from 'react-router-dom';
import { posts } from '../posts';
import { Text } from '../components/Text';
import { NotFound } from './NotFound';

// Handles what the posts use: ## headings and paragraphs. Extend when a post needs more.
function render(body: string) {
  return body.trim().split(/\n{2,}/).map((block, i) =>
    block.startsWith('## ') ? <h2 key={i}>{block.slice(3)}</h2> : <p key={i}><Text>{block.replace(/\n/g, ' ')}</Text></p>,
  );
}

export function PostPage() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <NotFound />;
  return (
    <main className="page post">
      <Link className="back" to="/">Evan Li</Link>
      <article>
        <h1>{post.title}</h1>
        {post.draft && <p className="when">Draft</p>}
        {render(post.body)}
      </article>
    </main>
  );
}
