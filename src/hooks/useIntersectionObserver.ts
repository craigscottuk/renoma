import { useEffect, useRef } from "react";
import { useAnimation, AnimationControls } from "framer-motion";

interface UseIntersectionObserverOptions {
  animateOnView?: boolean; // Enable/disable animation on view
  threshold?: number; // Intersection threshold
  rootMargin?: string; // Root margin for the observer
  once?: boolean; // Animate only once
}

interface UseIntersectionObserverResult {
  ref: React.RefObject<HTMLDivElement>;
  controls: AnimationControls;
}

export function useIntersectionObserver({
  animateOnView = true,
  threshold = 0.3,
  rootMargin = "0px",
  once = false,
}: UseIntersectionObserverOptions): UseIntersectionObserverResult {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animateOnView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          if (once) {
            observer.unobserve(entry.target);
          }
        } else {
          controls.start("hidden");
        }
      },
      { threshold, rootMargin },
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [animateOnView, controls, threshold, rootMargin, once]);

  return { ref, controls };
}
