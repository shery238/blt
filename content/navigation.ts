import { services } from "./services";
import { solutionCategories } from "./solutions";
import { useCaseCategories } from "./use-cases";

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Our Company", href: "/about" },
      { label: "Our Expertise", href: "/about/expertise" },
      { label: "Research and Innovation", href: "/research" },
      { label: "Responsible AI and Governance", href: "/about/responsible-ai" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      "artificial-intelligence",
      "data-and-analytics",
      "cloud-and-platform-engineering",
      "digital-transformation",
      "healthcare-innovation-and-rd",
      "cybersecurity-and-ai-governance",
    ].map((slug) => {
      const s = services.find((x) => x.slug === slug)!;
      const label =
        slug === "artificial-intelligence" ? "Artificial Intelligence"
        : slug === "healthcare-innovation-and-rd" ? "Healthcare Innovation and R&D"
        : slug === "cybersecurity-and-ai-governance" ? "Cybersecurity and AI Governance"
        : s.title;
      return { label, href: `/services/${slug}` };
    }),
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: solutionCategories.map((c) => ({ label: c.label, href: `/solutions#${c.id}` })),
  },
  {
    label: "Use Cases",
    href: "/use-cases",
    children: [
      { label: "All Use Cases", href: "/use-cases" },
      ...useCaseCategories.map((c) => ({ label: c.label, href: `/use-cases?category=${c.id}` })),
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "Contact Us", href: "/contact" },
];
