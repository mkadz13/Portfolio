import { motion } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";

const certifications = [
  {
    id: 1,
    title: "IBM Full Stack Developer",
    issuer: "IBM",
    date: "2025",
    link: "https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer?utm_source=IBM&utm_medium=institutions&utm_campaign=IBMBadge",
  },
  {
    id: 2,
    title: "Meta Frontend Developer",
    issuer: "Meta",
    date: "2025",
    link: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
  },
  {
    id: 3,
    title: "NVIDIA: AI for All",
    issuer: "Nvidia",
    date: "2025",
    link: "https://academy.nvidia.com/en/course/ai-for-all-from-basics-to-genai-practice/?cm=81220",
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-24 bg-muted/30" data-testid="section-certifications">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-center" data-testid="text-certifications-title">
            Certifications
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.a
                key={cert.id}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card p-8 rounded-xl border border-card-border shadow-lg shadow-primary/5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500"
                data-testid={`card-certification-${cert.id}`}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300 ml-auto flex-shrink-0" />
                  </div>

                  <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300 mb-3" data-testid={`text-cert-title-${cert.id}`}>
                    {cert.title}
                  </h3>

                  <p className="text-muted-foreground font-medium mb-2" data-testid={`text-cert-issuer-${cert.id}`}>
                    {cert.issuer}
                  </p>

                  <p className="text-sm text-muted-foreground" data-testid={`text-cert-date-${cert.id}`}>
                    {cert.date}
                  </p>
                </motion.div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
