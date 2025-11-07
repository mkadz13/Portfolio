import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

type Props = {
  maxSize?: number;        // px cap for large screens
  parallax?: number;       // px translate range with mouse
  tilt?: number;           // deg tilt range with mouse
  hexLabels?: string[];    // labels to render inside the outer hexes (max 6)
};

export default function NeonNetworkOrb({
  maxSize = 420,
  parallax = 8,
  tilt = 3,
  hexLabels = ["JS", "TS", "PY", "GIT", "SQL", "CSS"],
}: Props) {
  // normalized mouse values in range [-1, 1]
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // soft spring so it feels glassy
  const sx = useSpring(mx, { damping: 20, stiffness: 120 });
  const sy = useSpring(my, { damping: 20, stiffness: 120 });

  // map mouse → subtle translate & tilt
  const tx = useTransform(sx, (v) => v * parallax);
  const ty = useTransform(sy, (v) => v * parallax);
  const rOuter = useTransform(sx, (v) => v * tilt);        // slight tilt
  const rInner = useTransform(sx, (v) => -v * (tilt * 0.8)); // counter tilt

  // listen globally so it works through layers
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / cx));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / cy));
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  // idle spins (groups rotate instead of animateMotion)
  const spinSlow = { rotate: 360 };
  const spinFast = { rotate: -360 };

  // helpers
  const ringStroke = "url(#wire)";

  // compute 6 hex centers on the middle ring
  const hexRingRadius = 50; // distance from center
  const hexCenters = Array.from({ length: 6 }).map((_, i) => {
    const a = (i * Math.PI) / 3; // 0..5
    return {
      a,
      x: 100 + hexRingRadius * Math.cos(a),
      y: 100 + hexRingRadius * Math.sin(a),
    };
  });

  return (
    <motion.div
      className="relative w-full aspect-square mx-auto"
      style={{ maxWidth: maxSize, x: tx, y: ty }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        fill="none"
        overflow="visible"
      >
        {/* --- defs --- */}
        <defs>
          <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(50,130,255,0.24)" />
            <stop offset="55%" stopColor="rgba(50,130,255,0.12)" />
            <stop offset="100%" stopColor="rgba(50,130,255,0)" />
          </radialGradient>
          <linearGradient id="wire" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5aa0ff" />
            <stop offset="100%" stopColor="#7cc6ff" />
          </linearGradient>

          {/* A small, safe blur region in user space to avoid artifacts */}
          <filter
            id="softGlow"
            x="-60"
            y="-60"
            width="320"
            height="320"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* background soft glow */}
        <circle cx="100" cy="100" r="96" fill="url(#orbGlow)" />

        {/* static concentric rings */}
        <g stroke={ringStroke} strokeOpacity="0.28">
          <circle cx="100" cy="100" r="70" />
          <circle cx="100" cy="100" r="50" />
          <circle cx="100" cy="100" r="30" />
        </g>

        {/* OUTER: hex lattice spokes (slow spin) */}
        <motion.g
          style={{ originX: "100px", originY: "100px", rotate: rOuter }}
          filter="url(#softGlow)"
        >
          <motion.g
            style={{ originX: "100px", originY: "100px" }}
            animate={spinSlow}
            transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
          >
            {hexCenters.map(({ x, y, a }, i) => {
              // six vertices for the small hex at each spoke end
              const rr = 8;
              const hexPoints = Array.from({ length: 6 })
                .map((__, k) => {
                  const ang = a + (k * Math.PI) / 3;
                  const px = x + rr * Math.cos(ang);
                  const py = y + rr * Math.sin(ang);
                  return `${px},${py}`;
                })
                .join(" ");

              return (
                <g key={i}>
                  <line
                    x1="100"
                    y1="100"
                    x2={x}
                    y2={y}
                    stroke={ringStroke}
                    strokeOpacity="0.45"
                  />
                  <polygon
                    points={hexPoints}
                    fill="none"
                    stroke={ringStroke}
                    strokeOpacity="0.6"
                  />
                  {/* Optional label in the hex center */}
                  {hexLabels[i] && (
                    <text
                      x={x}
                      y={y}
                      fill="#bfe0ff"
                      fontSize="6"
                      fontWeight={600}
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{ letterSpacing: "0.5px" }}
                    >
                      {hexLabels[i]}
                    </text>
                  )}
                </g>
              );
            })}
          </motion.g>
        </motion.g>

        {/* INNER: rotating tri-grid (counter spin) */}
        <motion.g
          style={{ originX: "100px", originY: "100px", rotate: rInner }}
          filter="url(#softGlow)"
        >
          <motion.g
            style={{ originX: "100px", originY: "100px" }}
            animate={spinFast}
            transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
          >
            {Array.from({ length: 3 }).map((_, i) => {
              const r = 28;
              const ang = (i * (2 * Math.PI)) / 3;
              const p = (offset: number) => {
                const a = ang + offset;
                return `${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}`;
              };
              return (
                <polygon
                  key={i}
                  points={`${p(0)} ${p((2 * Math.PI) / 3)} ${p(
                    (4 * Math.PI) / 3
                  )}`}
                  fill="none"
                  stroke={ringStroke}
                  strokeOpacity="0.6"
                />
              );
            })}
          </motion.g>
        </motion.g>

        {/* Orbiting nodes via rotating groups (no animateMotion → no top-left blip) */}
        <motion.g
          style={{ originX: "100px", originY: "100px" }}
          animate={spinSlow}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          filter="url(#softGlow)"
        >
          {/* three nodes on radius 48 */}
          {[0, 1, 2].map((i) => {
            const angle = (i * (2 * Math.PI)) / 3;
            const r = 48;
            const x = 100 + r * Math.cos(angle);
            const y = 100 + r * Math.sin(angle);
            return <circle key={i} cx={x} cy={y} r="3.5" fill="#7cc6ff" />;
          })}
        </motion.g>

        <motion.g
          style={{ originX: "100px", originY: "100px" }}
          animate={spinFast}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          filter="url(#softGlow)"
        >
          {/* two nodes on radius 32 */}
          {[0, 1].map((i) => {
            const angle = (i * (2 * Math.PI)) / 2;
            const r = 32;
            const x = 100 + r * Math.cos(angle);
            const y = 100 + r * Math.sin(angle);
            return <circle key={i} cx={x} cy={y} r="3" fill="#9ad6ff" />;
          })}
        </motion.g>

        {/* center core */}
        <g filter="url(#softGlow)">
          <circle cx="100" cy="100" r="8" fill="#87c8ff" />
          <circle cx="100" cy="100" r="14" stroke={ringStroke} strokeOpacity="0.7" />
        </g>
      </svg>
    </motion.div>
  );
}
