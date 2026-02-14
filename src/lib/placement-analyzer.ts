/* ── Placement JD Analyzer ── */

export interface SkillCategory {
  name: string;
  skills: string[];
}

export type CompanySize = "startup" | "mid-size" | "enterprise";

export interface CompanyIntel {
  name: string;
  industry: string;
  size: CompanySize;
  sizeLabel: string;
  hiringFocus: string;
  roundFlow: RoundFlowStep[];
}

export interface RoundFlowStep {
  round: number;
  title: string;
  why: string;
}

export interface AnalysisResult {
  id: string;
  createdAt: string;
  updatedAt: string;
  company: string;
  role: string;
  jdText: string;
  extractedSkills: SkillCategory[];
  checklist: RoundChecklist[];
  plan: DayPlan[];
  questions: string[];
  readinessScore: number;
  skillConfidenceMap: Record<string, "know" | "practice">;
  companyIntel?: CompanyIntel;
}

export interface RoundChecklist {
  round: string;
  title: string;
  items: string[];
}

export interface DayPlan {
  day: string;
  focus: string;
  tasks: string[];
}

/* ── Skill dictionary ── */

const SKILL_MAP: Record<string, string[]> = {
  "Core CS": ["dsa", "data structures", "algorithms", "oop", "object oriented", "dbms", "database management", "os", "operating system", "networks", "networking", "computer networks"],
  "Languages": ["java", "python", "javascript", "typescript", "\\bc\\b", "c\\+\\+", "cpp", "c#", "csharp", "golang", "\\bgo\\b"],
  "Web": ["react", "next.js", "nextjs", "node.js", "nodejs", "express", "rest api", "restful", "graphql", "angular", "vue", "html", "css", "tailwind"],
  "Data": ["\\bsql\\b", "mongodb", "postgresql", "postgres", "mysql", "redis", "nosql", "database"],
  "Cloud/DevOps": ["aws", "azure", "gcp", "google cloud", "docker", "kubernetes", "k8s", "ci/cd", "cicd", "linux", "terraform", "jenkins"],
  "Testing": ["selenium", "cypress", "playwright", "junit", "pytest", "jest", "testing", "unit test", "test automation"],
};

/* ── 1. Skill Extraction ── */

export function extractSkills(jdText: string): SkillCategory[] {
  const text = jdText.toLowerCase();
  const categories: SkillCategory[] = [];

  for (const [category, keywords] of Object.entries(SKILL_MAP)) {
    const found = new Set<string>();
    for (const kw of keywords) {
      const regex = new RegExp(kw, "i");
      if (regex.test(text)) {
        // Clean up display name
        const display = kw
          .replace(/\\b/g, "")
          .replace(/\\+/g, "+")
          .replace(/\\/g, "")
          .toUpperCase()
          .replace("JAVASCRIPT", "JavaScript")
          .replace("TYPESCRIPT", "TypeScript")
          .replace("PYTHON", "Python")
          .replace("JAVA", "Java")
          .replace("REACT", "React")
          .replace("NEXT.JS", "Next.js")
          .replace("NEXTJS", "Next.js")
          .replace("NODE.JS", "Node.js")
          .replace("NODEJS", "Node.js")
          .replace("EXPRESS", "Express")
          .replace("GRAPHQL", "GraphQL")
          .replace("MONGODB", "MongoDB")
          .replace("POSTGRESQL", "PostgreSQL")
          .replace("MYSQL", "MySQL")
          .replace("REDIS", "Redis")
          .replace("DOCKER", "Docker")
          .replace("KUBERNETES", "Kubernetes")
          .replace("LINUX", "Linux")
          .replace("SELENIUM", "Selenium")
          .replace("CYPRESS", "Cypress")
          .replace("PLAYWRIGHT", "Playwright")
          .replace("ANGULAR", "Angular")
          .replace("TAILWIND", "Tailwind");
        found.add(display);
      }
    }
    if (found.size > 0) {
      categories.push({ name: category, skills: Array.from(found) });
    }
  }

  if (categories.length === 0) {
    categories.push({ name: "General", skills: ["Communication", "Problem solving", "Basic coding", "Projects"] });
  }

  return categories;
}

