import { Variants } from "framer-motion";

export const motionVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(3px)", x: 5 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    x: 0,
    transition: { duration: 0.5 },
  },
};
