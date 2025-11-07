import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  SiJavascript, SiTypescript, SiPython, SiHtml5, SiCss3, SiCplusplus,
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiGit, SiDocker, SiPostgresql, SiGithub, SiC
} from "react-icons/si";
import { Code2 } from "lucide-react";

const languages = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Java", icon: Code2, color: "#007396" },
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss3, color: "#1572B6" },
  { name: "C", icon: SiC, color: "#00599C" },
];

const tools = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: "#FFFFFF" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
];

type Skill = { name: string; icon: any; color: string };

type PositionedNode = {
  idx: number;
  parentIdx: number | null;
  x: number; 
  y: number; 
  item: Skill | null;
};


type Offset = { dx?: number; dy?: number }; 
const nodeOffsets: Record<"left" | "right", Record<number, Offset>> = {
  left: {
    0: { dy: -8 }, // JS
    3: { dx: -8 },  // Java
    4: { dx: -8 },  // HTML
    5: { dx: -8 },  // CSS
    6: { dx: -8 },  // C++
  },
  right: {
    0: { dy: -8 }, // React
    2: { dx: -8 },  // Express
    5: { dx: -8 },  // Git
    6: { dx: -8 },  // Docker
  },
};

function layoutBinaryTree(items: Skill[], side: "left" | "right"): PositionedNode[] {
  const range = side === "left" ? [8, 48] : [52, 92];

  const levelsNeeded = Math.max(1, Math.ceil(Math.log2(items.length + 1)));
  const totalNodes = Math.pow(2, levelsNeeded) - 1;

  const filled: (Skill | null)[] = Array.from({ length: totalNodes }, (_, i) =>
    i < items.length ? items[i] : null,
  );

  const nodes: PositionedNode[] = filled.map((item, idx) => {
    const level = Math.floor(Math.log2(idx + 1));
    const firstIndexAtLevel = Math.pow(2, level) - 1;
    const indexInLevel = idx - firstIndexAtLevel;
    const slots = Math.pow(2, level);
    const t = (indexInLevel + 0.5) / slots;
    let x = range[0] + t * (range[1] - range[0]);
    let y = 26 + level * 14;
    const parentIdx = idx === 0 ? null : Math.floor((idx - 1) / 2);

    const maxLevel = levelsNeeded - 1;
    if (level === maxLevel) {
      x -= 1.6; 
    } else if (level > 0) {
      x -= 0.8; 
      y -= 0.8; 
    }

    return { idx, parentIdx, x, y, item };
  });

  return nodes;
}

function NodeIcon({ item }: { item: Skill }) {
  const Icon = item.icon;
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full blur-xl opacity-60" style={{ backgroundColor: `${item.color}22` }}></div>
      <Icon className="w-8 h-8 relative z-10" style={{ color: item.color }} />
    </div>
  );
}

