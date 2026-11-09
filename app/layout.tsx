import type { Metadata, Viewport } from "next";
import "./globals.css";
import { description, siteName, siteUrl } from "./site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Indra Kurniawan — Web Developer & SEO Specialist",
    template: "%s | Indra Kurniawan",
  },
  description,
  keywords: ["Indra Kurniawan", "Web Developer Indonesia", "SEO Specialist", "Fullstack Development", "WordPress Developer", "Portfolio"],
  authors: [{ name: "Indra Kurniawan" }],
  creator: "Indra Kurniawan",
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName,
    title: "Indra Kurniawan — Web Developer & SEO Specialist",
    description,
    images: [
      {
        url: "/uploads/Fotoku.png",
        width: 984,
        height: 1196,
        alt: "Indra Kurniawan, Web Developer and SEO Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indra Kurniawan — Web Developer & SEO Specialist",
    description,
    images: ["/uploads/Fotoku.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1228" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Indra Kurniawan",
  url: siteUrl,
  image: `${siteUrl}/uploads/Fotoku.png`,
  jobTitle: "Web Developer and SEO Specialist",
  description,
  address: {
    "@type": "PostalAddress",
    addressCountry: "ID",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universitas Trunojoyo Madura",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description,
  inLanguage: "id-ID",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </body>
    </html>
  );
}
