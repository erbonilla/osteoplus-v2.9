"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function MotionSection({ children, className, id }: MotionSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      animate={reduceMotion ? undefined : { y: 0 }}
      className={className}
      id={id}
      initial={reduceMotion ? false : { y: 16 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={reduceMotion ? undefined : { y: 0 }}
    >
      {children}
    </motion.section>
  );
}
