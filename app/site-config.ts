const fallbackSiteUrl = "http://localhost:3000";

function normalizeSiteUrl(value: string | undefined): string {
  if (!value) return fallbackSiteUrl;

  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return fallbackSiteUrl;
    return url.toString().replace(/\/+$/, "");
  } catch {
    return fallbackSiteUrl;
  }
}

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelSiteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const siteUrl = normalizeSiteUrl(
  configuredSiteUrl ?? (vercelSiteUrl ? `https://${vercelSiteUrl}` : undefined),
);
export const siteName = "Indra Kurniawan Portfolio";
export const description = "Indra Kurniawan is a web developer and SEO specialist from Indonesia, focused on fullstack development, WordPress, and practical digital solutions.";
