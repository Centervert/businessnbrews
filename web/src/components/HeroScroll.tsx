"use client";

import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 240;
const FRAME_PATH = "/hero-video/ezgif-frame-";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const frameSrc = (index: number) =>
  `${FRAME_PATH}${String(index).padStart(3, "0")}.jpg`;

export default function HeroScroll() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const easeInOut = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : canvas.getBoundingClientRect();
      const { width, height } = rect;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      const rect = section.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const sectionTop = scrollY + rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const end = sectionTop + sectionHeight - viewportHeight;
      const progress = clamp((scrollY - sectionTop) / (end - sectionTop), 0, 1);
      const eased = easeInOut(progress);
      const frameIndex = Math.floor(progress * (TOTAL_FRAMES - 1));
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete) return;

      const { width, height } = canvas.getBoundingClientRect();
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);

      const baseScale = Math.max(width / img.width, height / img.height);
      const zoom = 1 + progress * 0.18;
      const scale = baseScale * zoom * 1.08;
      const drawWidth = Math.ceil(img.width * scale);
      const drawHeight = Math.ceil(img.height * scale);
      const x = Math.floor((width - drawWidth) / 2);
      const y = Math.floor((height - drawHeight) / 2);
      context.drawImage(img, x, y, drawWidth, drawHeight);

      if (textRef.current) {
        const shade = Math.round(255 * eased);
        const scaleText = 0.98 + eased * 0.04;
        const opacity = 0.1 + eased * 0.9;
        textRef.current.style.color = `rgb(${shade}, ${shade}, ${shade})`;
        textRef.current.style.transform = `scale(${scaleText})`;
        textRef.current.style.opacity = `${opacity}`;
      }
    };

    imagesRef.current = Array.from({ length: TOTAL_FRAMES }, (_, idx) => {
      const image = new Image();
      image.src = frameSrc(idx + 1);
      image.onload = render;
      return image;
    });

    resizeCanvas();
    render();

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(render);
    };
    const onResize = () => {
      resizeCanvas();
      render();
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative mt-16 h-[260vh] md:mt-20">
      <div className="sticky top-16 h-[calc(100vh-4rem)] md:top-20 md:h-[calc(100vh-5rem)]">
        <div className="relative h-full w-full overflow-hidden">
          <canvas ref={canvasRef} className="block h-full w-full" />
          <div className="pointer-events-none absolute inset-0 bg-black/35" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center px-6 md:px-10">
            <h1
              ref={textRef}
              className="text-center text-3xl font-black uppercase tracking-[0.08em] leading-tight transition-transform duration-200 ease-out md:text-6xl"
            >
              South Carolina&apos;s best networking group.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
