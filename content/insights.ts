import type { ContentStatus } from "@/lib/site";

/** Editorial drafts. Author and publication date must be set at approval. */
export type Insight = {
  slug: string;
  title: string;
  topic: string;
  excerpt: string;
  status: ContentStatus;
  author: string | null;
  publishedAt: string | null; // ISO date, set on approval
  body: string[];
};

export const insights: Insight[] = [
  {
    slug: "from-ai-pilot-to-production",
    title: "Why AI pilots stall, and what gets them into production",
    topic: "Enterprise AI adoption",
    excerpt: "Most AI pilots fail for organisational reasons, not technical ones. Here is what we look for before a pilot starts.",
    status: "draft", author: null, publishedAt: null,
    body: [
      "A pilot that impresses in a demonstration can still fail to reach production. The reasons are rarely about the model. More often, nobody owns the service after launch, the data it depends on is not maintained, or there is no agreed measure of whether it is working.",
      "Before a pilot begins, we ask three questions: who will own this when it is live, how will we know it is good enough, and what would make us stop. Answering them early changes how a pilot is designed.",
      "Pilots designed with production in mind use real data under real controls, include an evaluation set from day one and involve the people who will support the service. They take slightly longer to start and much less time to finish.",
    ],
  },
  {
    slug: "agentic-ai-needs-checkpoints",
    title: "Agentic AI needs checkpoints, not just capabilities",
    topic: "Agentic AI",
    excerpt: "Agents that act on your systems need clearly designed points where people stay in control.",
    status: "draft", author: null, publishedAt: null,
    body: [
      "AI agents can plan tasks, call tools and act across systems. That is useful and it changes the risk profile. An assistant that drafts a reply is different from an agent that sends it.",
      "We design agentic systems around checkpoints: points where a person approves, corrects or stops the agent before anything with financial, clinical or legal impact happens. Every step is logged so decisions can be reviewed later.",
      "Starting with narrow, well-understood tasks and widening scope as evidence builds is slower than the hype suggests, and far more likely to last.",
    ],
  },
  {
    slug: "responsible-ai-is-operational",
    title: "Responsible AI is an operating practice, not a policy document",
    topic: "Responsible AI",
    excerpt: "Principles matter, but accountability comes from registers, reviews and monitoring that actually run.",
    status: "draft", author: null, publishedAt: null,
    body: [
      "Many organisations have published AI principles. Fewer can show which systems those principles apply to, who is accountable for each one, or how they would detect a problem.",
      "Standards such as ISO/IEC 42001 are useful because they turn principles into management practice: an inventory, risk assessment, defined roles, monitoring and continual improvement.",
      "The most effective governance is proportionate. Low-risk uses move quickly; high-risk uses get deeper scrutiny. Both are recorded.",
    ],
  },
  {
    slug: "data-governance-before-ai",
    title: "Data governance is the quiet prerequisite for useful AI",
    topic: "Data governance",
    excerpt: "Clear ownership, definitions and quality checks do more for AI outcomes than a bigger model.",
    status: "draft", author: null, publishedAt: null,
    body: [
      "When an AI system gives a poor answer, the cause is often the data it was given: out-of-date documents, conflicting definitions or missing context.",
      "Data governance does not need to be bureaucratic. Named owners for important datasets, agreed definitions for key measures and automated quality checks go a long way.",
      "These foundations also improve ordinary reporting, so the investment pays off even before AI is introduced.",
    ],
  },
  {
    slug: "healthcare-ai-evidence-first",
    title: "Healthcare AI should start with the evidence question",
    topic: "Healthcare AI innovation",
    excerpt: "Before choosing a method, agree what evidence would show that an AI approach genuinely helps.",
    status: "draft", author: null, publishedAt: null,
    body: [
      "Healthcare is full of promising AI ideas. The ones that progress start with a clear question, a realistic view of the data available and an agreed standard of evidence.",
      "Research governance, including ethics review and information governance, is part of good design rather than an obstacle to it. Planning for it early saves months later.",
      "Exploratory research is valuable, and it should be described honestly. A promising result in a research setting is not the same as a validated clinical tool.",
    ],
  },
  {
    slug: "llmops-evaluation-first",
    title: "LLMOps starts with evaluation",
    topic: "MLOps and LLMOps",
    excerpt: "If you cannot measure a language-model system, you cannot safely change it.",
    status: "draft", author: null, publishedAt: null,
    body: [
      "Language-model systems change constantly: new model versions, updated prompts, refreshed content. Each change can improve one behaviour and quietly worsen another.",
      "An evaluation set built from real questions, with expected answers and quality criteria, turns those changes into something you can test. It becomes the release gate for every update.",
      "Monitoring in production completes the loop, tracking quality, cost and latency so that drift is spotted before users notice.",
    ],
  },
  {
    slug: "inclusive-research-methods",
    title: "Designing research that includes neurodivergent participants",
    topic: "Research and emerging technologies",
    excerpt: "Inclusive methods produce better evidence and better technology for everyone.",
    status: "draft", author: null, publishedAt: null,
    body: [
      "Research that excludes neurodivergent people, often unintentionally, produces evidence and technology that work less well for a significant part of the population.",
      "Inclusive research starts with co-design: involving participants in shaping questions, materials and the way sessions are run. Flexible formats, clear communication and sensory considerations all matter.",
      "These practices tend to improve research for every participant, not only those they were designed for.",
    ],
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);
