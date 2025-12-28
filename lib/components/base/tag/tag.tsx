import { clsx } from "clsx";
import { JSX } from "react";

import { IBaseProps } from "@/lib/types";

import { tagContainerClass } from "./tag.styles";

export interface ITagProps extends IBaseProps {
  label?: string;
  renderLabel?: () => React.ReactNode;
  renderAs?: keyof JSX.IntrinsicElements;
}

export const Tag = ({
  label,
  renderLabel,
  renderAs = "span",
  className,
}: ITagProps) => {
  const TagElement = renderAs;
  const content = renderLabel ? renderLabel() : label;

  if (!content) {
    return null;
  }

  return (
    <TagElement
      data-testid="tag-element"
      className={clsx(tagContainerClass, className)}
    >
      {content}
    </TagElement>
  );
};
