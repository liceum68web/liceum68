import { ArrayLayoutType, IBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";

import { cardArrayContainerClass } from "./card-array.styles";
import { cardArrayLayoutTypeMap } from "./constants";

export interface ICardArrayProps extends IBaseProps {
  layout?: ArrayLayoutType;
}

export const CardArray = ({ layout, children, className }: ICardArrayProps) => {
  const layoutType = cardArrayLayoutTypeMap[layout ?? ArrayLayoutType.GRID];
  return (
    <div
      data-testid="card-array-container"
      className={cn(cardArrayContainerClass, layoutType, className)}
    >
      {children}
    </div>
  );
};
