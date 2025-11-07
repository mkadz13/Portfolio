import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import NeonNetworkOrb from "@/components/NeonNetworkOrb";

const roles = ["Full Stack Developer", "Website Developer", "Database Administrator", "Problem Solver"];

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const typingSpeed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) setDisplayText(role.substring(0, displayText.length + 1));
        else setTimeout(() => setIsDeleting(true), 1000);
      } else {
        if (displayText.length > 0) setDisplayText(displayText.substring(0, displayText.length - 1));
        else {
          setIsDeleting(false);
          setCurrentRole((p) => (p + 1) % roles.length);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      data-testid="section-hero"
      style={{
        background:
          "radial-gradient(ellipse at top, hsl(220, 45%, 12%), hsl(220, 50%, 6%)), radial-gradient(ellipse at bottom, hsl(215, 50%, 8%), hsl(220, 45%, 4%))",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-primary/20 text-sm select-none"
            style={{ left: `${(i * 7) % 100}%` }}
            initial={{ y: -20 }}
            animate={{ y: "100vh" }}
            transition={{ duration: 15 + (i % 10), repeat: Infinity, ease: "linear", delay: (i % 10) * 1.5 }}
          >
            {i % 2 === 0 ? "0" : "1"}
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-primary rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>



      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight" data-testid="text-hero-title">
            Hi, I'm <span className="text-primary">Mohammed Kadri</span>
          </h1>

          <div className="h-10 mb-6">
            <p className="text-xl md:text-2xl font-semibold text-accent" data-testid="text-hero-role">
              {displayText}
              <span className="animate-pulse text-primary">|</span>
            </p>
          </div>

          <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-md" data-testid="text-hero-subtitle">
            I'm passionate about creating innovative digital solutions that make a difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => scrollToSection("#projects")}
              className="bg-primary text-primary-foreground border-2 border-transparent hover:border-primary hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              data-testid="button-view-work"
            >
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("#contact")}
              className="border-2 border-primary/40 text-primary hover:border-primary hover:bg-primary/5 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
              data-testid="button-contact"
            >
              Contact Me
            </Button>
          </div>
        </motion.div>

        <div className="hidden md:flex items-center justify-center">
          <NeonNetworkOrb maxSize={420} parallax={8} tilt={3} />
        </div>
      </div>
    </section>
  );
}
