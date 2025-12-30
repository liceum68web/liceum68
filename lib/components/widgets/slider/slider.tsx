import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { useHorizontalScroll } from "@/lib/hooks";
import { IBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";

import {
  hideEdgeClass,
  scrollButtonClass,
  sliderClass,
  sliderContentClass,
  sliderLeftEdgeClass,
  sliderRightEdgeClass,
} from "./slider.styles";

export interface ISliderProps extends IBaseProps {
  slideOffset?: number;
}

export const Slider = ({
  className,
  children,
  slideOffset = 300,
}: ISliderProps) => {
  const scrollableAreaRef = useRef<HTMLDivElement>(null);
  const { isRightEdge, isLeftEdge, scrollByOffset } =
    useHorizontalScroll(scrollableAreaRef);

  return (
    <div data-testid="slider-container" className={cn(sliderClass, className)}>
      <div
        data-testid="slider-left-edge"
        className={cn(sliderLeftEdgeClass, isLeftEdge && hideEdgeClass)}
      >
        {!isLeftEdge && (
          <button
            className={scrollButtonClass}
            onClick={() => scrollByOffset(-slideOffset)}
          >
            <ChevronLeft size={40} />
          </button>
        )}
      </div>
      <div
        data-testid="slider-right-edge"
        className={cn(sliderRightEdgeClass, isRightEdge && hideEdgeClass)}
      >
        {!isRightEdge && (
          <button
            className={scrollButtonClass}
            onClick={() => scrollByOffset(slideOffset)}
          >
            <ChevronRight size={40} />
          </button>
        )}
      </div>
      <div
        ref={scrollableAreaRef}
        data-testid="slider-content"
        className={sliderContentClass}
      >
        {children}
      </div>
    </div>
  );
};
