import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Moch. Althaf Jauhar | Web Developer Portfolio",
  description: "Portfolio website Althaf, seorang Web Developer yang berfokus pada React, Next.js, dan Laravel. Spesialisasi dalam pengembangan web modern dan responsif.",
  authors: [{ name: "Moch. Althaf Jauhar", url: "https://althaf.site" }],
  keywords: ["Web Developer", "React", "Next.js", "Laravel", "Portfolio", "Althaf", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Indonesia"],
  metadataBase: new URL('https://althaf.site'),
  openGraph: {
    title: 'Moch. Althaf Jauhar | Web Developer Portfolio',
    description: 'Portfolio website Althaf, seorang Web Developer yang berfokus pada React, Next.js, dan Laravel. Spesialisasi dalam pengembangan web modern dan responsif.',
    url: 'https://althaf.site',
    siteName: 'Althaf Portfolio',
    images: [
      {
        url: 'https://althaf.site/assets/lanyard/althaf.png',
        width: 800,
        height: 600,
        alt: 'Moch. Althaf Jauhar - Web Developer'
      }
    ],
    locale: 'id_ID',
    type: 'website',
    countryName: 'Indonesia'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moch. Althaf Jauhar | Web Developer Portfolio',
    description: 'Portfolio website Althaf, seorang Web Developer yang berfokus pada React, Next.js, dan Laravel.',
    images: ['https://althaf.site/assets/lanyard/althaf.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'wiHei6tAWFPPYs-DfPz8JFJkxJbq3M3RXIAYoKYBDfI'
  },
  icons: {
    icon: [
      { url: '/app/favicon.ico', sizes: 'any' },
      { url: '/as.ico', sizes: 'any' }
    ],
    shortcut: '/app/favicon.ico',
    apple: [
      { url: '/assets/lanyard/althaf.png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/app/favicon.ico'
      }
    ]
  },
  manifest: '/site.webmanifest'
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Moch. Althaf Jauhar",
  "url": "https://althaf.site",
  "image": "https://althaf.site/assets/lanyard/althaf.png",
  "sameAs": [
    "https://github.com/Studentalthaf",
    "https://www.instagram.com/_alauhar"
  ],
  "jobTitle": "Web Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "ID",
    "addressRegion": "Indonesia"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Universitas Negeri Malang"
  },
  "description": "Portfolio website Althaf, seorang Web Developer yang berfokus pada React, Next.js, dan Laravel.",
  "knowsAbout": [
    "React.js",
    "Next.js",
    "Laravel",
    "PHP",
    "JavaScript",
    "Web Development"
  ],
  "skills": [
    "Frontend Development",
    "Backend Development",
    "Web Design",
    "Database Management"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
