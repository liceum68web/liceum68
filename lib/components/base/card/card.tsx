import { IBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";

import { cardContainerClass } from "./card.styles";

export interface ICardProps extends IBaseProps {}

export const Card = ({ className, children }: ICardProps) => {
  return (
    <div
      data-testid="card-container"
      className={cn(cardContainerClass, className)}
    >
      {children}
    </div>
  );
};
