import type { StaticImageData } from "next/image";
import {
  frontendprojects,
  fullstackprojects,
  uiuxprojects,
  userPersonaData,
  type CodeProject,
  type UiuxProject,
  type UserPersona,
} from "@/constant/projectdata";

/** A user group plus the quote that represents them, as shown in the overlay. */
export type TargetUser = {
  label: string;
  quote: string;
};

/** Everything both overlay variants need. The card grid reads from the same object. */
type ProjectBase = {
  id: string;
  title: string;
  /** Shown under the overlay title: "UI/UX", "Frontend Website", "Fullstack Website". */
  category: string;
  /** Card subtitle. */
  subtitle: string;
  imageSrc: StaticImageData;
  overview: string;
  problem: string;
  goal: string;
  role: string;
};

export type UiuxProjectDetail = ProjectBase & {
  variant: "uiux";
  targetUsers: TargetUser[];
  personas: UserPersona[];
  figmaUrl?: string;
  prototypeUrl?: string;
};

export type CodeProjectDetail = ProjectBase & {
  variant: "code";
  technologies: string[];
  sourceUrl?: string;
  demoUrl?: string;
};

export type ProjectDetail = UiuxProjectDetail | CodeProjectDetail;

/**
 * userPersonaData keys personas by the short project name, so
 * "Erusea: Multi-User Store Management Website" has to become "Erusea".
 */
function personasFor(projectName: string): UserPersona[] {
  const key = projectName.split(":")[0].trim();
  return userPersonaData.filter((persona) => persona.project === key);
}

/** Flattens the single-group and numbered target-user fields into one list. */
function targetUsersFor(project: UiuxProject): TargetUser[] {
  const pairs: [string | undefined, string | undefined][] = [
    [project.targetUserLabel, project.targetUserDesc],
    [project.targetUserLabel1, project.targetUserDesc1],
    [project.targetUserLabel2, project.targetUserDesc2],
  ];

  return pairs.flatMap(([label, quote]) =>
    label && quote ? [{ label, quote }] : [],
  );
}

/** Gallery arrays keep their first frame as the cover; `""` means there's no artwork yet. */
function coverOf(image: CodeProject["image"]): StaticImageData | null {
  if (Array.isArray(image)) {
    return image[0] ?? null;
  }

  return image === "" ? null : image;
}

// The fourth UI/UX entry (Honkai: Star Rail) lives in the frontend group instead,
// so it stays out of the design grid.
const uiuxDetails: UiuxProjectDetail[] = uiuxprojects
  .slice(0, 3)
  .map((project) => ({
    variant: "uiux",
    id: project.name,
    title: project.name,
    category: "UI/UX",
    subtitle: project.label,
    imageSrc: project.image,
    overview: project.projectOverview ?? project.label,
    problem: project.problemStatement,
    goal: project.goal,
    role: project.myRole,
    targetUsers: targetUsersFor(project),
    personas: personasFor(project.name),
    figmaUrl: project.figmaUrl,
    prototypeUrl: project.prototypeUrl,
  }));

function toCodeDetails(category: string) {
  return (project: CodeProject): CodeProjectDetail[] => {
    const imageSrc = coverOf(project.image);

    if (!imageSrc) {
      return [];
    }

    return [
      {
        variant: "code",
        id: project.name,
        title: project.name,
        category,
        subtitle: project.label,
        imageSrc,
        overview: project.projectOverview || project.label,
        problem: project.problem,
        goal: project.goal,
        role: project.role,
        technologies: project.technologies,
        sourceUrl: project.sourceUrl,
        demoUrl: project.demoUrl,
      },
    ];
  };
}

export const projectGroups: Record<string, ProjectDetail[]> = {
  "UI/UX": uiuxDetails,
  "Frontend Website": frontendprojects.flatMap(
    toCodeDetails("Frontend Website"),
  ),
  "Fullstack Website": fullstackprojects.flatMap(
    toCodeDetails("Fullstack Website"),
  ),
};

export const projectCategories = Object.keys(projectGroups);
