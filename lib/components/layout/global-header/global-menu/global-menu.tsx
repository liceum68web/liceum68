import { clsx } from "clsx";

import { IBaseProps } from "@/lib/types";

import {
  globalMenuItemDisplayName,
  globalMenuItemTestId,
  globalMenuTestId,
} from "./constants";
import {
  globalMenuClass,
  globalMenuDesktopClass,
  globalMenuItemClass,
} from "./global-menu.styles";
import { filterMenuItemsFromChildren } from "./utils";

export interface IGlobalMenuItemProps extends IBaseProps {}

const GlobalMenuItem = ({ children, className }: IGlobalMenuItemProps) => {
  return (
    <li
      className={clsx(globalMenuItemClass, className)}
      data-testid={globalMenuItemTestId}
    >
      {children}
    </li>
  );
};

GlobalMenuItem.displayName = globalMenuItemDisplayName;

export interface IGlobalMenuProps extends IBaseProps {
  ref?: React.Ref<HTMLUListElement>;
  onMouseLeave?: VoidFunction;
}

const GlobalMenu = ({
  ref,
  className,
  children,
  onMouseLeave,
}: IGlobalMenuProps) => {
  const globalMenuItems = filterMenuItemsFromChildren(children);

  return (
    <ul
      onMouseLeave={onMouseLeave}
      ref={ref}
      className={clsx(globalMenuClass, className)}
      data-testid={globalMenuTestId}
    >
      {globalMenuItems}
    </ul>
  );
};

GlobalMenu.Item = GlobalMenuItem;

export { GlobalMenu };
