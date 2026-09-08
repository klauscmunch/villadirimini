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
        className="w-full object-contain"
      />
    );
  }

  return (
    <div className="relative w-full">
      {slides.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={`w-full object-contain transition-opacity duration-1000 ease-in-out ${
            index === current ? "relative opacity-100" : "absolute inset-0 opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
