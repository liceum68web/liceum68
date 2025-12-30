import { useRef } from "react";

import { useIntersectionObserver } from "@/lib/hooks";
import { IBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";

import {
  sectionContainerClass,
  sectionAnchorLabelClass,
  sectionDescriptionClass,
  sectionTitleClass,
  sectionDividerClass,
  sectionContentClass,
  sectionBodyClass,
  sectionHeaderClass,
  visibleSectionClass,
} from "./section.styles";

export interface ISectionProps extends IBaseProps {
  sectionAnchorLabel?: string;
  sectionTitle?: string;
  sectionDescription?: string;
}

export const Section = ({
  sectionAnchorLabel = "",
  sectionTitle = "",
  sectionDescription = "",
  className,
  children,
}: ISectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isIntersecting } = useIntersectionObserver(sectionRef, {
    threshold: 0.3,
    once: true,
  });

  return (
    <section
      ref={sectionRef}
      data-testid="section-container"
      className={cn(
        sectionContainerClass,
        isIntersecting && visibleSectionClass,
      )}
    >
      {sectionAnchorLabel && (
        <span
          data-testid="section-anchor-label"
          className={sectionAnchorLabelClass}
          id={sectionAnchorLabel}
        >
          {sectionAnchorLabel}
        </span>
      )}
      <div className={cn(sectionBodyClass, className)}>
        {(sectionTitle || sectionDescription) && (
          <header data-testid="section-header" className={sectionHeaderClass}>
            {sectionTitle && (
              <h2 data-testid="section-title" className={sectionTitleClass}>
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p
                data-testid="section-description"
                className={sectionDescriptionClass}
              >
                {sectionDescription}
              </p>
            )}
            <hr className={sectionDividerClass} />
          </header>
        )}
        <div data-testid="section-content" className={sectionContentClass}>
          {children}
        </div>
      </div>
    </section>
  );
};
