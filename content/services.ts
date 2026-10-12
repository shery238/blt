export type Service = {
  slug: string;
  title: string;
  short: string; // used on the homepage capability panels
  summary: string;
  capabilityNumber?: string; // homepage capability pillar (01–05)
  challenges: string[];
  capabilities: { title: string; text: string }[];
  benefits: string[];
  technologies: string[];
  useCaseCategories: string[];
};

export const services: Service[] = [
  {
    slug: "artificial-intelligence",
    capabilityNumber: "01",
    title: "Artificial Intelligence and Automation",
    short: "Assistants, agents and automated workflows that take routine effort out of skilled work.",
    summary:
      "We help organisations move from AI experiments to dependable systems: assistants grounded in their own knowledge, agents that complete multi-step tasks under supervision, and automation that removes repetitive work without removing human judgement.",
    challenges: [
      "Pilots that impress in a demo but never reach production",
      "Knowledge locked in documents, inboxes and individual expertise",
      "Manual, error-prone processes that consume specialist time",
      "Uncertainty about where AI is safe and worthwhile to apply",
    ],
    capabilities: [
      { title: "Enterprise AI assistants", text: "Assistants that answer from approved sources and cite them, with access controls that mirror your existing permissions." },
      { title: "Agentic workflows", text: "Agents that plan, call tools and hand back to people at defined checkpoints, with every action logged." },
      { title: "Process automation", text: "Document intake, classification, extraction and routing, built around the systems you already run." },
      { title: "Evaluation and testing", text: "Test sets, quality metrics and red-teaming so you know how a model behaves before your users do." },
    ],
    benefits: [
      "Specialists spend more time on judgement and less on retrieval and re-keying",
      "Faster, more consistent responses to routine requests",
      "A repeatable path from prototype to supported production service",
    ],
    technologies: ["Azure AI Foundry", "Azure OpenAI", "Python", "LangGraph", "Vector search", "Power Automate"],
    useCaseCategories: ["ai-automation"],
  },
  {
    slug: "data-and-analytics",
    capabilityNumber: "02",
    title: "Data and Analytics",
    short: "Trustworthy data platforms, governed models and analytics people actually use.",
    summary:
      "Good AI depends on good data. We design data platforms, pipelines and reporting that give decision-makers one reliable picture, with lineage and quality checks built in rather than bolted on.",
    challenges: [
      "Reports that disagree because data is copied between systems",
      "Slow, manual month-end and performance reporting",
      "No clear ownership or quality standard for critical data",
      "Analytics teams spending most of their time preparing data",
    ],
    capabilities: [
      { title: "Data platform design", text: "Lakehouse and warehouse architectures on Microsoft Fabric, Databricks or Snowflake, sized to your needs." },
      { title: "Pipelines and integration", text: "Reliable ingestion from operational systems, APIs and files, with monitoring and alerting." },
      { title: "Analytics and BI", text: "Semantic models and Power BI reporting designed with the people who use them." },
      { title: "Predictive analytics", text: "Forecasting and risk models with transparent features and documented limitations." },
    ],
    benefits: [
      "One trusted version of key metrics",
      "Shorter time from question to evidence",
      "Data foundations ready for AI workloads",
    ],
    technologies: ["Microsoft Fabric", "Databricks", "Snowflake", "Power BI", "dbt", "Python"],
    useCaseCategories: ["data-analytics"],
  },
  {
    slug: "cloud-and-platform-engineering",
    capabilityNumber: "03",
    title: "Cloud and Platform Engineering",
    short: "Secure, observable cloud platforms that make shipping software routine.",
    summary:
      "We build the platforms that AI and data services run on: infrastructure as code, automated delivery pipelines, container platforms and the monitoring needed to operate them with confidence.",
    challenges: [
      "Environments built by hand that drift and are hard to reproduce",
      "Releases that need long change windows and manual steps",
      "Rising cloud costs without clear ownership",
      "Security controls applied inconsistently across teams",
    ],
    capabilities: [
      { title: "Landing zones", text: "Well-architected Azure, AWS or Google Cloud foundations with identity, networking and policy in place." },
      { title: "Infrastructure as code", text: "Terraform modules and review workflows so every change is versioned and repeatable." },
      { title: "Delivery pipelines", text: "GitHub Actions pipelines with automated tests, security scanning and staged releases." },
      { title: "Cloud-native applications", text: "Containerised services on Kubernetes or managed platforms, designed for resilience." },
    ],
    benefits: [
      "Faster, lower-risk releases",
      "Clear visibility of cost and usage",
      "Security and compliance enforced by default",
    ],
    technologies: ["Microsoft Azure", "AWS", "Google Cloud", "Kubernetes", "Terraform", "GitHub Actions"],
    useCaseCategories: ["cloud-infrastructure"],
  },
  {
    slug: "healthcare-innovation-and-rd",
    capabilityNumber: "04",
    title: "Healthcare Research and Innovation",
    short: "Scientific and experimental research that turns healthcare questions into evidence.",
    summary:
      "Research is where Business Technique began. We design and run scientific, experimental, social and behavioural research, and apply AI and data methods to healthcare questions with the rigour and governance the sector requires.",
    challenges: [
      "Promising ideas without the evidence needed to take them further",
      "Research data spread across tools with inconsistent governance",
      "Difficulty involving under-represented groups, including neurodivergent people",
      "Uncertainty about regulatory expectations for health technology",
    ],
    capabilities: [
      { title: "Research design", text: "Study design, protocols and analysis plans for experimental, social and behavioural research." },
      { title: "Healthcare AI research", text: "Exploratory modelling and evaluation of AI methods on appropriately governed health data." },
      { title: "Neurodivergent research", text: "Inclusive research and co-designed innovation with neurodivergent participants." },
      { title: "Research governance", text: "Ethics, data protection and information governance planned from the start." },
    ],
    benefits: [
      "Evidence that stands up to scrutiny from funders, partners and regulators",
      "Research outputs that can inform real service and product decisions",
      "Governance that protects participants and data",
    ],
    technologies: ["Python", "R", "Trusted research environments", "Azure", "Power BI"],
    useCaseCategories: ["healthcare-research"],
  },
  {
    slug: "cybersecurity-and-ai-governance",
    capabilityNumber: "05",
    title: "Responsible AI and Governance",
    short: "Controls, assurance and security so AI can be adopted with confidence.",
    summary:
      "We help organisations set up the policies, risk processes and technical controls that responsible AI needs, aligned with recognised frameworks such as ISO/IEC 42001 and UK data protection law.",
    challenges: [
      "AI use growing faster than policy and oversight",
      "No inventory of where models and AI tools are used",
      "Unclear accountability when AI-supported decisions go wrong",
      "Security teams unsure how to assess AI-specific risks",
    ],
    capabilities: [
      { title: "AI governance frameworks", text: "Policies, roles and approval processes aligned to ISO/IEC 42001 and your existing risk management." },
      { title: "AI risk and impact assessment", text: "Structured assessments covering data protection, bias, safety and explainability." },
      { title: "Secure AI engineering", text: "Threat modelling for AI systems, including prompt injection and data leakage." },
      { title: "Monitoring and assurance", text: "Ongoing evaluation, logging and reporting that give boards evidence, not reassurance." },
    ],
    benefits: [
      "Clear accountability for every AI system in use",
      "Faster approvals because the evidence is ready",
      "Reduced legal, ethical and reputational risk",
    ],
    technologies: ["ISO/IEC 42001", "ISO/IEC 27001", "Microsoft Purview", "Azure Monitor", "Model evaluation tooling"],
    useCaseCategories: ["governance-compliance"],
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    short: "Practical change programmes that connect technology to how people work.",
    summary:
      "Technology only changes outcomes when people and processes change with it. We help organisations map current ways of working, set a realistic roadmap and deliver change in stages that each show value.",
    challenges: [
      "Strategies that never translate into delivery",
      "Legacy systems and processes that block new services",
      "Low adoption of tools that were expensive to introduce",
    ],
    capabilities: [
      { title: "Current-state assessment", text: "Process, systems and data mapping with the people who do the work." },
      { title: "Roadmaps and business cases", text: "Prioritised, costed plans with clear measures of success." },
      { title: "Delivery and adoption", text: "Staged delivery with training, communication and feedback loops." },
    ],
    benefits: [
      "A roadmap leadership can fund and teams can deliver",
      "Measured progress at every stage",
      "Higher adoption of new tools and processes",
    ],
    technologies: ["Process mapping", "Microsoft 365", "Power Platform", "Azure"],
    useCaseCategories: ["ai-automation", "data-analytics"],
  },
];

export const capabilityServices = services.filter((s) => s.capabilityNumber);
export const getService = (slug: string) => services.find((s) => s.slug === slug);
