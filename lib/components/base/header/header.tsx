import { IBaseProps } from "@/lib/types";
import { cn, filterChildrenByDisplayNames } from "@/lib/utils";

import {
  rightToolbarDisplayName,
  leftToolbarDisplayName,
  centerToolbarDisplayName,
  navMenuDisplayName,
  navMenuContainerAriaLabel,
  applicationHeaderTestId,
  mainPanelTestId,
  navMenuDrawerTestId,
  navMenuContainerTestId,
  centerToolbarTestId,
  leftToolbarTestId,
  rightToolbarTestId,
} from "./constants";
import * as styles from "./header.styles";

export interface IHeaderProps extends IBaseProps {
  isNavMenuOpen?: boolean;
}

const filterToolbarsFromChildren = filterChildrenByDisplayNames([
  rightToolbarDisplayName,
  leftToolbarDisplayName,
  centerToolbarDisplayName,
]);
const filterNavMenuFromChildren = filterChildrenByDisplayNames([
  navMenuDisplayName,
]);

/**
 * Props for the RightToolbar subcomponent.
 * @see {@link IBaseProps}
 */
export interface IHeaderRightToolbarProps extends IBaseProps {}

/**
 * RightToolbar subcomponent for the header.
 *
 * Renders the right-aligned toolbar section within the header, typically for user controls or actions.
 *
 * @param {IHeaderRightToolbarProps} props - Props for the right toolbar.
 * @returns {JSX.Element} The rendered right toolbar element.
 *
 * @see {@link ./constants.ts} for toolbar configuration.
 */
const RightToolbar = ({ className, children }: IHeaderRightToolbarProps) => {
  return (
    <div
      data-testid={rightToolbarTestId}
      className={cn(styles.headerRightToolbarClass, className)}
    >
      {children}
    </div>
  );
};

/**
 * Props for the LeftToolbar subcomponent.
 * @see {@link IBaseProps}
 */
export interface IHeaderLeftToolbarProps extends IBaseProps {}

/**
 * LeftToolbar subcomponent for the header.
 *
 * Renders the left-aligned toolbar section within the header, typically for navigation or branding.
 *
 * @param {IHeaderLeftToolbarProps} props - Props for the left toolbar.
 * @returns {JSX.Element} The rendered left toolbar element.
 *
 * @see {@link ./constants.ts} for toolbar configuration.
 */
const LeftToolbar = ({ className, children }: IHeaderLeftToolbarProps) => {
  return (
    <div
      data-testid={leftToolbarTestId}
      className={cn(styles.headerLeftToolbarClass, className)}
    >
      {children}
    </div>
  );
};

/**
 * Props for the CenterToolbar subcomponent.
 * @see {@link IBaseProps}
 */
export interface IHeaderCenterToolbarProps extends IBaseProps {}

/**
 * CenterToolbar subcomponent for the header.
 *
 * Renders the center-aligned toolbar section within the header, typically for search or central actions.
 *
 * @param {IHeaderCenterToolbarProps} props - Props for the center toolbar.
 * @returns {JSX.Element} The rendered center toolbar element.
 *
 * @see {@link ./constants.ts} for toolbar configuration.
 */
const CenterToolbar = ({ className, children }: IHeaderCenterToolbarProps) => {
  return (
    <div
      data-testid={centerToolbarTestId}
      className={cn(styles.headerCenterToolbarClass, className)}
    >
      {children}
    </div>
  );
};

/**
 * Props for the NavMenu subcomponent.
 * @see {@link IBaseProps}
 */
export interface IHeaderNavMenuProps extends IBaseProps {}

/**
 * NavMenu subcomponent for the header.
 *
 * Renders the navigation menu, including links and menu controls.
 *
 * @param {IHeaderNavMenuProps} props - Props for the navigation menu.
 * @returns {JSX.Element} The rendered navigation menu element.
 *
 * @see {@link ./constants.ts} for navigation menu configuration.
 */
const NavMenu = ({ className, children }: IHeaderNavMenuProps) => {
  return (
    <nav
      data-testid={navMenuContainerTestId}
      className={cn(styles.headerNavMenuClass, className)}
      aria-label={navMenuContainerAriaLabel}
      role="navigation"
    >
      <div className={styles.headerNavMenuContentWrapperClass}>{children}</div>
    </nav>
  );
};

/**
 * Presentational <Header /> component for the application.
 *
 * Renders the main header container with placeholders for navigation panels
 * to host logo, navigation, and user controls along with dropdown menu.
 *
 * @component
 * @example
 * // Basic usage
 * <Header />
 *
 * @returns {JSX.Element} The rendered header element.
 *
 * @remarks
 * - Follows design tokens and responsive layout conventions.
 * - Navigation items and theme controls are customizable via constants.
 *
 * @see {@link ../../constants/content.ts} for header content configuration.
 * @see {@link ./header.styles.ts} for styling details.
 */
const Header = ({
  isNavMenuOpen = false,
  className,
  children,
}: IHeaderProps) => {
  const toolbars = filterToolbarsFromChildren(children);
  const navMenu = filterNavMenuFromChildren(children)[0];

  return (
    <header
      data-testid={applicationHeaderTestId}
      className={cn(styles.headerContainerClass, className)}
    >
      <div
        data-testid={mainPanelTestId}
        className={cn(styles.mainPanelClass, mainPanelTestId)}
      >
        {toolbars}
      </div>
      <div
        data-testid={navMenuDrawerTestId}
        className={cn(
          styles.drawerClass,
          {
            [styles.drawerExpandedClass]: isNavMenuOpen,
          },
          navMenuDrawerTestId,
        )}
      >
        {navMenu}
      </div>
    </header>
  );
};

RightToolbar.displayName = rightToolbarDisplayName;
LeftToolbar.displayName = leftToolbarDisplayName;
CenterToolbar.displayName = centerToolbarDisplayName;
NavMenu.displayName = navMenuDisplayName;

Header.RightToolbar = RightToolbar;
Header.LeftToolbar = LeftToolbar;
Header.CenterToolbar = CenterToolbar;
Header.NavMenu = NavMenu;

export { Header };
