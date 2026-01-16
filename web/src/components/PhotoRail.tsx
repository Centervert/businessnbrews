"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Photo = {
  src: string;
  alt: string;
  label: string;
};

type PhotoRailProps = {
  photos: Photo[];
};

export default function PhotoRail({ photos }: PhotoRailProps) {
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const advance = () => {
      const scrollAmount = rail.clientWidth * 0.72;
      const maxScroll = rail.scrollWidth - rail.clientWidth - 2;
      const next = rail.scrollLeft + scrollAmount;
      rail.scrollTo({
        left: next >= maxScroll ? 0 : next,
        behavior: "smooth",
      });
    };

    const intervalId = window.setInterval(advance, 4200);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div
      ref={railRef}
      className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto"
    >
      {photos.map((photo) => (
        <div
          key={photo.src}
          className="relative w-[70vw] max-w-[420px] flex-shrink-0 snap-center overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={720}
            height={480}
            className="h-56 w-full object-cover md:h-64"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">
              Recent event
            </p>
            <p className="text-sm font-semibold">{photo.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
