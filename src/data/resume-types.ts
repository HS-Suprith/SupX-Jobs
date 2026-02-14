export interface ResumePersonal {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface ResumeEducation {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export interface ResumeExperience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface ResumeProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface ResumeSkills {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface ResumeLinks {
  github: string;
  linkedin: string;
}

export interface ResumeData {
  personal: ResumePersonal;
  summary: string;
  education: ResumeEducation[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  skills: ResumeSkills;
  links: ResumeLinks;
}

export const emptyResume: ResumeData = {
  personal: { name: "", email: "", phone: "", location: "" },
  summary: "",
  education: [],
  experience: [],
  projects: [],
  skills: { technical: [], soft: [], tools: [] },
  links: { github: "", linkedin: "" },
};

export const sampleResume: ResumeData = {
  personal: {
    name: "Arjun Sharma",
    email: "arjun.sharma@email.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
  },
  summary:
    "Final-year Computer Science student with strong foundations in data structures, algorithms, and full-stack web development. Passionate about building clean, user-focused products.",
  education: [
    {
      id: "edu-1",
      institution: "PES University",
      degree: "B.Tech Computer Science",
      year: "2021 – 2025",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Infosys Springboard",
      role: "Software Engineering Intern",
      duration: "May 2024 – Jul 2024",
      description:
        "Built REST APIs using Node.js and Express. Collaborated with a team of 4 to deliver a dashboard for internal analytics.",
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Job Notification Tracker",
      description:
        "A React-based job tracker with intelligent match scoring, daily digests, and localStorage persistence.",
      techStack: ["React", "TypeScript", "Tailwind CSS"],
      liveUrl: "",
      githubUrl: "https://github.com/arjunsharma/job-tracker",
    },
    {
      id: "proj-2",
      title: "Placement Readiness Platform",
      description:
        "JD analyzer with heuristic skill extraction, round mapping, interactive scoring, and export tools.",
      techStack: ["React", "TypeScript", "Tailwind CSS"],
      liveUrl: "",
      githubUrl: "",
    },
  ],
  skills: {
    technical: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL"],
    soft: ["Problem Solving", "Communication"],
    tools: ["Git", "Docker", "REST APIs"],
  },
  links: {
    github: "https://github.com/arjunsharma",
    linkedin: "https://linkedin.com/in/arjunsharma",
  },
};

/** Helper: flatten all skills into a single array */
export function flattenSkills(skills: ResumeSkills | string): string[] {
  if (typeof skills === "string") {
    // backward compat with old comma-separated format
    return skills.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [...skills.technical, ...skills.soft, ...skills.tools];
}

/** Helper: migrate old string skills to new format */
export function migrateSkills(skills: unknown): ResumeSkills {
  if (typeof skills === "string") {
    const list = skills.split(",").map((s) => s.trim()).filter(Boolean);
    return { technical: list, soft: [], tools: [] };
  }
  if (skills && typeof skills === "object" && "technical" in skills) {
    return skills as ResumeSkills;
  }
  return { technical: [], soft: [], tools: [] };
}

/** Helper: migrate old project techStack string to array */
export function migrateProject(proj: any): ResumeProject {
  return {
    ...proj,
    techStack: Array.isArray(proj.techStack)
      ? proj.techStack
      : typeof proj.techStack === "string"
        ? proj.techStack.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [],
    liveUrl: proj.liveUrl || "",
    githubUrl: proj.githubUrl || "",
  };
}
