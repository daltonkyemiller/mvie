import { AnimatePresence, motion, useSpring } from 'framer-motion';
import React, { ForwardedRef, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import useMeasure from 'react-use-measure';
import { useInView } from 'react-intersection-observer';
import _ from 'lodash';
import clsx from 'clsx';

type CarouselProps = {
  gap?: string;
  className?: string;
  itemClassName?: string;
  caption?: string;
};

const Carousel = ({ children, gap, className, caption, itemClassName = '' }: PropsWithChildren<CarouselProps>) => {
  const _childrenArr = React.Children.toArray(children);

  const x = useSpring(0, { stiffness: 500, damping: 50 });

  const [carouselRef, { width: carouselWidth }] = useMeasure();

  const [containerRef, { width: containerWidth }] = useMeasure();
  const [canDrag, setCanDrag] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const moveCarousel = useCallback(
    (offset: number) => {
      const _x = x.get();
      const newX: number = _.clamp(_x + offset, -carouselWidth + containerWidth, 0);
      x.set(newX);
    },
    [carouselWidth, containerWidth, x],
  );

  const breakDrag = useCallback(
    (resetPos: number) => {
      setCanDrag(false);
      setIsDragging(false);
      x.set(resetPos);
    },
    [x],
  );

  const dragUpdate = useCallback(
    (latest: { x: number }) => {
      const { x: currX } = latest;
      const padding = 200;
      const xMinLimit = -padding;

      const xMaxLimit = carouselWidth - containerWidth + padding;
      if (-currX <= xMinLimit) breakDrag(0);
      if (-currX >= xMaxLimit) breakDrag(-xMaxLimit + padding);
    },
    [breakDrag, carouselWidth, containerWidth],
  );

  const baseBtnStyles = useMemo(
    () => `absolute top-1/2 z-50 cursor-pointer bg-dark/50 bg-opacity-75 text-4xl text-white`,
    [],
  );

  return (
    <div className={`relative overflow-x-clip ${className}`} ref={containerRef}>
      {caption && <h1 className={`py-3 text-3xl font-bold`}>{caption}</h1>}
      <AiOutlineLeft
        className={`${baseBtnStyles} left-0 `}
        onClick={() => {
          moveCarousel(containerWidth);
        }}
      />
      <motion.div
        onUpdate={dragUpdate}
        key={containerWidth}
        ref={carouselRef}
        drag={canDrag ? 'x' : false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        className={`relative flex min-w-fit ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'}`}
        style={{ x, gap }}
        dragConstraints={{
          left: -carouselWidth + containerWidth,
          right: 0,
        }}
        onMouseUp={() => {
          if (!canDrag) setCanDrag(true);
        }}>
        <AnimatePresence>
          {_childrenArr.map((child, i) => (
            <CarouselItem
              idx={i}
              key={i}
              className={itemClassName}
              style={{
                pointerEvents: isDragging ? 'none' : 'unset',
              }}>
              {child}
            </CarouselItem>
          ))}
        </AnimatePresence>
      </motion.div>
      <AiOutlineRight
        className={`${baseBtnStyles} right-0`}
        onClick={() => {
          moveCarousel(-containerWidth);
        }}
      />
    </div>
  );
};

type CarouselItemProps = {
  idx: number;
  className?: string;
  style?: React.CSSProperties;
};
const CarouselItem = (
  { children, idx, style, className }: PropsWithChildren<CarouselItemProps>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { ref: inViewRef } = useInView({ initialInView: true });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 * idx + 0.25 } }}
      exit={{ opacity: 0 }}
      className={clsx(`inline-block select-none`, className)}
      style={{ ...style }}
      ref={inViewRef}>
      {children}
    </motion.div>
  );
};

export default Carousel;
