"use client";

import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 240;
const FRAME_PATH = "/hero-video/ezgif-frame-";
const INITIAL_LOAD = 10; // frames to load immediately on mount
const LOOKAHEAD = 20; // frames to preload ahead of scroll
const LOOKBEHIND = 8; // frames to preload behind scroll

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const frameSrc = (index: number) =>
  `${FRAME_PATH}${String(index).padStart(3, "0")}.jpg`;

export default function HeroScroll() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );
  const loadedRef = useRef<Set<number>>(new Set());
  const loadingRef = useRef<Set<number>>(new Set());
  const renderRef = useRef<() => void>(() => {});

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
      const rect = parent
        ? parent.getBoundingClientRect()
        : canvas.getBoundingClientRect();
      const { width, height } = rect;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loadFrame = (frameIndex: number) => {
      if (
        frameIndex < 0 ||
        frameIndex >= TOTAL_FRAMES ||
        loadedRef.current.has(frameIndex) ||
        loadingRef.current.has(frameIndex)
      )
        return;

      loadingRef.current.add(frameIndex);
      const image = new Image();
      image.src = frameSrc(frameIndex + 1);
      image.onload = () => {
        imagesRef.current[frameIndex] = image;
        loadedRef.current.add(frameIndex);
        loadingRef.current.delete(frameIndex);
        renderRef.current();
      };
    };

    const loadRange = (center: number) => {
      // Load the current frame first (highest priority)
      loadFrame(center);
      // Then load ahead (scroll direction), then behind
      for (let i = 1; i <= LOOKAHEAD; i++) {
        loadFrame(center + i);
      }
      for (let i = 1; i <= LOOKBEHIND; i++) {
        loadFrame(center - i);
      }
    };

    const render = () => {
      const rect = section.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const sectionTop = scrollY + rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const end = sectionTop + sectionHeight - viewportHeight;
      const progress = clamp(
        (scrollY - sectionTop) / (end - sectionTop),
        0,
        1
      );
      const eased = easeInOut(progress);
      const frameIndex = Math.floor(progress * (TOTAL_FRAMES - 1));

      // Lazy load frames around current position
      loadRange(frameIndex);

      // Find best available frame (current, or nearest loaded)
      let img = imagesRef.current[frameIndex];
      if (!img || !img.complete) {
        // Fall back to nearest loaded frame
        for (let offset = 1; offset <= TOTAL_FRAMES; offset++) {
          const before = imagesRef.current[frameIndex - offset];
          if (before && before.complete) {
            img = before;
            break;
          }
          const after = imagesRef.current[frameIndex + offset];
          if (after && after.complete) {
            img = after;
            break;
          }
        }
      }
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

    renderRef.current = render;

    // Load only the first batch immediately
    for (let i = 0; i < INITIAL_LOAD; i++) {
      loadFrame(i);
    }

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
