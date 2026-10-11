import content from './content.json';
import { InstagramIcon } from '@/components/ui/instagram';
import { GithubIcon } from '@/components/ui/github';
import { LinkedinIcon } from '@/components/ui/linkedin';
import { MailIcon } from '@/components/ui/email';
import { XLogoIcon } from '@/components/ui/x-twitter';

export const { mainData, projects, experience, skills, commitHistory } = content;

export const contact = [
  { name: 'github', link: content.contact.github, icon: GithubIcon },
  { name: 'linkedin', link: content.contact.linkedin, icon: LinkedinIcon },
  { name: 'email', link: content.contact.email, icon: MailIcon },
  { name: 'instagram', link: content.contact.instagram, icon: InstagramIcon },
  { name: 'x', link: content.contact.x, icon: XLogoIcon },
];
