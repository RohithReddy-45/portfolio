'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface MailIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MailIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const bodyVariants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  draw: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
    },
  },
};

const flapVariants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  draw: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.5,
      delay: 0.6,
    },
  },
  bounce: {
    y: [0, -1.5, 1, -0.5, 0],
    transition: {
      duration: 2.5,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

const MailIcon = forwardRef<MailIconHandle, MailIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 36, ...props }, ref) => {
    const bodyControls = useAnimation();
    const flapControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: async () => {
          bodyControls.set('normal');
          flapControls.set('normal');
          await new Promise((resolve) => setTimeout(resolve, 10));

          bodyControls.start('draw');
          await flapControls.start('draw');
          flapControls.start('bounce');
        },
        stopAnimation: () => {
          bodyControls.start('normal');
          flapControls.start('normal');
        },
      };
    });

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          bodyControls.start('draw');
          await flapControls.start('draw');
          flapControls.start('bounce');
        } else {
          onMouseEnter?.(e);
        }
      },
      [bodyControls, flapControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          bodyControls.start('normal');
          flapControls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [bodyControls, flapControls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="2 2 20 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M3 9.177a2 2 0 011.029-1.749l7-3.888a2 2 0 011.942 0l7 3.888A2 2 0 0121 9.177V17a2 2 0 01-2 2H5a2 2 0 01-2-2V9.177z"
            variants={bodyVariants}
            initial="normal"
            animate={bodyControls}
          />
          <motion.path
            d="M4 9l6.2 4.65a3 3 0 003.6 0L20 9"
            variants={flapVariants}
            initial="normal"
            animate={flapControls}
          />
        </svg>
      </div>
    );
  }
);

MailIcon.displayName = 'MailIcon';

export { MailIcon };