/**
 * COMPANY IDENTITY: single source of truth.
 *
 * Every value marked TODO must be copied from https://businesstechltd.co.uk/ (or Companies House)
 * and verified before launch. Unset values are hidden from the UI and from structured data,
 * so nothing unverified is ever published.
 */
export const site = {
  name: "Business Technique Limited",
  shortName: "Business Technique",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://businesstechltd.co.uk").replace(/\/$/, ""),
  locale: "en_GB",
  description:
    "Research-led consultancy combining artificial intelligence, data intelligence, cloud engineering and healthcare innovation to solve complex business and healthcare challenges.",
  // TODO: verified contact details from the existing website
  email: null as string | null,
  phone: null as string | null,
  address: null as null | {
    street: string;
    locality: string;
    postcode: string;
    country: "GB";
  },
  companyNumber: null as string | null, // TODO: Companies House registration number
  socials: [] as { label: string; href: string }[], // TODO: verified social profiles only
  // TODO: replace with the logo exported from the existing website (public/brand/logo.svg)
  logo: "/brand/logo-placeholder.svg",
};

export const showDrafts = process.env.NEXT_PUBLIC_SHOW_DRAFTS !== "false";

export type ContentStatus = "draft" | "in-review" | "approved";
