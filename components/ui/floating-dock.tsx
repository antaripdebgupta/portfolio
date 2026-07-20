"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";

interface FloatingDockItem {
  title: string;
  icon: ReactNode;
  href: string;
}

interface FloatingDockProps {
  items: FloatingDockItem[];
  desktopClassName?: string;
}

interface FloatingDockDesktopProps {
  items: FloatingDockItem[];
  className?: string;
}

interface IconContainerProps extends FloatingDockItem {
  mouseX: MotionValue<number>;
}

export const FloatingDock = ({ items, desktopClassName }: FloatingDockProps) => {
  return <FloatingDockDesktop items={items} className={desktopClassName} />;
};

const FloatingDockDesktop = ({ items, className }: FloatingDockDesktopProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn("mx-auto flex h-16 items-end gap-4 rounded-2xl px-4 pb-3 sm:h-12", className)}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href }: IconContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
    };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link target="_blank" href={href} aria-label={title}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="border-line bg-surface text-ink relative flex aspect-square items-center justify-center rounded-full border"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
                x: "-50%",
              }}
              animate={{
                opacity: 1,
                y: 0,
                x: "-50%",
              }}
              exit={{
                opacity: 0,
                y: 2,
                x: "-50%",
              }}
              className="text-ink absolute -top-8 left-1/2 w-fit px-2 py-0.5 font-mono text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={{
            width: widthIcon,
            height: heightIcon,
          }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
