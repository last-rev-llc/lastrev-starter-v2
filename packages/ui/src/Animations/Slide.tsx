import React from 'react';
import { motion, useInView } from 'framer-motion';

import ErrorBoundary from '../ErrorBoundary';

const Slide = ({ children }: any) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Use useInView with the ref
  const isInView = useInView(ref, { once: false });

  // Define the animation properties
  const animation = {
    x: isInView ? 0 : '100%', // Animate when inView is true, otherwise off-screen to the right
    transition: { duration: 0.5, ease: 'easeInOut' } // You can adjust duration and easing
  };

  return (
    <ErrorBoundary>
      <motion.div
        initial={{ x: '200%' }} // Initial position (off-screen to the right)
        ref={ref} // Attach the ref here
        animate={animation} // Use the animation properties
      >
        {children}
      </motion.div>
    </ErrorBoundary>
  );
};

export default Slide;
