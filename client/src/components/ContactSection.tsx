import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Instagram } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "mkadz186@gmail.com",
    link: "mailto:mkadz186@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/mohammed-kadri",
    link: "https://www.linkedin.com/in/mohammed-kadri-4a020229b/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/mkadz13",
    link: "https://github.com/mkadz13",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@mohammed_kadri13",
    link: "https://www.instagram.com/mohammed_kadri13/",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-muted/30" data-testid="section-contact">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center" data-testid="text-contact-title">
            Get In Touch
          </h2>

          <p className="text-base text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.a
                  key={contact.label}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-6 bg-card rounded-xl border border-card-border group shadow-lg shadow-primary/5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500"
                  data-testid={`link-contact-${contact.label.toLowerCase()}`}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex items-center gap-4 w-full"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {contact.label}
                      </p>
                      <p className="font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300">
                        {contact.value}
                      </p>
                    </div>
                  </motion.div>
                </motion.a>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground text-sm">
              2025 - Mohammed Kadri
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
