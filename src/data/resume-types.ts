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
  techStack: string;
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
  skills: string;
  links: ResumeLinks;
}

export const emptyResume: ResumeData = {
  personal: { name: "", email: "", phone: "", location: "" },
  summary: "",
  education: [],
  experience: [],
  projects: [],
  skills: "",
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
      techStack: "React, TypeScript, Tailwind CSS",
    },
    {
      id: "proj-2",
      title: "Placement Readiness Platform",
      description:
        "JD analyzer with heuristic skill extraction, round mapping, interactive scoring, and export tools.",
      techStack: "React, TypeScript, Tailwind CSS",
    },
  ],
  skills: "JavaScript, TypeScript, React, Node.js, Python, SQL, Git, Docker, REST APIs, DSA",
  links: {
    github: "https://github.com/arjunsharma",
    linkedin: "https://linkedin.com/in/arjunsharma",
  },
};
