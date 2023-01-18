import { motion } from 'framer-motion';
import React, { useState } from 'react';
import colors from 'tailwindcss/colors';

type ImageProps = {
  src: string;
  alt: string;
  delay?: number;
  onLoad?: () => void;
};

export default function Image({ src, alt, onLoad, delay, ...rest }: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`h-full w-full `}>
      {!isLoaded && <ImageSkeleton />}
      <motion.img
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        src={src}
        alt={alt}
        className={`h-full w-full object-cover object-center`}
        onLoad={() => {
          setTimeout(() => {
            setIsLoaded(true);
            if (onLoad) onLoad();
          }, delay ?? 1000);
        }}
        {...rest}
      />
    </div>
  );
}

const ImageSkeleton = () => {
  const shimmerVariants = {
    initial: {
      backgroundPosition: '-1000px 0',
    },
    shimmer: {
      backgroundPosition: ['-1000px 0', '1000px 0'],
      transition: { repeat: Infinity, duration: 2, ease: 'linear' },
    },
  };
  return (
    <motion.div
      variants={shimmerVariants}
      initial="initial"
      animate="shimmer"
      className={`h-full w-full`}
      style={{
        backgroundSize: '1000px 100%',
        backgroundImage: `linear-gradient(to right, ${colors.neutral[900]} 4%, ${colors.neutral[100]} 25%, ${colors.neutral[900]} 36%)`,
      }}
    />
  );
};
