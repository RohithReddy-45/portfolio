import { ArrowUpRight, Moon, Sun } from 'lucide-react';
import { contact, experience, mainData, projects, skills, commitHistory } from '@/data/data';
import { config } from '@/data/config';

const Main = () => (
  <main id="main" className="resume">
    <header className="resume-header">
      <div className="heading-row">
        <h1>{mainData.name}</h1>
        <div className="header-actions">
          <a className="resume-link" href={mainData.resumeUrl} target="_blank" rel="noopener noreferrer">Resume <ArrowUpRight size={13} aria-hidden="true" /></a>
          <button id="theme-toggle" type="button" aria-label="Switch to dark mode" aria-pressed="false" title="Switch to dark mode"><Moon className="moon-icon" size={17} aria-hidden="true" /><Sun className="sun-icon" size={17} aria-hidden="true" /></button>
        </div>
      </div>
      <p className="role">{mainData.role}</p>
      <p className="intro">{mainData.description}</p>
      <div className="contact-links" aria-label="Contact links">
        {contact.map((item) => <a key={item.name} href={item.link} target="_blank" rel="noopener noreferrer" aria-label={item.name}><item.icon size={18} aria-hidden="true" /></a>)}
        <a className="email" href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>
      </div>
    </header>

    <section aria-labelledby="experience-title">
      <h2 id="experience-title">Experience</h2>
      {experience.map((exp) => (
        <article key={`${exp.company}-${exp.role}`}>
          <div className="heading-row"><h3>{exp.role} · {exp.company}</h3><span className="date">{exp.timePeriod}</span></div>
          <p>{exp.description}</p>
        </article>
      ))}
    </section>

    <section aria-labelledby="projects-title">
      <h2 id="projects-title">Projects</h2>
      {projects.slice(0, 4).map((project) => (
        <article className="project" key={project.title}>
          <div className="heading-row">
            <h3>{project.title}</h3>
            <div className="project-links">
              {'liveUrl' in project && project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title}: ${project.liveUrl.includes('youtube.com') ? 'watch demo' : 'visit website'}`}>{project.liveUrl.includes('youtube.com') ? 'Demo' : 'Website'} <ArrowUpRight size={12} aria-hidden="true" /></a>}
              {'githubUrl' in project && project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title}: view code`}>Code <ArrowUpRight size={12} aria-hidden="true" /></a>}
            </div>
          </div>
          <p className="project-role">{project.role}{project.category === 'Logistics prototype' ? ' · Prototype' : ''}</p>
          <p>{project.description}</p>
          <ul className="tags" aria-label={`${project.title} technologies`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        </article>
      ))}
      <a className="more-projects" href={`${config.social.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">Show more on GitHub <ArrowUpRight size={12} aria-hidden="true" /></a>
    </section>

    <section className="skills" aria-labelledby="skills-title">
      <h2 id="skills-title">Skills</h2>
      <dl>{Object.entries(skills).map(([category, tools]) => <div key={category}><dt>{category.replace(' Technologies', '')}</dt><dd>{tools.join(', ')}</dd></div>)}</dl>
    </section>
    <section className="activity" aria-labelledby="activity-title">
      <div className="heading-row"><h2 id="activity-title">Personal GitHub</h2><a href={commitHistory.url} target="_blank" rel="noopener noreferrer">Commit history <ArrowUpRight size={12} aria-hidden="true" /></a></div>
      <p>{commitHistory.caption}</p>
      <a className="commit-graph" href={commitHistory.url} target="_blank" rel="noopener noreferrer">
        <picture>
          <source id="commit-history-dark" media="(prefers-color-scheme: dark)" srcSet={commitHistory.darkImageUrl} />
          <img alt={`${mainData.name}'s personal GitHub commit history`} src={commitHistory.lightImageUrl} width={800} height={400} loading="lazy" decoding="async" />
        </picture>
      </a>
    </section>
    <footer><a href={`mailto:${config.contactEmail}`}>Get in touch <ArrowUpRight size={12} aria-hidden="true" /></a><span>{mainData.name}</span></footer>
  </main>
);

export default Main;
