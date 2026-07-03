import raw from "@/data/cv.json";

export interface Profile {
  network: string;
  url: string;
}

export interface MeritCourse {
  course: string;
  ects: number;
  basis: string;
  year: number;
  note?: string;
}

export interface Course {
  code: string;
  name: string;
  ects: number;
}

export interface Semester {
  term: string;
  courses: Course[];
}

export interface Education {
  institution: string;
  area: string;
  degree: string;
  degree_da?: string;
  start: string;
  end: string;
  status?: string;
  merit?: MeritCourse[];
  semesters?: Semester[];
}

export interface Work {
  company: string;
  position: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  endNote?: string;
  highlights?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: number | null;
  note?: string;
}

export interface Language {
  language: string;
  fluency: string;
}

export interface Cv {
  basics: {
    name: string;
    label: string;
    location: string;
    email: string;
    profiles: Profile[];
  };
  summary: string;
  education: Education[];
  work: Work[];
  certifications: Certification[];
  courses: { name: string; provider: string }[];
  skills: Record<string, string[]>;
  languages: Language[];
}

export const cv = raw as unknown as Cv;

export const skillGroupLabels: Record<string, string> = {
  infrastructure: "Infrastructure",
  development: "Development",
  operations_and_process: "Operations & process",
  cloud: "Cloud",
  teaching: "Teaching",
};

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "2022-08" -> "Aug 2022"; plain years pass through unchanged. */
export function formatYearMonth(value: string): string {
  const [year, month] = value.split("-");
  if (!month) return year;
  return `${months[Number(month) - 1]} ${year}`;
}

export function formatPeriod(start: string, end: string): string {
  return `${formatYearMonth(start)} – ${formatYearMonth(end)}`;
}