/* ── 2. Readiness Score ── */

export function calculateReadiness(
  skills: SkillCategory[],
  company: string,
  role: string,
  jdText: string,
): number {
  let score = 35;
  const categoryCount = skills.filter((s) => s.name !== "General").length;
  score += Math.min(categoryCount * 5, 30);
  if (company.trim().length > 0) score += 10;
  if (role.trim().length > 0) score += 10;
  if (jdText.length > 800) score += 10;
  return Math.min(score, 100);
}

/* ── 3. Round-wise Checklist ── */

export function generateChecklist(skills: SkillCategory[]): RoundChecklist[] {
  const allSkillNames = skills.flatMap((s) => s.skills).map((s) => s.toLowerCase());
  const has = (kw: string) => allSkillNames.some((s) => s.includes(kw));

  const r1: string[] = [
    "Practice quantitative aptitude (percentages, ratios, probability)",
    "Review logical reasoning patterns",
    "Brush up verbal reasoning and reading comprehension",
    "Practice time management with timed mock tests",
    "Review basic number systems and series",
  ];

  const r2: string[] = [
    "Revise arrays, strings, and hashing patterns",
    "Practice linked lists, stacks, and queues",
    "Study trees, graphs, and traversal algorithms",
    "Review sorting and searching algorithms",
    "Practice dynamic programming fundamentals",
  ];
  if (has("oop")) r2.push("Review OOP principles: inheritance, polymorphism, abstraction");
  if (has("dbms") || has("database") || has("sql")) r2.push("Practice SQL queries: joins, subqueries, normalization");
  if (has("os") || has("operating system")) r2.push("Review process scheduling, memory management, deadlocks");

  const r3: string[] = [
    "Prepare 2-3 project walkthroughs with architecture explanations",
    "Be ready to explain tech stack choices with tradeoffs",
  ];
  if (has("react") || has("next")) r3.push("Prepare to explain React lifecycle, hooks, and state management");
  if (has("node") || has("express")) r3.push("Review Node.js event loop, middleware patterns, REST design");
  if (has("python")) r3.push("Review Python data structures, generators, and decorators");
  if (has("java")) r3.push("Review Java collections, multithreading, and JVM internals");
  if (has("docker") || has("kubernetes")) r3.push("Explain containerization workflow and orchestration basics");
  if (has("aws") || has("azure") || has("gcp")) r3.push("Review cloud service categories: compute, storage, networking");
  if (has("sql") || has("mongo") || has("postgres") || has("mysql")) r3.push("Prepare to discuss database design decisions and indexing strategies");
  if (r3.length < 5) {
    r3.push("Practice explaining your strongest project end-to-end");
    r3.push("Review system design basics: load balancing, caching, queues");
    r3.push("Prepare answers for 'why this tech stack?' questions");
  }

  const r4: string[] = [
    "Prepare 'Tell me about yourself' (90-second structured pitch)",
    "Have 3 STAR-format behavioral stories ready",
    "Research the company's mission, products, and recent news",
    "Prepare thoughtful questions for the interviewer",
    "Practice salary negotiation talking points",
    "Review leadership and teamwork scenarios",
  ];

  return [
    { round: "1", title: "Aptitude & Basics", items: r1 },
    { round: "2", title: "DSA + Core CS", items: r2 },
    { round: "3", title: "Technical Interview", items: r3 },
    { round: "4", title: "Managerial / HR", items: r4 },
  ];
}

/* ── 4. 7-Day Plan ── */

