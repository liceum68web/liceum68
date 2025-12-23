import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

import { contactIconMap } from "@/lib/constants";
import { ContactInfoType, IBaseProps, NavigationLink } from "@/lib/types";

import {
  shortcutLinkClass,
  utilityBarClass,
  utilityBarContactClass,
  utilityBarContentClass,
} from "./utility-bar.styles";

const defaultRenderQuickContact = (contact?: [ContactInfoType, string]) => {
  const ContactIcon = contact?.[0] ? contactIconMap[contact[0]] : null;

  return (
    <span className={utilityBarContactClass}>
      {ContactIcon && <ContactIcon size={16} />}
      {contact?.[1]}
    </span>
  );
};

const defaultRenderShortcut = (link: NavigationLink) => {
  return (
    <Link key={link.href} href={link.href} className={shortcutLinkClass}>
      {link.label}
    </Link>
  );
};

export interface IUtilityBarProps<T = NavigationLink> extends IBaseProps {
  shortcuts?: T[];
  quickContact?: [ContactInfoType, string];
  renderShortcut?: (link: T) => ReactNode;
  renderQuickContact?: (contact?: [ContactInfoType, string]) => ReactNode;
}

export const UtilityBar = ({
  className,
  shortcuts,
  quickContact,
  renderQuickContact = defaultRenderQuickContact,
  renderShortcut = defaultRenderShortcut,
}: IUtilityBarProps) => {
  return (
    <nav className={clsx(utilityBarClass, className)}>
      <div className={utilityBarContentClass}>
        {renderQuickContact(quickContact)}
        <div>{shortcuts?.map(renderShortcut)}</div>
      </div>
    </nav>
  );
};
