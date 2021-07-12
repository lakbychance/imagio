import { useEffect, useState, useRef, RefObject } from 'react';

export default function useIntersectionObserver(ref: RefObject<HTMLElement>) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }
    );
  }, []);
  useEffect(() => {
    if (ref.current) {
      observerRef?.current?.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observerRef?.current?.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isIntersecting;
}