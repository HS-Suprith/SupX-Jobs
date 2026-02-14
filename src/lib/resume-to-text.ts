import type { ResumeData } from "@/data/resume-types";
import { flattenSkills } from "@/data/resume-types";

export function resumeToPlainText(resume: ResumeData): string {
  const lines: string[] = [];

  if (resume.personal.name) lines.push(resume.personal.name);
  const contact = [resume.personal.email, resume.personal.phone, resume.personal.location]
    .filter(Boolean)
    .join(" | ");
  if (contact) lines.push(contact);

  const profileLinks = [resume.links.github, resume.links.linkedin].filter(Boolean);
  if (profileLinks.length) lines.push(profileLinks.join(" | "));

  lines.push("");

  if (resume.summary) {
    lines.push("SUMMARY");
    lines.push(resume.summary);
    lines.push("");
  }

  if (resume.education.length > 0) {
    lines.push("EDUCATION");
    for (const edu of resume.education) {
      const parts = [edu.institution, edu.degree, edu.year].filter(Boolean);
      lines.push(parts.join(" — "));
    }
    lines.push("");
  }

  if (resume.experience.length > 0) {
    lines.push("EXPERIENCE");
    for (const exp of resume.experience) {
      lines.push(`${exp.role}${exp.company ? ` at ${exp.company}` : ""}${exp.duration ? ` (${exp.duration})` : ""}`);
      if (exp.description) lines.push(exp.description);
      lines.push("");
    }
  }

  if (resume.projects.length > 0) {
    lines.push("PROJECTS");
    for (const proj of resume.projects) {
      const stack = proj.techStack.join(", ");
      lines.push(`${proj.title}${stack ? ` — ${stack}` : ""}`);
      if (proj.description) lines.push(proj.description);
      const projLinks = [
        proj.liveUrl ? `Live: ${proj.liveUrl}` : "",
        proj.githubUrl ? `GitHub: ${proj.githubUrl}` : "",
      ].filter(Boolean);
      if (projLinks.length) lines.push(projLinks.join(" | "));
      lines.push("");
    }
  }

  const allSkills = flattenSkills(resume.skills);
  if (allSkills.length > 0) {
    lines.push("SKILLS");
    lines.push(allSkills.join(", "));
    lines.push("");
  }

  if (profileLinks.length > 0) {
    lines.push("LINKS");
    if (resume.links.github) lines.push(`GitHub: ${resume.links.github}`);
    if (resume.links.linkedin) lines.push(`LinkedIn: ${resume.links.linkedin}`);
  }

  return lines.join("\n").trim();
}
