import React from 'react';
import { motion, useInView } from 'framer-motion';

import ErrorBoundary from '../ErrorBoundary';

const Fade = ({ children }: any) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Use useInView with the ref
  const isInView = useInView(ref, { once: false });

  // Define the animation properties
  const animation = {
    opacity: isInView ? 1 : 0, // Animate when inView is true, otherwise off-screen to the right
    transition: { duration: 2, ease: 'easeInOut' }, // You can adjust duration and easing
    height: '100%',
    width: '100%'
  };

  return (
    <ErrorBoundary>
      <motion.div
        initial={{ opacity: 0, height: '100%', width: '100%' }} // Initial position (off-screen to the right)
        ref={ref} // Attach the ref here
        animate={animation}
        // Use the animation properties
      >
        {children}
      </motion.div>
    </ErrorBoundary>
  );
};

export default Fade;
