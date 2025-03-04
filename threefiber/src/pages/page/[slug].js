import { useRouter } from 'next/router';
import Title from '@/components/Title';
import Scene3D from '@/components/Scene3D';
import TextContent from '@/components/TextContent';

export default function DynamicPage() {
  const { query } = useRouter();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Title text={`Page: ${query.slug}`} />
      <Scene3D />
      <TextContent text="Voici un texte descriptif pour cette page dynamique." />
    </main>
  );
}
