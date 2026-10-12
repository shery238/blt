import type { ContentStatus } from "@/lib/site";
import type { ArchitectureLayer } from "./solutions";

/**
 * USE-CASE LIBRARY
 *
 * The brief requires use cases to be selected from Cloud Design Lab's catalogue
 * (https://clouddesignlab.com/) and rewritten as original solution concepts.
 * That site could not be reached when this build was produced, so every entry below is a
 * DRAFT CONCEPT written from first principles. Each one must be:
 *   1. matched to a Cloud Design Lab source page (record the URL in `sourceRef`),
 *   2. reviewed and rewritten as needed, and
 *   3. set to status "approved" before it is indexed or shown with drafts hidden.
 *
 * None of these are Business Technique Limited client projects.
 */

export const useCaseCategories = [
  { id: "ai-automation", label: "AI and Automation" },
  { id: "data-analytics", label: "Data and Analytics" },
  { id: "cloud-infrastructure", label: "Cloud and Infrastructure" },
  { id: "healthcare-research", label: "Healthcare and Research" },
  { id: "governance-compliance", label: "Governance and Compliance" },
] as const;

export type UseCaseCategory = (typeof useCaseCategories)[number]["id"];
export type Complexity = "Foundational" | "Intermediate" | "Advanced";

export type UseCase = {
  slug: string;
  title: string;
  summary: string;
  status: ContentStatus;
  sourceRef: string | null;
  category: UseCaseCategory;
  industry: string;
  businessFunction: string;
  technologies: string[];
  outcome: string;
  complexity: Complexity;
  problem: string;
  currentState: string[];
  futureState: string[];
  solutionOverview: string;
  architecture: ArchitectureLayer[];
  dataRequirements: string[];
  controls: string[];
  benefits: string[]; // qualitative only: no figures unless substantiated
  implementation: string[];
  related: string[];
};

