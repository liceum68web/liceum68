import { Children, isValidElement, ReactNode } from "react";

export const filterChildrenByDisplayNames =
  (displayNames: string[]) => (children: ReactNode) =>
    Children.toArray(children).filter(
      (child) =>
        isValidElement(child) &&
        displayNames.includes(
          (child.type as unknown as { displayName: string }).displayName
        )
    );