export function generatePlan(skills: SkillCategory[]): DayPlan[] {
  const allSkillNames = skills.flatMap((s) => s.skills).map((s) => s.toLowerCase());
  const has = (kw: string) => allSkillNames.some((s) => s.includes(kw));

  const plan: DayPlan[] = [
    {
      day: "Day 1–2",
      focus: "Basics + Core CS",
      tasks: [
        "Revise OOP concepts with examples",
        "Review DBMS normalization and SQL queries",
        "Study OS: scheduling, memory, deadlocks",
        "Review networking: TCP/IP, HTTP, DNS basics",
      ],
    },
    {
      day: "Day 3–4",
      focus: "DSA + Coding Practice",
      tasks: [
        "Solve 10 array/string problems",
        "Practice 5 tree/graph traversal problems",
        "Implement 3 dynamic programming solutions",
        "Review time/space complexity analysis",
      ],
    },
    {
      day: "Day 5",
      focus: "Project + Resume Alignment",
      tasks: [
        "Prepare 2-minute walkthrough for each project",
        "Align resume bullets with JD keywords",
        "Quantify achievements where possible",
      ],
    },
    {
      day: "Day 6",
      focus: "Mock Interview Questions",
      tasks: [
        "Practice 5 technical questions aloud",
        "Do one full mock interview (45 min)",
        "Record and review your responses",
      ],
    },
    {
      day: "Day 7",
      focus: "Revision + Weak Areas",
      tasks: [
        "Revisit topics you struggled with",
        "Do a final timed coding assessment",
        "Review company-specific preparation notes",
      ],
    },
  ];

  // Adapt based on detected skills
  if (has("react") || has("next") || has("angular") || has("vue")) {
    plan[2].tasks.push("Review frontend concepts: virtual DOM, state management, component lifecycle");
  }
  if (has("node") || has("express")) {
    plan[2].tasks.push("Review backend patterns: middleware, authentication, error handling");
  }
  if (has("docker") || has("kubernetes") || has("aws")) {
    plan[3].tasks.push("Prepare to discuss deployment pipelines and cloud architecture");
  }
  if (has("sql") || has("mongo") || has("postgres")) {
    plan[0].tasks.push("Practice complex SQL queries and database design scenarios");
  }

  return plan;
}

/* ── 5. Interview Questions ── */

const QUESTION_BANK: Record<string, string[]> = {
  dsa: [
    "How would you optimize search in sorted data?",
    "Explain the difference between BFS and DFS with use cases.",
    "How would you detect a cycle in a linked list?",
  ],
  sql: [
    "Explain indexing and when it helps query performance.",
    "What is the difference between INNER JOIN and LEFT JOIN?",
    "How would you optimize a slow-running query?",
  ],
  react: [
    "Explain state management options in React.",
    "What are the rules of React hooks and why do they exist?",
    "How does React reconciliation work?",
  ],
  node: [
    "Explain the Node.js event loop and non-blocking I/O.",
    "How would you handle authentication in an Express API?",
  ],
  python: [
    "Explain Python's GIL and its impact on multithreading.",
    "What are decorators and when would you use them?",
  ],
  java: [
    "Explain the Java Collections framework hierarchy.",
    "What is the difference between HashMap and ConcurrentHashMap?",
  ],
  docker: [
    "What is the difference between a Docker image and a container?",
    "How would you optimize a Docker image for production?",
  ],
  aws: [
    "Explain the difference between EC2, Lambda, and ECS.",
    "How would you design a highly available architecture on AWS?",
  ],
  oop: [
    "Explain SOLID principles with examples.",
    "What is the difference between composition and inheritance?",
  ],
  mongodb: [
    "When would you choose MongoDB over a relational database?",
    "Explain MongoDB aggregation pipeline with an example.",
  ],
  testing: [
    "What is the testing pyramid and why does it matter?",
    "How would you decide what to unit test vs. integration test?",
  ],
};

const GENERIC_QUESTIONS = [
  "Walk me through a challenging project you built and the decisions you made.",
  "How do you approach debugging a production issue?",
  "Describe your experience working in a team environment.",
  "What is your approach to learning a new technology quickly?",
];

