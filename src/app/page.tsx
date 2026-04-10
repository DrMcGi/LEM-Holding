import fs from "node:fs";
import path from "node:path";
import { ProjectsExperience } from "@/components/projects-experience";

type DivisionAccent = "teal" | "amber" | "stone";

type DivisionSeed = {
  name: string;
  status: string;
  description: string;
  href: string;
  cta: string;
  logoFile: string;
  eyebrow: string;
  accent: DivisionAccent;
  promise: string;
};

const divisions: DivisionSeed[] = [
  {
    name: "LEM Projects Profile Portal",
    status: "Live",
    description:
      "Critical operational and strategic project solutions that help businesses move faster and smarter.",
    href: "https://lem-projects-profile-portal.vercel.app",
    cta: "Visit LEM Projects Profile Portal",
    logoFile: "LEM-Projects_Logo.png",
    eyebrow: "Strategic Execution",
    accent: "amber",
    promise: "Operational and strategic support built to unlock business performance.",
  },
  {
    name: "LEM Supply Enterprise",
    status: "Live",
    description:
      "Efficient procurement and delivery of essential goods that keep operations running every day.",
    href: "https://lem-supply-enterprise.vercel.app",
    cta: "Visit LEM Supply Enterprise",
    logoFile: "LEM-Supply-Enterprise_Logo.png",
    eyebrow: "Supply Engine",
    accent: "stone",
    promise: "Essential goods and dependable supply support for daily operations.",
  },
  {
    name: "LEM Accommodation",
    status: "Live",
    description:
      "Reliable home-away-from-home rentals designed for comfort, convenience, and peace of mind.",
    href: "https://lem-accommodation.vercel.app",
    cta: "Visit LEM Accommodation",
    logoFile: "LEM-Accommodation_Logo.png",
    eyebrow: "Comfort Infrastructure",
    accent: "teal",
    promise: "Home-away-from-home rentals with reliable monthly convenience.",
  },
];

const divisionsWithAssets = divisions.map((division) => {
  const logoDiskPath = path.join(process.cwd(), "public", "logos", division.logoFile);
  const logoPath = fs.existsSync(logoDiskPath) ? `/logos/${division.logoFile}` : null;

  return {
    ...division,
    logoPath,
  };
});

const projectsLogoDiskPath = path.join(process.cwd(), "public", "logos", "LEM-Projects_Logo.png");
const projectsLogoPath = fs.existsSync(projectsLogoDiskPath) ? "/logos/LEM-Projects_Logo.png" : null;

export default function Home() {
  return <ProjectsExperience divisions={divisionsWithAssets} projectsLogoPath={projectsLogoPath} />;
}
