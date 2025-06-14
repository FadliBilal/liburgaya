import Head from 'next/head'
import Greet from '@/components/Greet'
import splitbee from '@splitbee/web'

interface Quote {
  q: string;
  a: string;
}

export default function Home({ quote }: { quote: Quote }) {
  splitbee.init()

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50 font-sans text-slate-800">
      <Head>
        <title>Libur Ga Yaa?</title>
        <link rel="icon" href="/cat-work.gif" />
        <meta name="description" content="Cek apakah hari ini libur nasional atau akhir pekan. Ada juga quotes harian yang memotivasi!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Fadli Bilal" />
        <meta name="keywords" content="libur nasional, tanggal merah, cek libur, kalender Indonesia, quotes harian" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://liburgayaa.vercel.app/" />
        <meta property="og:title" content="Libur Ga Yaa? - Cek Libur & Quotes Harian" />
        <meta property="og:description" content="Cari tahu apakah hari ini libur atau tidak, lengkap dengan quotes motivasi harian." />
        <meta property="og:image" content="https://liburgayaa.vercel.app/og-preview.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://liburgayaa.vercel.app/" />
        <meta property="twitter:title" content="Libur Ga Yaa? - Cek Libur & Quotes Harian" />
        <meta property="twitter:description" content="Cari tahu apakah hari ini libur atau tidak, lengkap dengan quotes motivasi harian." />
        <meta property="twitter:image" content="https://liburgayaa.vercel.app/og-preview.png" />
      </Head>

      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <div className="flex flex-col items-center gap-6 max-w-lg w-full">
          <Greet />

          <div className="w-full rounded-md bg-white p-4 sm:p-6 shadow-sm sm:shadow-md">
            <p className="text-base sm:text-lg italic text-slate-700 leading-snug">
              "{quote.q}"
            </p>
            <p className="mt-3 text-sm text-slate-500">— {quote.a}</p>
          </div>
        </div>
      </main>

      <footer className="shrink-0 w-full p-4 text-center text-sm text-slate-400">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://fadli-portofs.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 hover:underline"
          >
            Develop by <strong>Fadli Bilal</strong>
          </a>
          <span>|</span>
          <a
            className="flex items-center gap-1 hover:text-slate-600 hover:underline"
            href="https://kemenkopmk.go.id/sites/default/files/pengumuman/2022-10/SKB%20LibNas%20dan%20CuBer%202023.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sumber Data
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://zenquotes.io/api/today').then((res) => res.json())
  const quote = res[0]

  return {
    props: {
      quote,
    },
    revalidate: 3600,
  }
}
