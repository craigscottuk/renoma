"use client";

import { useState, useEffect } from "react";

export function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollPosition = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollPosition / totalHeight) * 100;
      setProgress(scrollPercentage);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress(); // Initial call to set progress on mount

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[999] h-1 w-full bg-gray-200"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-black transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
