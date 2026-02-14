import type { ResumeData } from "@/data/resume-types";

export function resumeToPlainText(resume: ResumeData): string {
  const lines: string[] = [];

  // Name & Contact
  if (resume.personal.name) lines.push(resume.personal.name);
  const contact = [resume.personal.email, resume.personal.phone, resume.personal.location]
    .filter(Boolean)
    .join(" | ");
  if (contact) lines.push(contact);

  // Links
  const links = [resume.links.github, resume.links.linkedin].filter(Boolean);
  if (links.length) lines.push(links.join(" | "));

  lines.push("");

  // Summary
  if (resume.summary) {
    lines.push("SUMMARY");
    lines.push(resume.summary);
    lines.push("");
  }

  // Education
  if (resume.education.length > 0) {
    lines.push("EDUCATION");
    for (const edu of resume.education) {
      const parts = [edu.institution, edu.degree, edu.year].filter(Boolean);
      lines.push(parts.join(" — "));
    }
    lines.push("");
  }

  // Experience
  if (resume.experience.length > 0) {
    lines.push("EXPERIENCE");
    for (const exp of resume.experience) {
      lines.push(`${exp.role}${exp.company ? ` at ${exp.company}` : ""}${exp.duration ? ` (${exp.duration})` : ""}`);
      if (exp.description) lines.push(exp.description);
      lines.push("");
    }
  }

  // Projects
  if (resume.projects.length > 0) {
    lines.push("PROJECTS");
    for (const proj of resume.projects) {
      lines.push(`${proj.title}${proj.techStack ? ` — ${proj.techStack}` : ""}`);
      if (proj.description) lines.push(proj.description);
      lines.push("");
    }
  }

  // Skills
  const skillList = resume.skills.split(",").map((s) => s.trim()).filter(Boolean);
  if (skillList.length > 0) {
    lines.push("SKILLS");
    lines.push(skillList.join(", "));
    lines.push("");
  }

  // Links section
  if (links.length > 0) {
    lines.push("LINKS");
    if (resume.links.github) lines.push(`GitHub: ${resume.links.github}`);
    if (resume.links.linkedin) lines.push(`LinkedIn: ${resume.links.linkedin}`);
  }

  return lines.join("\n").trim();
}
