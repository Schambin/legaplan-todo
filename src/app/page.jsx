import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Todo List</h1>
      <Link href="/todo">Go to Todo List</Link>
    </div>
  );
}
