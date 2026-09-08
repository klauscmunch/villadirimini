import { useEffect, useState } from "react";

interface Slide {
  src: string;
  alt: string;
}

interface BannerSlideshowProps {
  slides: Slide[];
  interval?: number;
}

export function BannerSlideshow({ slides, interval = 5000 }: BannerSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  if (!mounted || slides.length === 0) {
    return (
      <img
        src={slides[0]?.src}
        alt={slides[0]?.alt}
        className="aspect-[2.5/1] w-full object-cover md:aspect-[3.5/1]"
      />
    );
  }

  return (
    <div className="relative aspect-[2.5/1] w-full md:aspect-[3.5/1]">
      {slides.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