export default function SkillsSection() {
  const leftNodes = layoutBinaryTree(languages, "left");
  const rightNodes = layoutBinaryTree(tools, "right");

  return (
    <section id="skills" className="py-24 pb-8 bg-muted/30" data-testid="section-skills">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-14 text-center" data-testid="text-skills-title">
            Skills & Tools
          </h2>

          <div className="relative mx-auto" style={{ height: 400 }}>
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              {leftNodes[0] && (
                <motion.line
                  x1="50%"
                  y1="10%"
                  x2={`${leftNodes[0].x}%`}
                  y2={`${leftNodes[0].y}%`}
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  strokeOpacity="0.5"
                  strokeLinecap="round" 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                />
              )}
              {rightNodes[0] && (
                <motion.line
                  x1="50%"
                  y1="10%"
                  x2={`${rightNodes[0].x}%`}
                  y2={`${rightNodes[0].y}%`}
                  stroke="hsl(var(--accent))"
                  strokeWidth="2"
                  strokeOpacity="0.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.05 }}
                  viewport={{ once: true }}
                />
              )}

              {leftNodes.map((n, i) => {
                if (n.parentIdx === null) return null;
                const parent = leftNodes[n.parentIdx];
                return (
                  <motion.line
                    key={`l-${i}`}
                    x1={`${parent.x}%`}
                    y1={`${parent.y}%`}
                    x2={`${n.x}%`}
                    y2={`${n.y}%`}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeOpacity="0.35"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 0.7, delay: i * 0.05 }}
                    viewport={{ once: true }}
                  />
                );
              })}

              {rightNodes.map((n, i) => {
                if (n.parentIdx === null) return null;
                const parent = rightNodes[n.parentIdx];
                return (
                  <motion.line
                    key={`r-${i}`}
                    x1={`${parent.x}%`}
                    y1={`${parent.y}%`}
                    x2={`${n.x}%`}
                    y2={`${n.y}%`}
                    stroke="hsl(var(--accent))"
                    strokeWidth="2"
                    strokeOpacity="0.35"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 0.7, delay: i * 0.05 }}
                    viewport={{ once: true }}
                  />
                );
              })}
            </svg>

            <div className="absolute left-1/2 -translate-x-1/2" style={{ top: "6%", zIndex: 1 }}>
              <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring", stiffness: 180, damping: 18 }} viewport={{ once: true }} className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-secondary/50 border border-secondary/40">
                  <div className="absolute w-14 h-14 rounded-full bg-primary/15 animate-ping"></div>
                  <SiGithub className="w-7 h-7 text-foreground relative z-10" />
                </div>
                <p className="text-xs font-semibold text-muted-foreground mt-2">GitHub</p>
              </motion.div>
            </div>

            {leftNodes.map((n, i) => {
              if (!n.item) return null;

              const off = nodeOffsets.left?.[n.idx] || {};
              const dx = off.dx ?? 0;
              const dy = off.dy ?? 0;

              return (
                <div
                  key={`ln-${i}`}
                  className="absolute"
                  style={{
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                  }}
                >
                  <div style={{ transform: `translate(${dx}px, ${dy}px)` }}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6, y: -8 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 20, delay: i * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="group flex items-center justify-center w-12 h-12 rounded-full bg-secondary/40 border border-secondary/40 hover:scale-105 transition-transform">
                            <NodeIcon item={n.item} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top">{n.item.name}</TooltipContent>
                      </Tooltip>
                    </motion.div>
                  </div>
                </div>
              );
            })}


            {rightNodes.map((n, i) => {
            
              if (!n.item) return null;
            
              const off = nodeOffsets.right?.[n.idx] || {};
              const dx = off.dx ?? 0;
              const dy = off.dy ?? 0;
            
              return (
                <div
                  key={`rn-${i}`}
                  className="absolute"
                  style={{
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                  }}
                >
                  <div style={{ transform: `translate(${dx}px, ${dy}px)` }}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6, y: -8 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 20, delay: i * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="group flex items-center justify-center w-12 h-12 rounded-full bg-secondary/40 border border-secondary/40 hover:scale-105 transition-transform">
                            <NodeIcon item={n.item} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top">{n.item.name}</TooltipContent>
                      </Tooltip>
                    </motion.div>
                  </div>
                </div>
              );
            })}
              

            <div className="absolute left-[18%] -translate-x-1/2" style={{ top: "18%" }}>
              <div className="px-4 py-1.5 rounded-full border bg-secondary/50 backdrop-blur-sm border-secondary/40 shadow-sm flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                <span className="text-sm md:text-base font-semibold tracking-wide">Languages</span>
              </div>
            </div>
            <div className="absolute left-[82%] -translate-x-1/2" style={{ top: "18%" }}>
              <div className="px-4 py-1.5 rounded-full border bg-secondary/50 backdrop-blur-sm border-secondary/40 shadow-sm flex items-center gap-2">
                <SiReact className="w-4 h-4" style={{ color: "#61DAFB" }} />
                <span className="text-sm md:text-base font-semibold tracking-wide">Tools</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
