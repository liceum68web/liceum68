import Link from "next/link";

import { IBaseProps } from "@/lib/types";
import { cn } from "@/lib/utils";

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
  onMouseEnter?: VoidFunction;
  onMouseLeave?: VoidFunction;
}

const GlobalNavbarLinkItem = ({
  label,
  route,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
}: IGlobalNavbarLinkItemProps) => {
  return (
    <li
      className={cn(globalNavbarLinkItemClass, className)}
      data-testid={globalNavbarLinkItemTestId}
    >
      <Link
        href={route as string}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
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
      className={cn(globalNavbarLinkOutItemClass, className)}
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
  onMouseEnter?: VoidFunction;
  onMouseLeave?: VoidFunction;
}

const GlobalNavbarButtonItem = ({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
}: IGlobalNavbarButtonItemProps) => {
  return (
    <li className={className} data-testid={globalNavbarButtonItemTestId}>
      <Button
        className={globalNavbarButtonItemClass}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
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
      className={cn(globalNavbarClass, className)}
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
