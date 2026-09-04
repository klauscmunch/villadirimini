import { useEffect, useState } from "react";

interface Slide {
  src: string;
  alt: string;
}

interface HeroSlideshowProps {
  slides: Slide[];
  interval?: number;
}

export function HeroSlideshow({ slides, interval = 5000 }: HeroSlideshowProps) {
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
        className="h-[420px] w-full object-cover md:h-[520px]"
      />
    );
  }

  return (
    <div className="relative h-[420px] w-full md:h-[520px]">
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
