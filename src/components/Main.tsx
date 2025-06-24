import { useEffect, useRef } from 'react';
import { GithubIcon } from './ui/github';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { contact, experience, mainData, projects, skills } from '@/data/data';
import { LinkIcon } from './ui/link';

const Main = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const { name, description } = mainData;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      stars.current = Array.from({ length: 200 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1,
        opacity: Math.random() * 0.2 + 0.3,
        speed: Math.random() * 0.2 + 0.1,
        glow: Math.random() < 0.1, 
      }));
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      stars.current.forEach((star) => {
        if (star.glow) {
          ctx.shadowBlur = 20;
          ctx.shadowColor = 'white';
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(star.opacity + 0.5, 1)})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        const dx = star.x - mousePosition.current.x;
        const dy = star.y - mousePosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;

        if (distance < maxDistance) {
          const angle = Math.atan2(dy, dx);
          const push = (1 - distance / maxDistance) * 2;
          star.x += Math.cos(angle) * push;
          star.y += Math.sin(angle) * push;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})` 
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleResize = () => {
      setCanvasSize();
      initStars();
    };

    setCanvasSize();
    initStars();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'transparent' }}
      />
      
      <div className="relative z-10 max-w-2xl mx-auto px-6 mt-18 w-full space-y-5 mb-3 sm:p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium tracking-tight">
            Hey, I'm {name}
          </h1>
          <a
            href="https://drive.google.com/file/d/1BUMpzUDdvD5n0aHVvthBLc3RsoTIhOZz/view?usp=drive_link"
            className="px-4 py-2 text-sm font-medium text-slate-200 bg-slate-800/50 border border-slate-700 rounded-md hover:bg-slate-700/50 transition-colors"
          >
            Download Resume
          </a>
        </div>
        <p className="text-md text-slate-100/60">
          {description}
        </p>

        <div className="flex space-x-4">
          {contact.map((contact) => (
            <a
              key={contact.name}
              href={contact.link}
              target="_blank"
              className="text-slate-400 hover:text-slate-200 motion-preset-oscillate-sm motion-paused hover:motion-running"
            >
              <p className="sr-only">{contact.name}</p>
              <contact.icon size={24} className="transition-all" />
            </a>
          ))}
        </div>

        <Tabs defaultValue="projects">
          <TabsList className="mb-3 border-none bg-transparent p-0 -ml-[8px]">
            <TabsTrigger value="projects" className="!bg-transparent border-none !shadow-none text-slate-400 data-[state=active]:text-slate-200">
              Projects
            </TabsTrigger>
            <TabsTrigger value="experience" className="!bg-transparent !border-none !shadow-none text-slate-400 data-[state=active]:text-slate-200">
              Experience
            </TabsTrigger>
            <TabsTrigger value="tools" className="!bg-transparent !border-none !shadow-none text-slate-400 data-[state=active]:text-slate-200">
              Tools
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects">
            {projects.map((project) => (
                <section key={project.title} className="flex flex-col space-y-2 mb-7 motion-opacity-in-0 motion-translate-y-in-50 motion-blur-in-md">
                  <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">{project.title}</h2>
                  <div className="flex items-center gap-2">
                    {project.githubUrl &&
                      (<a
                        href={project.githubUrl}
                        target="_blank"
                        className="text-slate-400 hover:text-slate-200 motion-preset-oscillate-md motion-paused hover:motion-running"
                      >
                        <GithubIcon size={20} />
                      </a>
                      )}
                    {project.liveUrl &&
                      (<a
                        href={project.liveUrl}
                        target="_blank"
                        className="text-slate-400 hover:text-slate-200 motion-preset-oscillate-md motion-paused hover:motion-running"
                      >
                        <LinkIcon size={20} />
                      </a>
                      )}
                  </div>
                </div>
                  <p className="text-sm text-slate-300">{project.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <div key={tag} className="text-slate-400 text-xs">
                        {tag}
                      </div>
                    ))}
                  </div>
                </section>
            ))}
          </TabsContent>
          
          <TabsContent value="experience">
            {experience.map((exp) => (
              <section key={exp.role} className="flex flex-col space-y-2 mb-7 motion-opacity-in-0 motion-translate-y-in-50 motion-blur-in-md">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">{exp.role} at {exp.company}</h2>
                <span className="text-sm text-slate-400">{exp.timePeriod}</span>
              </div>
                <p className="text-sm text-slate-300">{exp.description}</p>
                <div className="flex gap-2 flex-wrap">
                {exp.technologies.map((tech) => (
                  <div key={tech} className="text-slate-400 text-xs">
                  {tech}
                  </div>
                ))}
                </div>
              </section>
            ))}
          </TabsContent>
            <TabsContent value="tools">
            {Object.entries(skills).map(([category, toolList]) => (
              <section key={category} className="flex flex-col space-y-2 mb-4  motion-opacity-in-0 motion-translate-y-in-50 motion-blur-in-md">
                <h2 className="text-lg font-medium capitalize">{category}</h2>
                <div className="flex flex-wrap gap-2">
                  {toolList.map((tool) => (
                    <span 
                      key={tool} 
                      className="px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-full text-slate-300 text-sm hover:bg-slate-700/50 transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </section>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Main;
