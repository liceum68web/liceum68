import { IBaseProps } from "@/lib/types";

import clsx from "clsx";

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
} from "./global-navbar.styles";
import { Button } from "../base";
import { filterNavbarItemsFromChildren } from "./utils";
import Link from "next/link";

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
  label,
  onClick,
  className,
}: IGlobalNavbarButtonItemProps) => {
  return (
    <li className={clsx(className)} data-testid={globalNavbarButtonItemTestId}>
      <Button onClick={onClick}>{label}</Button>
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
