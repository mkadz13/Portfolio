import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground text-center"
        >
          About Me
        </motion.h2>

        <div className="mx-auto mt-5 mb-10 h-px w-24 bg-primary/40 rounded-full" />

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/90 text-[1.05rem] leading-7 md:text-[1.1rem] md:leading-8"
          >
            <div className="grid md:grid-cols-2 md:gap-10">
              <div>
                <p className="mb-5">
                  I'm a passionate Full Stack Engineer with expertise in building modern,
                  scalable web applications. With a strong foundation in both frontend and
                  backend technologies, I thrive on solving complex problems and creating
                  seamless user experiences.
                </p>

                <div
                  className="
                    mt-8 md:mt-10            
                    min-h-[210px]            
                    grid place-content-center
                    -translate-y-1 md:-translate-y-2 
                  "
                >
                  <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-sm mx-auto">
                    {[
                      "JavaScript",
                      "React",
                      "UI/UX",
                      "TypeScript",
                      "Kubernetes",
                      "Docker",
                    ].map((label) => (
                      <a
                        key={label}
                        href="#"
                        className="
                          group inline-flex items-center justify-center
                          rounded-xl px-5 py-3 text-sm md:text-base
                          border border-primary/40 bg-primary/10 text-primary shadow-sm
                          transition-all duration-300
                          hover:bg-primary/15 hover:border-primary
                          hover:shadow-lg hover:shadow-primary/20
                          focus:outline-none focus:ring-2 focus:ring-primary/30
                        "
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 md:mt-0 space-y-4 md:pl-6 lg:pl-10">
                <p>
                  My journey in software development has led me to master technologies
                  like React, Node.js, and various databases. I believe in writing clean,
                  maintainable code and following best practices to deliver high-quality
                  solutions that exceed expectations.
                </p>
                <p className="mb-0">
                  When I'm not coding, I enjoy exploring new technologies, and graphic design.
                  
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-primary/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
              <img
                src={`${import.meta.env.BASE_URL}Me.png`}
                alt="Mohammed Kadri"
                className="block w-full h-auto"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-8 w-full max-w-5xl"
        >
          <div className="rounded-xl border border-primary/20 shadow-xl overflow-hidden bg-black/20">
            <video
              src={`${import.meta.env.BASE_URL}Hello (2).mp4`}
              className="block w-full h-auto"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
