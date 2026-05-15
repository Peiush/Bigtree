import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default async function QRMenuPage(props: PageProps<'/qr/[tableId]'>) {
  const { tableId } = await props.params;
  const tableName = tableId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
        <div className="pt-24 pb-16 px-6 text-center max-w-lg mx-auto">
          <div className="text-4xl mb-4">🌿</div>
          <p className="text-xs tracking-[2.5px] uppercase mb-3" style={{ color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace' }}>
            Welcome
          </p>
          <h1 className="font-serif italic text-3xl mb-2" style={{ color: 'var(--color-gold-cream)' }}>
            The Big Tree Cafe
          </h1>
          <p className="text-sm mb-8" style={{ color: 'var(--color-muted)' }}>
            {tableName} · Browse the menu and order directly from your phone.
          </p>

          <Link href={`/menu?table=${tableId}`}
            className="w-full block text-center py-4 rounded-full text-sm font-medium mb-4"
            style={{ background: 'var(--color-gold)', color: 'var(--color-bg)' }}>
            Browse Menu & Order →
          </Link>

          <Link href="/reserve"
            className="w-full block text-center py-3 rounded-full text-sm font-medium"
            style={{ border: '1px solid rgba(200,145,58,0.3)', color: 'var(--color-gold)' }}>
            Reserve for Next Visit
          </Link>

          <p className="mt-8 text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'DM Mono, monospace' }}>
            Need help? Ask your server or call us at +91 818 395 9595
          </p>
        </div>
      </main>
    </>
  );
}
