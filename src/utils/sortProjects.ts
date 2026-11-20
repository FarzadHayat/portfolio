import type { CollectionEntry } from "astro:content";

type Project = CollectionEntry<"projects">;

// Ongoing projects first (newest start first), then finished ones by end date (newest first)
export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const aOngoing = !a.data.endDate;
    const bOngoing = !b.data.endDate;
    if (aOngoing !== bOngoing) return aOngoing ? -1 : 1;
    if (aOngoing) return b.data.startDate.getTime() - a.data.startDate.getTime();
    return (
      b.data.endDate!.getTime() - a.data.endDate!.getTime() ||
      b.data.startDate.getTime() - a.data.startDate.getTime()
    );
  });
}
