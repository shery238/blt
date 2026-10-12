/**
 * Technology ecosystem. `partnership` must remain null unless an official vendor
 * partnership is independently verified; only then may partner badges be shown.
 */
export type Technology = {
  name: string;
  group: "Cloud" | "Data" | "AI" | "Engineering";
  partnership: null | { tier: string; evidenceUrl: string };
};

export const technologies: Technology[] = [
  { name: "Microsoft Azure", group: "Cloud", partnership: null },
  { name: "AWS", group: "Cloud", partnership: null },
  { name: "Google Cloud", group: "Cloud", partnership: null },
  { name: "Microsoft Fabric", group: "Data", partnership: null },
  { name: "Databricks", group: "Data", partnership: null },
  { name: "Snowflake", group: "Data", partnership: null },
  { name: "Power BI", group: "Data", partnership: null },
  { name: "Azure AI Foundry", group: "AI", partnership: null },
  { name: "Python", group: "AI", partnership: null },
  { name: "Kubernetes", group: "Engineering", partnership: null },
  { name: "Terraform", group: "Engineering", partnership: null },
  { name: "GitHub Actions", group: "Engineering", partnership: null },
];

/**
 * Compliance position. Every status defaults to "unconfirmed" until evidence is supplied.
 * Allowed values once verified: certified, registered, aligned, working-towards.
 */
export type ComplianceStatus = "certified" | "registered" | "aligned" | "working-towards" | "unconfirmed";

export const compliance: { name: string; description: string; status: ComplianceStatus; evidence: string | null }[] = [
  { name: "ISO/IEC 27001", description: "Information security management", status: "unconfirmed", evidence: null },
  { name: "ISO/IEC 42001", description: "AI management systems", status: "unconfirmed", evidence: null },
  { name: "UK GDPR", description: "Personal data protection", status: "unconfirmed", evidence: null },
  { name: "Data Protection Act 2018", description: "UK data protection law", status: "unconfirmed", evidence: null },
  { name: "NHS DSP Toolkit", description: "Health and care data security, where relevant", status: "unconfirmed", evidence: null },
  { name: "Cyber Essentials", description: "Government-backed baseline cyber security", status: "unconfirmed", evidence: null },
  { name: "Responsible AI principles", description: "Fairness, transparency, accountability, safety", status: "unconfirmed", evidence: null },
  { name: "Secure development", description: "Secure software development lifecycle", status: "unconfirmed", evidence: null },
];

export const complianceLabels: Record<ComplianceStatus, string> = {
  certified: "Certified",
  registered: "Registered",
  aligned: "Aligned",
  "working-towards": "Working towards",
  unconfirmed: "Status to be confirmed",
};
