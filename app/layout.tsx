import type { Metadata } from "next";
import { Inter, Sorts_Mill_Goudy } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sortMillGoudy = Sorts_Mill_Goudy({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://balimenari.warmaheritagegroup.com"),
  title: "Bali Menari Academy | Tempat Les Tari Anak di Bali",
  description:
    "Tempat les tari anak dengan pilihan kelas tari tradisional Bali dan modern dance, yang menumbuhkan kepercayaan diri melalui gerakan. Growing Confidence Through Movement.",
  keywords: [
    "Bali Menari Academy",
    "les tari anak Bali",
    "kelas tari tradisional Bali",
    "modern dance anak",
    "K-pop dance Bali",
    "kelas tari Bali",
    "sekolah tari Bali",
    "joyful learning dance",
    "tari Bali anak",
  ],
  authors: [{ name: "Bali Menari Academy", url: "https://balimenari.warmaheritagegroup.com" }],
  creator: "Bali Menari Academy",
  publisher: "Warma Heritage Group",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Bali Menari Academy | Tempat Les Tari Anak di Bali",
    description:
      "Tempat les tari anak dengan pilihan kelas tari tradisional Bali dan modern dance, yang menumbuhkan kepercayaan diri melalui gerakan.",
    url: "https://balimenari.warmaheritagegroup.com",
    siteName: "Bali Menari Academy",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Bali Menari Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bali Menari Academy | Tempat Les Tari Anak di Bali",
    description:
      "Tempat les tari anak dengan pilihan kelas tari tradisional Bali dan modern dance, yang menumbuhkan kepercayaan diri melalui gerakan.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Bali Menari Academy",
              description:
                "Tempat les tari anak dengan pilihan kelas tari tradisional Bali dan modern dance, yang menumbuhkan kepercayaan diri melalui gerakan.",
              url: "https://balimenari.warmaheritagegroup.com",
              telephone: "+62-812-3966-9880",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jalan Sekar Tunjung XV No. 1A",
                addressLocality: "Denpasar",
                addressRegion: "Bali",
                postalCode: "80237",
                addressCountry: "ID",
              },
              parentOrganization: {
                "@type": "Organization",
                name: "Warma Heritage Group",
                url: "https://warmaheritagegroup.com",
              },
            }),
          }}
        />
      </head>
      <body className={sortMillGoudy.className}>{children}</body>
    </html>
  );
}
