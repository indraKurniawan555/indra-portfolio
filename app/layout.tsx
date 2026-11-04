import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indra Kurniawan — Web Developer & SEO Specialist",
  description: "Personal portfolio of Indra Kurniawan, a fresh graduate in Information Systems focused on web development and SEO.",
  keywords: ["Indra Kurniawan", "Web Developer", "SEO Specialist", "Fullstack Development", "WordPress", "Portfolio"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