export function generateQuestions(skills: SkillCategory[]): string[] {
  const allSkillNames = skills.flatMap((s) => s.skills).map((s) => s.toLowerCase());
  const has = (kw: string) => allSkillNames.some((s) => s.includes(kw));

  const questions: string[] = [];

  for (const [key, qs] of Object.entries(QUESTION_BANK)) {
    if (has(key)) {
      // Pick 1-2 questions per matched category
      questions.push(...qs.slice(0, 2));
    }
  }

  // Fill with generic if needed
  let i = 0;
  while (questions.length < 10 && i < GENERIC_QUESTIONS.length) {
    questions.push(GENERIC_QUESTIONS[i]);
    i++;
  }

  return questions.slice(0, 10);
}

/* ── 6. Company Intel ── */

const ENTERPRISE_COMPANIES = [
  "google", "amazon", "microsoft", "meta", "apple", "netflix", "infosys", "tcs",
  "wipro", "hcl", "cognizant", "accenture", "ibm", "oracle", "samsung", "intel",
  "adobe", "salesforce", "deloitte", "capgemini", "mindtree", "ltimindtree",
  "tech mahindra", "mphasis", "hexaware", "persistent", "paypal", "uber", "flipkart",
  "swiggy", "zomato", "paytm", "razorpay", "walmart", "jpmorgan", "goldman sachs",
  "morgan stanley", "barclays", "deutsche bank", "citi", "hsbc",
];

const MIDSIZE_COMPANIES = [
  "zoho", "freshworks", "postman", "browserstack", "chargebee", "cleartax",
  "cred", "meesho", "groww", "slice", "jupiter", "zerodha", "upstox",
  "dunzo", "urban company", "lenskart", "nykaa", "boat", "cure.fit",
];

function inferIndustry(company: string, jdText: string): string {
  const text = (company + " " + jdText).toLowerCase();
  if (/fintech|banking|payment|trading|finance/.test(text)) return "Financial Services";
  if (/health|medical|pharma|biotech/.test(text)) return "Healthcare";
  if (/ecommerce|retail|shopping|marketplace/.test(text)) return "E-Commerce / Retail";
  if (/edtech|education|learning/.test(text)) return "EdTech";
  if (/logistics|supply chain|delivery/.test(text)) return "Logistics";
  if (/gaming|game/.test(text)) return "Gaming";
  if (/media|content|streaming/.test(text)) return "Media & Entertainment";
  return "Technology Services";
}

function inferSize(company: string): CompanySize {
  const c = company.toLowerCase().trim();
  if (ENTERPRISE_COMPANIES.some((e) => c.includes(e))) return "enterprise";
  if (MIDSIZE_COMPANIES.some((m) => c.includes(m))) return "mid-size";
  return "startup";
}

const SIZE_LABELS: Record<CompanySize, string> = {
  startup: "Startup (<200 employees)",
  "mid-size": "Mid-size (200–2,000 employees)",
  enterprise: "Enterprise (2,000+ employees)",
};

const HIRING_FOCUS: Record<CompanySize, string> = {
  enterprise:
    "Structured hiring with emphasis on DSA fundamentals, core CS concepts, and standardized coding assessments. Expect multiple rounds with clear evaluation criteria.",
  "mid-size":
    "Balanced approach combining algorithmic thinking with practical project experience. Often includes take-home assignments or live coding sessions.",
  startup:
    "Practical problem-solving and stack-specific depth. Focus on shipping ability, system thinking, and culture fit. Faster, less formal process.",
};

