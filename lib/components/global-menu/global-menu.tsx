import { clsx } from "clsx";
import { IBaseProps } from "@/lib/types";
import {
  globalMenuClass,
  globalMenuDesktopClass,
  globalMenuItemClass,
} from "./global-menu.styles";
import { filterMenuItemsFromChildren } from "./utils";
import {
  globalMenuItemDisplayName,
  globalMenuItemTestId,
  globalMenuTestId,
} from "./constants";

export interface GlobalMenuItemProps extends IBaseProps {}

const GlobalMenuItem = ({ children, className }: GlobalMenuItemProps) => {
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
  isMobile?: boolean;
}

const GlobalMenu = ({
  ref,
  isMobile,
  className,
  children,
}: IGlobalMenuProps) => {
  const globalMenuItems = filterMenuItemsFromChildren(children);

  return (
    <ul
      ref={ref}
      className={clsx(
        globalMenuClass,
        { [globalMenuDesktopClass]: !isMobile },
        className
      )}
      data-testid={globalMenuTestId}
    >
      {globalMenuItems}
    </ul>
  );
};

GlobalMenu.Item = GlobalMenuItem;

export { GlobalMenu };
