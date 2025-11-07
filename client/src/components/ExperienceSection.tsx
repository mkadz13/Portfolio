import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    id: 1,
    company: "Freelance Web Developer",
    role: "Frontend Developer",
    duration: "2024 - Present",
    description: "Built and deployed custom front-end interfaces for small businesses and personal brands, transforming client requirements into visually engaging, mobile-optimized websites.",
  },
  {
    id: 2,
    company: "Western University MSA",
    role: "Brothers Associate",
    duration: "2024 - 2025",
    description: "Collaborated with executive members to coordinate MSA Brothers’ events, manage schedules, and facilitate engaging activities that strengthened community involvement.",
  },
  {
    id: 3,
    company: "Z & X Parts and Services",
    role: "Inventory Associate",
    duration: "2021 - 2022",
    description: "Supported daily operations by receiving, labeling, and storing incoming parts while maintaining a clean and organized stock area.",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 bg-background" data-testid="section-experience">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-center" data-testid="text-experience-title">
            Experience
          </h2>

          <div className="space-y-6 relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden md:block"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-xl border border-card-border shadow-lg shadow-primary/5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500"
                data-testid={`card-experience-${exp.id}`}
              >
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex items-start gap-6"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 border border-primary/30">
                    <Briefcase className="w-7 h-7 text-primary" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
                      <h3 className="text-xl font-bold text-card-foreground" data-testid={`text-exp-role-${exp.id}`}>
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span data-testid={`text-exp-duration-${exp.id}`}>{exp.duration}</span>
                      </div>
                    </div>

                    <p className="text-lg font-semibold text-primary mb-4" data-testid={`text-exp-company-${exp.id}`}>
                      {exp.company}
                    </p>

                    <p className="text-card-foreground/80 leading-relaxed" data-testid={`text-exp-description-${exp.id}`}>
                      {exp.description}
                    </p>
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
