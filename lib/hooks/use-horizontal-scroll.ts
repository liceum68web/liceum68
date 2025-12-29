import { RefObject, useCallback, useEffect, useState } from "react";

export const useHorizontalScroll = (
  scrollableAreaRef: RefObject<HTMLElement | null>,
) => {
  const [isRightEdge, setIsRightEdge] = useState(false);
  const [isLeftEdge, setIsLeftEdge] = useState(true);

  const scrollByOffset = useCallback(
    (offset: number) => {
      const scrollElement = scrollableAreaRef.current;
      if (!scrollElement) {
        return;
      }

      const newScrollPosition = scrollElement.scrollLeft + offset;

      scrollElement.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    },
    [scrollableAreaRef],
  );

  useEffect(() => {
    const scrollElement = scrollableAreaRef.current;
    if (!scrollElement) {
      return;
    }

    const updateScrollStates = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollElement;

      setIsLeftEdge(scrollLeft === 0);
      setIsRightEdge(scrollLeft + clientWidth >= scrollWidth - 1);
    };

    scrollElement.addEventListener("scroll", updateScrollStates);
    window.addEventListener("resize", updateScrollStates);

    updateScrollStates();

    return () => {
      scrollElement.removeEventListener("scroll", updateScrollStates);
      window.removeEventListener("resize", updateScrollStates);
    };
  }, [scrollableAreaRef]);

  return {
    isRightEdge,
    isLeftEdge,
    scrollByOffset,
  };
};
