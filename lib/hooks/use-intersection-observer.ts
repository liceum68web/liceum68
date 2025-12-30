import { RefObject, useEffect, useState } from "react";

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  once?: boolean;
}

/**
 * A custom hook to observe the intersection of a target element with the viewport.
 *
 * This hook utilizes the Intersection Observer API to monitor when a specified element
 * enters or leaves the viewport. It is useful for implementing lazy loading, infinite scrolling,
 * or triggering animations based on visibility.
 * @param {RefObject<Element>} ref - A React ref object pointing to the element to observe.
 * @param {UseIntersectionObserverOptions} options - Optional Intersection Observer configuration.
 * @param {boolean} options.once - If true, the element stays visible once it intersects (doesn't toggle back to false).
 * @returns {Object} An object containing the intersection status.
 * @returns {boolean} isIntersecting - A boolean indicating whether the target element is currently intersecting with the viewport.
 */

export const useIntersectionObserver = (
  ref: RefObject<HTMLElement | null>,
  options?: UseIntersectionObserverOptions,
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { once, ...observerOptions } = options || {};

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (once) {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      } else {
        setIsIntersecting(entry.isIntersecting);
      }
    }, observerOptions);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, once, observerOptions]);

  return {
    isIntersecting,
  };
};
