"use client";

import { useState, useEffect } from "react";

const BreakpointReadout = () => {
  const [breakpoint, setBreakpoint] = useState<string>("");
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    const determineBreakpoint = () => {
      if (typeof window === "undefined") return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      setDimensions({ width, height });

      if (width < 768) {
        setBreakpoint("sm");
      } else if (width < 1024) {
        setBreakpoint("md");
      } else if (width < 1280) {
        setBreakpoint("lg");
      } else {
        setBreakpoint("xl");
      }
    };

    determineBreakpoint();
    window.addEventListener("resize", determineBreakpoint);

    return () => window.removeEventListener("resize", determineBreakpoint);
  }, []);

  const getBackgroundColor = () => {
    switch (breakpoint) {
      case "sm":
        return "bg-red-500";
      case "md":
        return "bg-yellow-500";
      case "lg":
        return "bg-green-500";
      case "xl":
        return "bg-blue-500";
      default:
        return "bg-black/50";
    }
  };

  return (
    <div
      className={`fixed left-0 top-0 z-50 p-2 text-white ${getBackgroundColor()}`}
    >
      Breakpoint: {breakpoint} | {dimensions.width} x {dimensions.height}
    </div>
  );
};

export default BreakpointReadout;