export const useCases: UseCase[] = [
  {
    slug: "clinical-policy-assistant",
    title: "Policy and guidance assistant for clinical support teams",
    summary: "Help support staff find the right policy or procedure in seconds, with the source always shown.",
    status: "draft",
    sourceRef: null,
    category: "ai-automation",
    industry: "Healthcare",
    businessFunction: "Operations",
    technologies: ["Retrieval-augmented generation", "Azure AI Search", "Microsoft Teams"],
    outcome: "Faster access to knowledge",
    complexity: "Intermediate",
    problem: "Support teams answer frequent questions about policies and procedures that live in hundreds of documents with inconsistent versions.",
    currentState: ["Staff search shared drives or ask colleagues", "Out-of-date versions remain in circulation", "Answers depend on who is on shift"],
    futureState: ["Staff ask questions in Teams and receive cited answers", "Only current, approved documents are used", "Unanswered questions highlight gaps in guidance"],
    solutionOverview: "An assistant indexes approved policy documents, retrieves relevant passages for each question and generates a short answer with links to the exact sources. Questions it cannot answer confidently are declined and logged for the document owners.",
    architecture: [
      { label: "Sources", items: ["Policy library", "SOPs", "Version control"] },
      { label: "Index", items: ["Parsing", "Embeddings", "Access tags"] },
      { label: "Assistant", items: ["Retrieval", "LLM", "Refusal rules"] },
      { label: "Channel", items: ["Teams", "Feedback", "Audit log"] },
    ],
    dataRequirements: ["Current approved policy documents with owners and review dates", "Document permission groups", "No patient-identifiable data in scope"],
    controls: ["Answers restricted to approved sources", "Clear statement that the assistant does not give clinical advice", "Logging and periodic review of answers", "Data protection impact assessment before rollout"],
    benefits: ["Less time spent searching for guidance", "More consistent answers across teams", "Visibility of where guidance is unclear or missing"],
    implementation: ["Start with one team and a bounded document set", "Agree an owner for each document collection", "Build an evaluation set from real questions before launch"],
    related: ["research-data-governance-register", "referral-document-triage"],
  },
  {
    slug: "referral-document-triage",
    title: "Automated triage of incoming referral documents",
    summary: "Classify and extract key details from incoming referrals so coordinators can act sooner.",
    status: "draft",
    sourceRef: null,
    category: "ai-automation",
    industry: "Healthcare",
    businessFunction: "Administration",
    technologies: ["Document intelligence", "Power Automate", "Azure"],
    outcome: "Reduced manual processing",
    complexity: "Intermediate",
    problem: "Referrals arrive by email and upload in many formats, and coordinators re-key details before work can begin.",
    currentState: ["Manual reading and re-keying", "Backlogs at peak times", "Missing information found late"],
    futureState: ["Documents classified and key fields extracted on arrival", "Missing fields flagged immediately", "Coordinators review rather than re-type"],
    solutionOverview: "Incoming documents are classified, key fields are extracted with confidence scores, and a pre-filled record is created for a coordinator to check. Low-confidence items go to a review queue with the original document alongside.",
    architecture: [
      { label: "Intake", items: ["Email", "Portal upload", "Scans"] },
      { label: "Extraction", items: ["OCR", "Classifier", "Field extraction"] },
      { label: "Review", items: ["Confidence rules", "Review queue", "Corrections"] },
      { label: "Record", items: ["Case system", "Notifications", "Audit"] },
    ],
    dataRequirements: ["Representative sample of historical referral documents", "Agreed field definitions", "Lawful basis and information governance approval for processing"],
    controls: ["Human confirmation before any record is finalised", "Data minimisation and retention rules", "Role-based access to the review queue", "Accuracy monitored by document type"],
    benefits: ["Coordinators spend less time on re-keying", "Earlier identification of incomplete referrals", "More predictable processing times"],
    implementation: ["Agree which document types to start with", "Measure baseline processing time before go-live", "Plan for corrections to improve extraction"],
    related: ["clinical-policy-assistant"],
  },
  {
    slug: "unified-performance-reporting",
    title: "Unified performance reporting on a governed data platform",
    summary: "Replace conflicting spreadsheets with one trusted set of operational metrics.",
    status: "draft",
    sourceRef: null,
    category: "data-analytics",
    industry: "Cross-industry",
    businessFunction: "Finance and performance",
    technologies: ["Microsoft Fabric", "Power BI", "dbt"],
    outcome: "Trusted decision-making",
    complexity: "Foundational",
    problem: "Monthly reporting is assembled by hand from several systems and figures differ depending on who prepared them.",
    currentState: ["Spreadsheet exports from multiple systems", "Several days of manual preparation", "Disagreement over definitions"],
    futureState: ["Automated daily data refresh", "Agreed metric definitions in one semantic model", "Self-service reports with clear ownership"],
    solutionOverview: "Source data is ingested into a lakehouse, cleaned and modelled in layers, and exposed through a governed semantic model. Power BI reports are rebuilt with users around agreed definitions.",
    architecture: [
      { label: "Sources", items: ["Finance", "Operations", "HR"] },
      { label: "Lakehouse", items: ["Raw", "Cleaned", "Curated"] },
      { label: "Model", items: ["Definitions", "Security", "Lineage"] },
      { label: "Reports", items: ["Power BI", "Alerts", "Exports"] },
    ],
    dataRequirements: ["Access to source system extracts or APIs", "Agreed owners for each metric", "Historical data for comparison"],
    controls: ["Row-level security for sensitive figures", "Data quality checks with alerts", "Documented metric definitions"],
    benefits: ["Less manual preparation each month", "One agreed version of key figures", "A data foundation ready for forecasting and AI"],
    implementation: ["Start with a small set of high-value metrics", "Run old and new reports side by side before switching", "Train report owners"],
    related: ["demand-forecasting"],
  },
  {
    slug: "demand-forecasting",
    title: "Service demand forecasting for capacity planning",
    summary: "Forecast demand weeks ahead so staffing and resources can be planned, not improvised.",
    status: "draft",
    sourceRef: null,
    category: "data-analytics",
    industry: "Public sector",
    businessFunction: "Planning",
    technologies: ["Python", "Azure Machine Learning", "Power BI"],
    outcome: "Better resource planning",
    complexity: "Advanced",
    problem: "Teams plan capacity using last year's figures and react to surges after they start.",
    currentState: ["Plans based on historical averages", "Late response to seasonal peaks", "Limited ability to test scenarios"],
    futureState: ["Rolling forecasts with explained drivers", "Scenario comparison for planning meetings", "Forecast accuracy tracked over time"],
    solutionOverview: "Explainable forecasting models combine historical demand with known calendar and external signals. Forecasts and their drivers appear in planning dashboards, and accuracy is monitored so the models can be retrained when patterns shift.",
    architecture: [
      { label: "Data", items: ["Demand history", "Calendar", "External signals"] },
      { label: "Models", items: ["Training", "Back-testing", "Explainability"] },
      { label: "Serving", items: ["Weekly scoring", "Scenarios", "API"] },
      { label: "Planning", items: ["Dashboards", "Alerts", "Review"] },
    ],
    dataRequirements: ["At least two years of consistent demand data", "Records of known disruptions", "Agreed planning horizon"],
    controls: ["Forecasts presented as ranges, not single figures", "Model documentation and limitations", "Regular accuracy review"],
    benefits: ["Earlier preparation for peaks", "More informed staffing decisions", "Shared evidence for planning discussions"],
    implementation: ["Validate data quality first", "Agree accuracy measures with planners", "Introduce alongside existing methods"],
    related: ["unified-performance-reporting"],
  },
  {
    slug: "secure-research-cloud-environment",
    title: "Secure cloud environment for collaborative research",
    summary: "Give research teams governed, reproducible compute without exporting sensitive data.",
    status: "draft",
    sourceRef: null,
    category: "cloud-infrastructure",
    industry: "Research",
    businessFunction: "Research and development",
    technologies: ["Microsoft Azure", "Terraform", "Kubernetes"],
    outcome: "Secure collaboration",
    complexity: "Advanced",
    problem: "Researchers copy data to laptops or ad-hoc servers to analyse it, creating governance and reproducibility risks.",
    currentState: ["Data copied to local machines", "Environments set up by hand", "Hard to reproduce past analyses"],
    futureState: ["Project workspaces provisioned from code", "Data stays inside the environment", "Approved outputs released through an airlock"],
    solutionOverview: "A trusted research environment pattern provides isolated, project-specific workspaces created through infrastructure as code, with controlled data ingress, output checking and full audit logging.",
    architecture: [
      { label: "Access", items: ["Identity", "MFA", "Approvals"] },
      { label: "Workspaces", items: ["Compute", "Notebooks", "Tools"] },
      { label: "Data", items: ["Ingress", "Storage", "Airlock"] },
      { label: "Platform", items: ["Terraform", "Policy", "Monitoring"] },
    ],
    dataRequirements: ["Data sharing agreements", "Classification of each dataset", "Output disclosure rules"],
    controls: ["No internet egress from workspaces", "Output checking before release", "Least-privilege access per project", "Alignment with the Five Safes framework"],
    benefits: ["Reduced risk of data leaving controlled environments", "Faster set-up for new projects", "Reproducible research"],
    implementation: ["Agree governance roles before building", "Pilot with one research project", "Plan for researcher onboarding and support"],
    related: ["research-data-governance-register"],
  },
  {
    slug: "research-data-governance-register",
    title: "AI and research data governance register",
    summary: "Track every AI system and research dataset with its owner, risks and approvals.",
    status: "draft",
    sourceRef: null,
    category: "governance-compliance",
    industry: "Cross-industry",
    businessFunction: "Governance and risk",
    technologies: ["Microsoft Purview", "Power Platform", "ISO/IEC 42001"],
    outcome: "Demonstrable accountability",
    complexity: "Foundational",
    problem: "Leaders cannot easily see which AI tools and datasets are in use, who owns them, or whether they have been assessed.",
    currentState: ["Information held in spreadsheets and emails", "Assessments repeated or missed", "Little evidence for audits"],
    futureState: ["A single register with named owners", "Assessments triggered by new or changed systems", "Evidence available on request"],
    solutionOverview: "A register records each AI system and sensitive dataset with its purpose, owner, risk rating and approvals. Workflows prompt reviews when something changes, and reports summarise the position for leadership.",
    architecture: [
      { label: "Capture", items: ["Intake form", "Discovery scans", "Suppliers"] },
      { label: "Register", items: ["Systems", "Datasets", "Owners"] },
      { label: "Assess", items: ["Risk", "DPIA", "Approval"] },
      { label: "Report", items: ["Dashboards", "Reviews", "Audit"] },
    ],
    dataRequirements: ["List of known AI tools and datasets", "Existing risk and DPIA templates", "Named accountable owners"],
    controls: ["Mandatory registration before deployment", "Periodic review dates", "Role-based edit rights"],
    benefits: ["Clear accountability", "Faster audit preparation", "Consistent risk assessment"],
    implementation: ["Agree what counts as an AI system", "Start with high-risk uses", "Link to existing risk management"],
    related: ["clinical-policy-assistant", "secure-research-cloud-environment"],
  },
];

export const getUseCase = (slug: string) => useCases.find((u) => u.slug === slug);
