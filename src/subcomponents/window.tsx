import { forwardRef, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

// Define the types for your component props
interface AlbumSectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
  className?: string;
}

const Window = forwardRef<HTMLElement, AlbumSectionProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <motion.section
        ref={ref}
        className={`${className}`}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
            ease: "easeInOut",
            opacity: { duration: 1 },
        }}
        {...props}
      >
        {children}
      </motion.section>
    );
  }
);

export default Window;