import type { ContentStatus } from "@/lib/site";

export type ArchitectureLayer = { label: string; items: string[] };

export type Solution = {
  slug: string;
  title: string;
  category: SolutionCategory;
  status: ContentStatus; // all offerings are proposed until approved by Business Technique Limited
  summary: string;
  problem: string;
  components: { title: string; text: string }[];
  architecture: ArchitectureLayer[];
  serviceSlug: string;
};

export const solutionCategories = [
  { id: "enterprise-ai", label: "Enterprise AI Solutions" },
  { id: "agents-automation", label: "AI Agents and Automation" },
  { id: "data-intelligence", label: "Data Intelligence Platforms" },
  { id: "ai-governance", label: "AI Governance Platforms" },
  { id: "healthcare-ai", label: "Healthcare AI Solutions" },
  { id: "mlops", label: "MLOps and LLMOps" },
] as const;

export type SolutionCategory = (typeof solutionCategories)[number]["id"];

export const solutions: Solution[] = [
  {
    slug: "enterprise-ai-assistants",
    title: "Enterprise AI Assistants",
    category: "enterprise-ai",
    status: "draft",
    summary: "Secure assistants that answer staff questions from approved organisational knowledge, with citations.",
    problem: "Staff lose time searching policies, procedures and past work, and answers vary depending on who is asked.",
    components: [
      { title: "Grounded answers", text: "Responses drawn only from approved sources, with links back to each source." },
      { title: "Permission-aware search", text: "Users only see content their existing permissions allow." },
      { title: "Feedback loop", text: "Ratings and flagged answers feed a regular quality review." },
    ],
    architecture: [
      { label: "Sources", items: ["SharePoint", "Policies", "Knowledge bases"] },
      { label: "Ingestion", items: ["Chunking", "Embedding", "Access metadata"] },
      { label: "Reasoning", items: ["Retrieval", "LLM", "Guardrails"] },
      { label: "Experience", items: ["Teams", "Web app", "Audit log"] },
    ],
    serviceSlug: "artificial-intelligence",
  },
  {
    slug: "agentic-ai-multi-agent-systems",
    title: "Agentic AI and Multi-Agent Systems",
    category: "agents-automation",
    status: "draft",
    summary: "Supervised agents that plan and complete multi-step tasks across tools, with human checkpoints.",
    problem: "Many workflows involve several systems and judgement calls, which simple automation cannot handle.",
    components: [
      { title: "Task planning", text: "Agents break goals into steps and choose the right tool for each." },
      { title: "Human in the loop", text: "Approval points for any action with financial, clinical or legal impact." },
      { title: "Full traceability", text: "Every decision, tool call and output recorded for review." },
    ],
    architecture: [
      { label: "Trigger", items: ["Request", "Event", "Schedule"] },
      { label: "Orchestration", items: ["Planner agent", "Specialist agents", "Policy checks"] },
      { label: "Tools", items: ["APIs", "Databases", "Documents"] },
      { label: "Oversight", items: ["Approvals", "Trace log", "Evaluation"] },
    ],
    serviceSlug: "artificial-intelligence",
  },
  {
    slug: "retrieval-augmented-generation",
    title: "Retrieval-Augmented Generation",
    category: "enterprise-ai",
    status: "draft",
    summary: "RAG pipelines that combine language models with your own documents and data, evaluated for accuracy.",
    problem: "General-purpose models do not know your organisation and can produce confident but unsupported answers.",
    components: [
      { title: "Retrieval design", text: "Hybrid keyword and vector search tuned to your content." },
      { title: "Answer evaluation", text: "Automated checks for groundedness, relevance and completeness." },
      { title: "Content lifecycle", text: "Updates and removals reflected in the index automatically." },
    ],
    architecture: [
      { label: "Content", items: ["Documents", "Databases", "Web pages"] },
      { label: "Index", items: ["Parsing", "Embeddings", "Hybrid index"] },
      { label: "Generation", items: ["Retriever", "Re-ranker", "LLM"] },
      { label: "Quality", items: ["Groundedness", "Citations", "Monitoring"] },
    ],
    serviceSlug: "artificial-intelligence",
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    category: "agents-automation",
    status: "draft",
    summary: "Intelligent document processing and workflow automation for high-volume administrative work.",
    problem: "Forms, referrals, invoices and emails are read and re-keyed by hand, creating delays and errors.",
    components: [
      { title: "Document understanding", text: "Classification and field extraction with confidence scores." },
      { title: "Exception handling", text: "Low-confidence items routed to a person with context attached." },
      { title: "System integration", text: "Results written into the systems teams already use." },
    ],
    architecture: [
      { label: "Intake", items: ["Email", "Uploads", "Scans"] },
      { label: "Understanding", items: ["OCR", "Classification", "Extraction"] },
      { label: "Workflow", items: ["Validation", "Routing", "Exceptions"] },
      { label: "Systems", items: ["CRM", "ERP", "Case management"] },
    ],
    serviceSlug: "artificial-intelligence",
  },
  {
    slug: "ai-governance-risk-intelligence",
    title: "AI Governance and Risk Intelligence",
    category: "ai-governance",
    status: "draft",
    summary: "A living register of AI systems with risk assessments, controls and evidence in one place.",
    problem: "Organisations often cannot say where AI is used, who owns it or how its risks are managed.",
    components: [
      { title: "AI system register", text: "Inventory of models, tools and use cases with named owners." },
      { title: "Risk workflows", text: "Impact assessments and approvals aligned to ISO/IEC 42001." },
      { title: "Assurance reporting", text: "Board-level reporting drawn from live monitoring data." },
    ],
    architecture: [
      { label: "Inventory", items: ["AI register", "Owners", "Suppliers"] },
      { label: "Assessment", items: ["Impact", "Data protection", "Bias"] },
      { label: "Controls", items: ["Policies", "Approvals", "Testing"] },
      { label: "Assurance", items: ["Monitoring", "Incidents", "Reporting"] },
    ],
    serviceSlug: "cybersecurity-and-ai-governance",
  },
  {
    slug: "enterprise-data-platforms",
    title: "Enterprise Data Platforms",
    category: "data-intelligence",
    status: "draft",
    summary: "Governed lakehouse platforms that unify operational data for reporting, analytics and AI.",
    problem: "Data is copied between systems and spreadsheets, so figures conflict and nobody trusts them.",
    components: [
      { title: "Medallion architecture", text: "Raw, refined and curated layers with clear quality gates." },
      { title: "Lineage and catalogue", text: "Know where every figure comes from and who owns it." },
      { title: "Self-service analytics", text: "Governed semantic models that teams can build on safely." },
    ],
    architecture: [
      { label: "Sources", items: ["Operational systems", "APIs", "Files"] },
      { label: "Lakehouse", items: ["Bronze", "Silver", "Gold"] },
      { label: "Serving", items: ["Semantic model", "Feature store", "APIs"] },
      { label: "Consumers", items: ["Power BI", "Data science", "AI apps"] },
    ],
    serviceSlug: "data-and-analytics",
  },
  {
    slug: "mlops-and-llmops",
    title: "MLOps and LLMOps",
    category: "mlops",
    status: "draft",
    summary: "The pipelines, evaluation and monitoring needed to run machine learning and LLM systems reliably.",
    problem: "Models are deployed by hand, rarely re-evaluated and quietly degrade in production.",
    components: [
      { title: "Automated pipelines", text: "Training, evaluation and deployment as versioned, repeatable steps." },
      { title: "Evaluation gates", text: "Quality, safety and cost thresholds that must pass before release." },
      { title: "Production monitoring", text: "Drift, latency, cost and quality tracked with alerts." },
    ],
    architecture: [
      { label: "Develop", items: ["Experiments", "Prompt library", "Datasets"] },
      { label: "Validate", items: ["Test suites", "Safety checks", "Approval"] },
      { label: "Deploy", items: ["Model registry", "CI/CD", "Endpoints"] },
      { label: "Operate", items: ["Monitoring", "Drift", "Cost"] },
    ],
    serviceSlug: "cloud-and-platform-engineering",
  },
  {
    slug: "cloud-native-applications",
    title: "Cloud-Native Applications",
    category: "data-intelligence",
    status: "draft",
    summary: "Secure, scalable applications built on containers and managed cloud services.",
    problem: "Legacy applications are hard to change, expensive to run and difficult to secure.",
    components: [
      { title: "Modern architecture", text: "Services designed for independent change and scaling." },
      { title: "Secure by default", text: "Identity, secrets and network controls built in from the start." },
      { title: "Observability", text: "Logs, metrics and traces that make issues quick to diagnose." },
    ],
    architecture: [
      { label: "Edge", items: ["CDN", "WAF", "Identity"] },
      { label: "Services", items: ["APIs", "Workers", "Events"] },
      { label: "Data", items: ["Databases", "Storage", "Cache"] },
      { label: "Platform", items: ["Kubernetes", "Terraform", "Monitoring"] },
    ],
    serviceSlug: "cloud-and-platform-engineering",
  },
  {
    slug: "predictive-analytics",
    title: "Predictive Analytics",
    category: "data-intelligence",
    status: "draft",
    summary: "Forecasting and risk models that help teams plan capacity, demand and intervention.",
    problem: "Planning relies on last year's figures and intuition, so teams react rather than prepare.",
    components: [
      { title: "Explainable models", text: "Clear drivers behind every forecast, not black-box scores." },
      { title: "Scenario planning", text: "Compare outcomes under different assumptions." },
      { title: "Embedded insight", text: "Predictions delivered inside the reports teams already use." },
    ],
    architecture: [
      { label: "Data", items: ["History", "External signals", "Features"] },
      { label: "Modelling", items: ["Training", "Validation", "Explainability"] },
      { label: "Serving", items: ["Batch scoring", "API", "Scenarios"] },
      { label: "Use", items: ["Dashboards", "Alerts", "Planning"] },
    ],
    serviceSlug: "data-and-analytics",
  },
  {
    slug: "healthcare-ai-research",
    title: "Healthcare AI Research",
    category: "healthcare-ai",
    status: "draft",
    summary: "Research partnerships exploring AI methods for healthcare questions under strong governance.",
    problem: "Healthcare organisations want to explore AI but need evidence, ethics approval and data safeguards first.",
    components: [
      { title: "Research protocols", text: "Clear questions, methods and success criteria agreed up front." },
      { title: "Governed data access", text: "Work inside trusted research environments with minimised data." },
      { title: "Honest reporting", text: "Results, limitations and next steps reported transparently." },
    ],
    architecture: [
      { label: "Question", items: ["Clinical need", "Protocol", "Ethics"] },
      { label: "Data", items: ["De-identification", "TRE", "Governance"] },
      { label: "Methods", items: ["Modelling", "Evaluation", "Bias review"] },
      { label: "Evidence", items: ["Findings", "Limitations", "Publication"] },
    ],
    serviceSlug: "healthcare-innovation-and-rd",
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
