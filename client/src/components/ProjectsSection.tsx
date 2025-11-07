import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SiGithub } from "react-icons/si";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Inventory Manager",
    description: "The Inventory Manager App is a full-stack inventory management system built with React, Node.js, and MongoDB, featuring real-time dashboards, secure JWT authentication, and a modern UI for efficient product and stock tracking.",
    tools: ["React", "Node.js", "MongoDB", "Express.js", "JWT"],
    github: "https://github.com/mkadz13/Inventory-Manager",
  },
  {
    id: 2,
    title: "Software Portfolio",
    description: "Developed a responsive portfolio website using React, TypeScript, and Tailwind CSS, featuring animated UI components, project showcases, and user-friendly navigation.",
    tools: ["HTML", "TypeScript", "CSS", "JS", "React"],
    github: "https://github.com/mkadz13/Dungeons-and-Zombies",
  },
  {
    id: 3,
    title: "AI Triage System",
    description: "A modern, AI-powered medical triage system built with React frontend and Flask backend. This system helps healthcare providers assess patient symptoms and prioritize care using advanced AI technology.",
    tools: ["React", "Python", "CSS", "JS", "OpenAI API"],
    github: "https://github.com/mkadz13/AI-Triage-System",
  },
  // {
  //   id: 4,
  //   title: "Dungeons and Zombies",
  //   description: "Real-time weather application with location-based forecasts and interactive weather maps.",
  //   tools: ["React", "API", "Leaflet", "CSS"],
  //   github: "https://github.com",
  // },
  // {
  //   id: 5,
  //   title: "Data Analytics Dashboard",
  //   description: "Dynamic portfolio website generator with customizable themes and content management.",
  //   tools: ["React", "Express", "MongoDB", "S3"],
  //   github: "https://github.com",
  // },
  // {
  //   id: 6,
  //   title: "Chat Application",
  //   description: "Real-time messaging platform with group chats, file sharing, and end-to-end encryption.",
  //   tools: ["React", "Socket.io", "Node.js", "Redis"],
  //   github: "https://github.com",
  // },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-background" data-testid="section-projects">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-center" data-testid="text-projects-title">
            Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-xl overflow-hidden border border-card-border bg-card shadow-lg shadow-primary/5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500"
                data-testid={`card-project-${project.id}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>

                <motion.div 
                  className="relative p-6 h-full flex flex-col"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <ExternalLink className="w-6 h-6 text-primary" />
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      data-testid={`link-github-${project.id}`}
                    >
                      <SiGithub className="w-6 h-6 text-foreground hover:text-primary transition-colors" />
                    </a>
                  </div>

                  <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300" data-testid={`text-project-title-${project.id}`}>
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 flex-grow leading-relaxed" data-testid={`text-project-description-${project.id}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tools.map((tool) => (
                      <Badge
                        key={tool}
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors duration-300"
                        data-testid={`badge-tool-${tool.toLowerCase()}`}
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
