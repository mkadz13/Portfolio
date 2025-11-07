import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Experience", href: "#experience" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[hsl(215,50%,15%)]/95 backdrop-blur-md shadow-lg shadow-primary/5" : "bg-[hsl(215,50%,15%)]"
      }`}
      data-testid="navigation-header"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("#home")}
          className="text-2xl font-bold text-white hover:text-primary transition-colors px-3 py-2 rounded-md"
          data-testid="link-logo"
        >
          Mohammed's Portfolio
        </button>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              onClick={() => scrollToSection(item.href)}
              className="text-white/80 hover:text-white text-base font-medium border-2 border-transparent hover:border-primary/40 hover:bg-white/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              data-testid={`link-nav-${item.name.toLowerCase()}`}
            >
              {item.name}
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          className="md:hidden text-white"
          data-testid="button-menu-toggle"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </div>
    </nav>
  );
}
