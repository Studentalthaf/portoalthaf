'use client';

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type ElementTag = keyof JSX.IntrinsicElements;

type SectionRevealProps<E extends ElementTag = "div"> = {
  as?: E;
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  once?: boolean;
  amount?: number | "some" | "all";
} & Omit<React.ComponentPropsWithoutRef<E>, "children" | "className">;

const SectionReveal = React.forwardRef<HTMLElement, SectionRevealProps<any>>(
  (
    {
      children,
      className,
      delay = 0,
      duration = 0.6,
      yOffset = 24,
      xOffset = 0,
      once = true,
      amount = 0.2,
      as = "div",
      ...rest
    },
    ref
  ) => {
    const MotionTag = (motion as any)[as] as any;

    return (
      <MotionTag
        ref={ref as any}
        className={className}
        initial={{ opacity: 0, y: yOffset, x: xOffset, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
        viewport={{ once, amount }}
        transition={{ duration, delay, ease: "easeOut" }}
        {...rest}
      >
        {children}
      </MotionTag>
    );
  }
);

SectionReveal.displayName = "SectionReveal";

export default SectionReveal;


