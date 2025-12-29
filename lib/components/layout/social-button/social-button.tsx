import { Facebook, Instagram, Youtube } from "lucide-react";

import { IBaseProps, SocialType } from "@/lib/types";
import { cn } from "@/lib/utils";

import { socialButtonClass } from "./social-button.styles";

const iconMap: Record<SocialType, React.ComponentType> = {
  [SocialType.FACEBOOK]: Facebook,
  [SocialType.INSTAGRAM]: Instagram,
  [SocialType.YOUTUBE]: Youtube,
};

export interface ISocialButtonProps extends IBaseProps {
  type?: SocialType;
  href?: string;
}

export const SocialButton = ({ type, href, className }: ISocialButtonProps) => {
  const SocialIcon = iconMap[type!];

  return (
    <a
      href={href}
      target="blank"
      rel="noopener noreferrer"
      className={cn(socialButtonClass, className)}
    >
      <SocialIcon />
    </a>
  );
};
