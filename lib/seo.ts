import type { Metadata } from "next";
import { site } from "./site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  type?: "website" | "article";
};

export function buildMetadata({ title, description, path, noindex, type = "website" }: MetaInput): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, locale: site.locale, type },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}${site.logo}`,
    description: site.description,
    ...(site.email && { email: site.email }),
    ...(site.phone && { telephone: site.phone }),
    ...(site.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.locality,
        postalCode: site.address.postcode,
        addressCountry: site.address.country,
      },
    }),
    ...(site.socials.length && { sameAs: site.socials.map((s) => s.href) }),
    areaServed: "GB",
    knowsAbout: [
      "Artificial intelligence",
      "Data analytics",
      "Cloud engineering",
      "Healthcare innovation",
      "Scientific research",
      "Responsible AI governance",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "en-GB",
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${site.url}${path}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "GB",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
