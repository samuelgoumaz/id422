import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Bienvenue sur mon site</h1>
      <p className="text-lg mt-4">Cliquez sur un lien pour voir une page dynamique.</p>
      <Link href="/page/example-slug" className="mt-4 text-blue-500 underline">
        Aller à la page dynamique
      </Link>
    </main>
  );
}
