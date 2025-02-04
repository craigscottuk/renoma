import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export function FadeInSection({
  children,
  className,
  translateY = false,
}: {
  children: React.ReactNode;
  className?: string;
  translateY?: boolean;
}) {
  const { ref, controls } = useIntersectionObserver({
    animateOnView: true,
    threshold: 0.3,
    once: true,
  });

  const variants = translateY
    ? {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
      };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
