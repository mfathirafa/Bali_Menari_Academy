import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] px-6 text-center gap-6">
      <p className="text-xs tracking-[0.25em] text-gray-400 uppercase font-sans">404</p>
      <h1 className="text-4xl font-serif font-normal text-gray-900">Halaman Tidak Ditemukan</h1>
      <p className="text-base text-gray-500 font-sans max-w-sm">
        Halaman yang kamu cari tidak ada. Yuk kembali ke halaman utama.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-gray-900 text-white text-sm tracking-widest uppercase hover:bg-gray-700 transition-colors"
      >
        Kembali
      </Link>
    </main>
  );
}
