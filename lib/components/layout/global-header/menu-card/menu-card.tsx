import * as icons from "lucide-react";
import Link from "next/link";

import { IBaseProps } from "@/lib/types";

import {
  menuCardClass,
  menuCardDescriptionClass,
  menuCardIconClass,
  menuCardLabelClass,
} from "./menu-card.styles";

export interface IMenuCardProps extends IBaseProps {
  label?: string;
  description?: string;
  icon?: string;
  href?: string;
}

export const MenuCard = ({
  label,
  description,
  icon,
  href = "",
}: IMenuCardProps) => {
  // TODO: mitigate type issue later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = icon ? (icons as any)[icon] : null;

  return (
    <Link href={href} className={menuCardClass}>
      {IconComponent && (
        <span className={menuCardIconClass}>
          <IconComponent size={24} />
        </span>
      )}
      {label && <span className={menuCardLabelClass}>{label}</span>}
      {description && (
        <span className={menuCardDescriptionClass}>{description}</span>
      )}
    </Link>
  );
};
