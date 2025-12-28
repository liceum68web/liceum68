"use client";

import { RefObject, useEffect, useRef } from "react";

const defaultDelay = 500;

/**
 * A hook that triggers a callback when the user hovers out of specified elements (cold spots).
 * If within the delay time the user hovers back into any of the cold spots, the callback is not triggered.
 *
 * @param coldSpotRefs - An array of refs to the elements considered as cold spots.
 * @param onHoverOut - The callback function to be executed when hovering out.
 * @param eventTypes - The types of events to listen for (default is 'mouseleave' and 'mouseenter').
 * @param delay - Optional delay in milliseconds before triggering the callback. Default is 400ms.
 */

export const usePointerOut = (
  coldSpotRefs: RefObject<HTMLElement | null>[],
  onHoverOut: VoidFunction,
  eventTypes: string[] = ["mouseleave"],
  delay = defaultDelay,
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handlePointerEnter = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const handlePointerLeave = (event: Event) => {
      // Check if we're moving to another cold spot
      const relatedTarget = (event as MouseEvent).relatedTarget as Node | null;

      if (relatedTarget) {
        const isMovingToColdSpot = coldSpotRefs.some((ref) =>
          ref.current?.contains(relatedTarget),
        );

        if (isMovingToColdSpot) {
          return; // Don't trigger if moving between cold spots
        }
      }

      timeoutRef.current = setTimeout(() => {
        onHoverOut();
      }, delay);
    };

    // Attach event listeners to all cold spots
    coldSpotRefs.forEach((ref) => {
      const element = ref.current;
      if (element) {
        element.addEventListener("mouseenter", handlePointerEnter);
        eventTypes.forEach((eventType) => {
          element.addEventListener(eventType, handlePointerLeave);
        });
      }
    });

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      coldSpotRefs.forEach((ref) => {
        const element = ref.current;
        if (element) {
          element.removeEventListener("mouseenter", handlePointerEnter);
          eventTypes.forEach((eventType) => {
            element.removeEventListener(eventType, handlePointerLeave);
          });
        }
      });
    };
  }, [coldSpotRefs, onHoverOut, eventTypes, delay]);
};
