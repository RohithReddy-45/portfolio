'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface XLogoIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface XLogoIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const pathVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: 'linear',
      opacity: { duration: 0.1 },
    },
  },
};

const continuousVariants: Variants = {
  normal: {
    strokeDasharray: '0 100',
    transition: {
      duration: 0.3,
    },
  },
  pulse: {
    strokeDasharray: ['0 100', '10 90', '0 100'],
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 2,
    },
  },
};

const XLogoIcon = forwardRef<XLogoIconHandle, XLogoIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const pathControls = useAnimation();
    const continuousControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: async () => {
          await pathControls.start('animate');
          continuousControls.start('pulse');
        },
        stopAnimation: () => {
          pathControls.start('normal');
          continuousControls.start('normal');
        },
      };
    });

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          await pathControls.start('animate');
          continuousControls.start('pulse');
        } else {
          onMouseEnter?.(e);
        }
      },
      [pathControls, continuousControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          pathControls.start('normal');
          continuousControls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [pathControls, continuousControls, onMouseLeave]
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
          viewBox="0 0 50 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            variants={pathVariants}
            initial="normal"
            animate={pathControls}
            d="M5.92 6l14.662 21.375L6.23 44h3.18l12.576-14.578 10 14.578H44L28.682 21.67 42.199 6h-3.17L27.275 19.617 17.934 6H5.92zm3.797 2h7.164l23.322 34H33.04L9.717 8z"
          />
          <motion.path
            variants={continuousVariants}
            initial="normal"
            animate={continuousControls}
            d="M5.92 6l14.662 21.375L6.23 44h3.18l12.576-14.578 10 14.578H44L28.682 21.67 42.199 6h-3.17L27.275 19.617 17.934 6H5.92zm3.797 2h7.164l23.322 34H33.04L9.717 8z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            opacity="0.6"
          />
        </svg>
      </div>
    );
  }
);

XLogoIcon.displayName = 'XLogoIcon';

export { XLogoIcon };