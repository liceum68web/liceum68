import { IBaseProps, IconPaletteType } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Card, DynamicIcon, IDynamicIconProps } from "../../base";
import { iconContainerClassMap, iconFrameClassMap } from "./constants";
import {
  cardDescriptionClass,
  cardTitleClass,
  flashCardContainerClass,
  iconContainerClass,
  iconFrameClass,
} from "./flash-card.styles";

export interface IFlashCardProps extends IBaseProps {
  icon?: IDynamicIconProps["name"];
  iconFramePalette?: IconPaletteType;
  title: string;
  description?: string;
}

export const FlashCard = ({
  icon,
  iconFramePalette = IconPaletteType.GRAY,
  title,
  description,
  className,
}: IFlashCardProps) => {
  return (
    <Card>
      <div className={cn(flashCardContainerClass, className)}>
        <div
          data-testid="icon-container"
          className={cn(
            iconContainerClass,
            iconContainerClassMap[iconFramePalette],
          )}
        >
          <div
            data-testid="icon-frame"
            className={cn(iconFrameClass, iconFrameClassMap[iconFramePalette])}
          >
            <DynamicIcon name={icon} />
          </div>
        </div>
        <h3 data-testid="flash-card-title" className={cardTitleClass}>
          {title}
        </h3>
        <p
          data-testid="flash-card-description"
          className={cardDescriptionClass}
        >
          {description}
        </p>
      </div>
    </Card>
  );
};