function generateRoundFlow(
  size: CompanySize,
  skills: SkillCategory[],
): RoundFlowStep[] {
  const allSkills = skills.flatMap((s) => s.skills).map((s) => s.toLowerCase());
  const has = (kw: string) => allSkills.some((s) => s.includes(kw));
  const hasWeb = has("react") || has("node") || has("next") || has("angular") || has("vue");
  const hasDSA = has("dsa") || has("data structures") || has("algorithms");

  if (size === "enterprise") {
    return [
      { round: 1, title: "Online Assessment (DSA + Aptitude)", why: "Screens large applicant pools efficiently with standardized coding and aptitude tests." },
      { round: 2, title: "Technical Round — DSA + Core CS", why: "Validates algorithmic thinking and foundational CS knowledge critical for enterprise-scale systems." },
      { round: 3, title: "Technical Round — Projects + Stack", why: "Assesses hands-on experience and ability to articulate architecture decisions." },
      { round: 4, title: "HR / Managerial Round", why: "Evaluates cultural fit, communication skills, and alignment with company values." },
    ];
  }

  if (size === "mid-size") {
    const rounds: RoundFlowStep[] = [
      { round: 1, title: hasDSA ? "Coding Test (DSA-focused)" : "Technical Screening", why: "Filters candidates on core problem-solving ability before investing interview time." },
      { round: 2, title: hasWeb ? "Full-Stack Technical Discussion" : "System Design + Code Review", why: "Evaluates depth in the actual tech stack used by the team." },
      { round: 3, title: "Project Deep-Dive + Culture Fit", why: "Checks real-world building experience and team compatibility." },
    ];
    return rounds;
  }

  // Startup
  return [
    { round: 1, title: hasWeb ? "Live Coding (Practical)" : "Take-Home Assignment", why: "Tests real-world coding ability and problem-solving approach over theoretical knowledge." },
    { round: 2, title: "System & Architecture Discussion", why: "Evaluates how you think about building products, not just solving puzzles." },
    { round: 3, title: "Founder / Culture Fit", why: "Early-stage teams need strong alignment on vision, work style, and ownership mentality." },
  ];
}

export function generateCompanyIntel(
  company: string,
  jdText: string,
  skills: SkillCategory[],
): CompanyIntel | undefined {
  if (!company.trim()) return undefined;

  const size = inferSize(company);

  return {
    name: company.trim(),
    industry: inferIndustry(company, jdText),
    size,
    sizeLabel: SIZE_LABELS[size],
    hiringFocus: HIRING_FOCUS[size],
    roundFlow: generateRoundFlow(size, skills),
  };
}

/* ── Full Analysis ── */

export function analyzeJD(company: string, role: string, jdText: string): AnalysisResult {
  const extractedSkills = extractSkills(jdText);
  const readinessScore = calculateReadiness(extractedSkills, company, role, jdText);
  const checklist = generateChecklist(extractedSkills);
  const plan = generatePlan(extractedSkills);
  const questions = generateQuestions(extractedSkills);
  const companyIntel = generateCompanyIntel(company, jdText, extractedSkills);

  // Build default confidence map — all "practice"
  const skillConfidenceMap: Record<string, "know" | "practice"> = {};
  for (const cat of extractedSkills) {
    for (const s of cat.skills) {
      skillConfidenceMap[s] = "practice";
    }
  }

  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    company: company.trim(),
    role: role.trim(),
    jdText,
    extractedSkills,
    checklist,
    plan,
    questions,
    readinessScore,
    skillConfidenceMap,
    companyIntel,
  };
}

/** Validate and sanitize a history entry loaded from storage. Returns null if unrecoverable. */
export function validateEntry(raw: unknown): AnalysisResult | null {
  try {
    if (!raw || typeof raw !== "object") return null;
    const e = raw as Record<string, unknown>;
    if (typeof e.id !== "string" || typeof e.jdText !== "string" || !Array.isArray(e.extractedSkills)) return null;

    // Ensure all required fields have defaults
    return {
      id: e.id as string,
      createdAt: (e.createdAt as string) || new Date().toISOString(),
      updatedAt: (e.updatedAt as string) || (e.createdAt as string) || new Date().toISOString(),
      company: (e.company as string) || "",
      role: (e.role as string) || "",
      jdText: e.jdText as string,
      extractedSkills: e.extractedSkills as SkillCategory[],
      checklist: (e.checklist as RoundChecklist[]) || [],
      plan: (e.plan as DayPlan[]) || [],
      questions: (e.questions as string[]) || [],
      readinessScore: typeof e.readinessScore === "number" ? e.readinessScore : 35,
      skillConfidenceMap: (e.skillConfidenceMap as Record<string, "know" | "practice">) || {},
      companyIntel: e.companyIntel as CompanyIntel | undefined,
    };
  } catch {
    return null;
  }
}
