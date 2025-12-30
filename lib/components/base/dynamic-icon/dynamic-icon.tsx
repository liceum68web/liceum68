import * as icons from "lucide-react";
import { LucideProps } from "lucide-react";
import { ComponentType } from "react";

import { IBaseProps } from "@/lib/types";

export interface IDynamicIconProps extends IBaseProps, LucideProps {
  name?: keyof typeof icons;
}

export const DynamicIcon = ({ name = "Star", ...props }: IDynamicIconProps) => {
  const IconComponent = icons[name] as ComponentType<LucideProps>;

  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...props} />;
};
