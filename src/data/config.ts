import content from './content.json';

export const config = {
  siteTitle: content.mainData.name,
  author: content.mainData.name,
  description: content.metadata.description,
  keywords: content.metadata.keywords,
  contactEmail: content.contact.email.replace('mailto:', ''),
  social: {
    linkedin: content.contact.linkedin,
    github: content.contact.github,
    twitter: content.contact.x,
  },
};
