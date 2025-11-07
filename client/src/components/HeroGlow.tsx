import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, startTransition, type CSSProperties } from "react";

interface HeroGlowProps {
  backgroundColor?: string;
  glowColor?: string;
  glowSize?: number;
  glowIntensity?: number;
  glowBlur?: number;
  style?: CSSProperties;
}

export default function HeroGlow({
  backgroundColor = "#0a1628",
  glowColor = "#1e3a8a",
  glowSize = 400,
  glowIntensity = 0.6,
  glowBlur = 80,
  style,
}: HeroGlowProps) {
  const mouseX = useMotionValue(window.innerWidth / 2);
  const mouseY = useMotionValue(window.innerHeight / 2);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isHovering) startTransition(() => setIsHovering(true));
    };
    const onLeave = (e: MouseEvent) => {
      if (e.relatedTarget === null) startTransition(() => setIsHovering(false));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [isHovering, mouseX, mouseY]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor,
        overflow: "hidden",
        ...style,
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          width: glowSize,
          height: glowSize,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: `blur(${glowBlur}px)`,
          pointerEvents: "none",
          x,
          y,
          opacity: isHovering ? glowIntensity : 0,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform, opacity",
        }}
        transition={{ opacity: { duration: 0.3 } }}
      />
    </div>
  );
}
