import { InstagramIcon } from '@/components/ui/instagram';
import { GithubIcon } from '@/components/ui/github';
import { LinkedinIcon } from '@/components/ui/linkedin';
import { MailIcon } from '@/components/ui/email';
import { XLogoIcon } from '@/components/ui/x-twitter';

export const mainData = {
  name: 'Rohith reddy',
  description: "Full-stack developer with a strong emphasis on frontend engineering, dedicated to building robust and user-centric web applications",
};

export const contact = [
  {
    name: 'github',
    link: 'https://github.com/RohithReddy-45',
    icon: GithubIcon
  },
  {
    name: 'linkedin',
    link: 'https://www.linkedin.com/in/rohith-reddy45',
    icon: LinkedinIcon
  },
  {
    name: 'email',
    link: 'mailto:samreddyrohith@gmail.com',
    icon: MailIcon
  },
  {
    name: 'instagram',
    link: 'https://www.instagram.com/codingdev45/',
    icon: InstagramIcon
  },
  {
    name: 'x',
    link: 'https://x.com/Ro_dev45',
    icon: XLogoIcon
  }
];

export const projects = [
	{
		title: "Byte Tutorials",
		description: "A tech learning platform curating YouTube tutorials across 60+ technologies, with personalized watchlists.",
		liveUrl: "https://byte-tutorials.vercel.app/",
		tags: ["Next.js", "TypeScript", "TailwindCSS", "Drizzle ORM", "Turso", "Zod", "Sentry", "Umami", "Playwright"]
	},
	{
		title: "Vscode Themed Portfolio",
		description: "A Visual Studio Code-inspired mobile portfolio app showcasing projects and skills.",
		githubUrl: "https://github.com/RohithReddy-45/vscode-portfolio",
		liveUrl: "https://www.youtube.com/shorts/vnpea1uDrdM",
		tags: ["React Native", "Expo", "TypeScript", "Nativewind", "Reanimated", "React Query"]
	},
	{
		title: "Stepinstyle",
		description: "A full-featured e-commerce platform with optimized state management, responsive UI, and efficient data storage using MongoDB.",
		githubUrl: "https://github.com/RohithReddy-45/stepinstyle",
		liveUrl: "https://step-in-style.netlify.app/",
		tags: ["React", "Node.js", "Express.js", "Redux", "MongoDB", "Tailwind CSS"]
	},
];

export const experience = [
	{
		role: "Software Engineer",
		description: "Software engineer responsible for developing and maintaining core cross-platform features for an educational ERP platform, focusing on seamless user experiences and responsive UI components across web and mobile.",
		company: "CtrlCampus",
		timePeriod: "Feb 2025 - Present",
		technologies: ["React", "Redux" ,"Typescript", "Bootstrap", "CSS", "React Native"],
	},
];

export const skills = {
	"Languages": [
		"JavaScript",
		"TypeScript",
		"Python",
		"SQL"
	],
	"Frontend Technologies": [
		"React.js",
		"Next.js",
		"Astro",
		"Redux.js",
		"React Query",
		"Zustand",
		"CSS",
		"Tailwind CSS",
		"Bootstrap",
		"Framer motion",
	],
	"Backend Technologies": [
		"Node.js",
		"Express.js",
		"Postgres",
		"MongoDB",
		"Supabase",
		"Firebase"
	],
	"Mobile Technologies": [
		"React Native",
		"Expo",
		"Nativewind",
		"Reanimated"
	],
	"Others": [
		"Drizzle",
		"Prisma",
		"Shadcn",
		"Docker",
		"CI/CD",
		"Cypress",
		"Jest",
		"Vitest",
		"Playwright",
		"Git",
		"Github",
		"Figma"
	]
}