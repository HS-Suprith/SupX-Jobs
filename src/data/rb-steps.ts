export interface RbStepConfig {
  step: number;
  path: string;
  title: string;
  headline: string;
  subtext: string;
  prompt: string;
}

export const rbSteps: RbStepConfig[] = [
  {
    step: 1,
    path: "/rb/01-problem",
    title: "Problem Statement",
    headline: "Define the Problem",
    subtext: "Articulate the core problem your AI Resume Builder solves. Who is the user? What pain are you removing?",
    prompt: `Create a professional problem statement page for an AI Resume Builder project.

Include:
- A clear problem definition section
- Target user persona
- Pain points list
- How this tool solves the problem
- Value proposition

Use clean, minimal design with proper typography hierarchy.`,
  },
  {
    step: 2,
    path: "/rb/02-market",
    title: "Market Research",
    headline: "Research the Market",
    subtext: "Analyze existing resume builders, identify gaps, and define your unique positioning.",
    prompt: `Create a market research page for an AI Resume Builder.

Include:
- Competitor analysis table (3-5 competitors)
- Feature gap analysis
- Unique selling points
- Target market size estimation
- Positioning statement

Use cards and tables for structured data display.`,
  },
  {
    step: 3,
    path: "/rb/03-architecture",
    title: "Architecture",
    headline: "System Architecture",
    subtext: "Design the high-level system architecture showing how components interact.",
    prompt: `Create a system architecture page for an AI Resume Builder.

Include:
- Architecture diagram description (components and data flow)
- Technology stack decisions with justifications
- Component breakdown
- Data flow explanation
- Integration points (AI API, storage, export)

Use structured cards and clear visual hierarchy.`,
  },
  {
    step: 4,
    path: "/rb/04-hld",
    title: "High-Level Design",
    headline: "High-Level Design",
    subtext: "Define modules, their responsibilities, and how they communicate.",
    prompt: `Create a high-level design page for an AI Resume Builder.

Include:
- Module breakdown (Auth, Editor, AI Engine, Export, Templates)
- Module responsibility matrix
- API contract outlines
- State management strategy
- Routing plan

Present as structured documentation with clear sections.`,
  },
  {
    step: 5,
    path: "/rb/05-lld",
    title: "Low-Level Design",
    headline: "Low-Level Design",
    subtext: "Detail component structures, data models, and implementation specifics.",
    prompt: `Create a low-level design page for an AI Resume Builder.

Include:
- Component tree with props
- Data models / TypeScript interfaces
- State management details
- Validation rules
- Edge cases and error handling plan

Use code blocks and structured documentation.`,
  },
  {
    step: 6,
    path: "/rb/06-build",
    title: "Build Phase",
    headline: "Build the Product",
    subtext: "Implement the core features following the designs defined in previous steps.",
    prompt: `Build the core AI Resume Builder application.

Features to implement:
- Resume form with sections (Personal, Education, Experience, Skills, Projects)
- Real-time preview panel
- Template selection (at least 2 templates)
- PDF export functionality
- Form validation
- Responsive design

Use React with TypeScript, Tailwind CSS, and shadcn/ui components.`,
  },
  {
    step: 7,
    path: "/rb/07-test",
    title: "Testing",
    headline: "Test Everything",
    subtext: "Verify all features work correctly and handle edge cases gracefully.",
    prompt: `Create a comprehensive test checklist page for the AI Resume Builder.

Include test cases for:
- Form validation (required fields, format checks)
- Resume preview updates in real-time
- Template switching works correctly
- PDF export generates valid output
- Responsive layout on mobile/tablet/desktop
- Error states handled gracefully
- Data persists after refresh

Display as interactive checklist with pass/fail toggles.`,
  },
  {
    step: 8,
    path: "/rb/08-ship",
    title: "Ship It",
    headline: "Ship Your Product",
    subtext: "Deploy, document, and prepare your project for submission.",
    prompt: `Create a deployment checklist and ship page for the AI Resume Builder.

Include:
- Deployment steps
- Environment configuration
- Final QA checklist
- Documentation links
- Submission preparation

Display as a step-by-step shipping guide.`,
  },
];
