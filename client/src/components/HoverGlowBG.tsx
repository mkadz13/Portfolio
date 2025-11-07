import { useEffect, useRef } from "react";

type Blob = { x: number; y: number; r: number; a: number; vx: number; vy: number; dr: number; da: number; live: boolean };

export default function HoverGlowBG({
  color = "rgba(80,160,255,1)", 
  maxBlobs = 120,                
  spawnPerMove = 3,              
  dprMax = 1.6,                  
}: {
  color?: string;
  maxBlobs?: number;
  spawnPerMove?: number;
  dprMax?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let dpr = Math.min(window.devicePixelRatio || 1, dprMax);
    let w = 0, h = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, dprMax);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); 
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const sprite = document.createElement("canvas");
    const S = 128;
    sprite.width = S; sprite.height = S;
    const sctx = sprite.getContext("2d")!;
    const grad = sctx.createRadialGradient(S/2, S/2, 0, S/2, S/2, S/2);
    grad.addColorStop(0.0, color.replace(/,?\s*[\d.]+\)\s*$/, ",1)"));    
    grad.addColorStop(0.5, color.replace(/,?\s*[\d.]+\)\s*$/, ",0.25)"));
    grad.addColorStop(1.0, color.replace(/,?\s*[\d.]+\)\s*$/, ",0)"));
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, S, S);

    const blobs: Blob[] = Array.from({ length: maxBlobs }, () => ({ x:0,y:0,r:0,a:0,vx:0,vy:0,dr:0,da:0,live:false }));
    let head = 0;

    const spawn = (x: number, y: number, mx: number, my: number) => {
      for (let k = 0; k < spawnPerMove; k++) {
        const b = blobs[head];
        head = (head + 1) % maxBlobs;
        const jitterX = (Math.random() - 0.5) * 12;
        const jitterY = (Math.random() - 0.5) * 12;
        const vscale = 0.15;
        b.x = x + jitterX;
        b.y = y + jitterY;
        b.r = 16 + Math.random() * 20;
        b.a = 0.7 + Math.random() * 0.2;
        b.vx = (x - mx) * vscale + (Math.random() - 0.5) * 0.6; 
        b.vy = (y - my) * vscale + (Math.random() - 0.5) * 0.6;
        b.dr = 0.4 + Math.random() * 0.4; 
        b.da = 0.018 + Math.random() * 0.012; 
        b.live = true;
      }
    };

    const mouse = { x: w/2, y: h/2, px: w/2, py: h/2 };
    let lastSpawn = 0;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();
      if (now - lastSpawn > 16) { 
        spawn(x, y, mouse.px, mouse.py);
        lastSpawn = now;
        mouse.px = mouse.x; mouse.py = mouse.y;
        mouse.x = x; mouse.y = y;
      } else {
        mouse.x = x; mouse.y = y;
      }
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", () => { mouse.x = w/2; mouse.y = h/2; });

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < maxBlobs; i++) {
        const b = blobs[i];
        if (!b.live) continue;
        b.x += b.vx; b.y += b.vy;
        b.r += b.dr;
        b.a -= b.da;
        b.vx *= 0.98; b.vy *= 0.98;
        if (b.a <= 0 || b.r > 160) { b.live = false; continue; }

        ctx.globalAlpha = Math.max(0, Math.min(1, b.a));
        const d = b.r * 2;
        ctx.drawImage(sprite, b.x - b.r, b.y - b.r, d, d);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };
    loop();

    const vis = () => { if (document.hidden) cancelAnimationFrame(raf); else loop(); };
    document.addEventListener("visibilitychange", vis);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", vis);
      canvas.removeEventListener("mousemove", onMove);
      ro.disconnect();
    };
  }, [color, maxBlobs, spawnPerMove, dprMax]);

  return (
    <div className="absolute inset-0 pointer-events-auto">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
