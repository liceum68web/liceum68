import clsx from "clsx";
import Link from "next/link";

import { IBaseProps } from "@/lib/types";

import { Button } from "../../../base";
import {
  globalNavbarButtonItemDisplayName,
  globalNavbarButtonItemTestId,
  globalNavbarLinkItemDisplayName,
  globalNavbarLinkItemTestId,
  globalNavbarLinkOutItemDisplayName,
  globalNavbarLinkOutItemTestId,
  globalNavbarTestId,
} from "./constants";
import {
  globalNavbarLinkItemClass,
  globalNavbarLinkOutItemClass,
  globalNavbarClass,
  globalNavbarButtonItemClass,
} from "./global-navbar.styles";
import { filterNavbarItemsFromChildren } from "./utils";

export interface IGlobalNavbarLinkItemProps extends IBaseProps {
  label?: string;
  route?: string;
  onClick?: VoidFunction;
}

const GlobalNavbarLinkItem = ({
  label,
  route,
  onClick,
  className,
}: IGlobalNavbarLinkItemProps) => {
  return (
    <li
      className={clsx(globalNavbarLinkItemClass, className)}
      data-testid={globalNavbarLinkItemTestId}
    >
      <Link href={route as string} onClick={onClick}>
        {label}
      </Link>
    </li>
  );
};

GlobalNavbarLinkItem.displayName = globalNavbarLinkItemDisplayName;

export interface IGlobalNavbarLinkOutItemProps extends IBaseProps {
  label?: string;
  externalUrl?: string;
  onClick?: VoidFunction;
}

const GlobalNavbarLinkOutItem = ({
  label,
  externalUrl,
  className,
  onClick,
}: IGlobalNavbarLinkOutItemProps) => {
  return (
    <li
      className={clsx(globalNavbarLinkOutItemClass, className)}
      data-testid={globalNavbarLinkOutItemTestId}
    >
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {label}
      </a>
    </li>
  );
};

GlobalNavbarLinkOutItem.displayName = globalNavbarLinkOutItemDisplayName;

export interface IGlobalNavbarButtonItemProps extends IBaseProps {
  label?: string;
  onClick?: VoidFunction;
}

const GlobalNavbarButtonItem = ({
  children,
  onClick,
  className,
}: IGlobalNavbarButtonItemProps) => {
  return (
    <li className={className} data-testid={globalNavbarButtonItemTestId}>
      <Button className={globalNavbarButtonItemClass} onClick={onClick}>
        {children}
      </Button>
    </li>
  );
};

GlobalNavbarButtonItem.displayName = globalNavbarButtonItemDisplayName;

export interface IGlobalNavbarProps extends IBaseProps {
  ref?: React.Ref<HTMLUListElement>;
}

const GlobalNavbar = ({ ref, className, children }: IGlobalNavbarProps) => {
  const navbarItems = filterNavbarItemsFromChildren(children);

  return (
    <ul
      ref={ref}
      className={clsx(globalNavbarClass, className)}
      data-testid={globalNavbarTestId}
    >
      {navbarItems}
    </ul>
  );
};

GlobalNavbar.LinkItem = GlobalNavbarLinkItem;
GlobalNavbar.LinkOutItem = GlobalNavbarLinkOutItem;
GlobalNavbar.ButtonItem = GlobalNavbarButtonItem;

export { GlobalNavbar };
