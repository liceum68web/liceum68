"use client";

import clsx from "clsx";
import { ChevronDown, LucideProps, Menu, Star, X } from "lucide-react";
import * as icons from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, MouseEvent, ComponentType } from "react";

import { Button, Header, ILogoProps, Logo } from "@/lib/components/base";
import { usePointerOut } from "@/lib/hooks";
import { IBaseProps, RelationTo } from "@/lib/types";
import { RemoteActions } from "@/lib/utils";

import {
  appLogoClass,
  globalHeaderClass,
  centerToolbarClass,
  globalNavbarClass,
  closeButtonClass,
  burgerButtonClass,
  navbarButtonClass,
  navbarButtonLabelClass,
  ctaButtonClass,
  ctaButtonLabelClass,
  ctaButtonIconClass,
  navmenuClass,
  navbarItemIconContainerClass,
  navbarCurrentItemIconContainerClass,
} from "./global-header.styles";
import { GlobalMenu } from "./global-menu";
import {
  GlobalNavbar,
  IGlobalNavbarButtonItemProps,
  IGlobalNavbarLinkItemProps,
} from "./global-navbar";
import { IMenuCardProps, MenuCard } from "./menu-card";

const renderNavMenuItem =
  (collapseNavmenu: VoidFunction) => (item: IMenuCardProps) => {
    const { id, label, description, icon, href } = item;

    return (
      <GlobalMenu.Item key={id}>
        <MenuCard
          label={label}
          description={description}
          icon={icon}
          href={href}
          onClick={collapseNavmenu}
        />
      </GlobalMenu.Item>
    );
  };

const renderGlobalNavbarItem =
  (
    currentNavbarItemId: NavbarItem["id"] | undefined,
    onNavButtonSelect: (id: NavbarItem["id"]) => void,
    onNavbarLinkClick: VoidFunction,
    handleNavbarLinkHover: VoidFunction,
  ) =>
  (item: NavbarItem) => {
    const { id, relationTo, ...navbarItemProps } = item;
    const isCurrentItem = currentNavbarItemId === id;
    const handleButtonMouseEnter = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onNavButtonSelect(id);
    };

    switch (relationTo) {
      case RelationTo.PAGES:
        return (
          <GlobalNavbar.LinkItem
            {...(navbarItemProps as IGlobalNavbarLinkItemProps)}
            key={id}
            onClick={onNavbarLinkClick}
            onMouseEnter={handleNavbarLinkHover}
            className={navbarButtonClass}
          />
        );
      case RelationTo.CATEGORIES:
        return (
          <GlobalNavbar.ButtonItem
            {...(navbarItemProps as IGlobalNavbarButtonItemProps)}
            key={id}
            onMouseEnter={handleButtonMouseEnter as VoidFunction}
            className={navbarButtonClass}
          >
            <span key="label" className={navbarButtonLabelClass}>
              {navbarItemProps.label}
            </span>
            <span
              key="icon"
              className={clsx(
                navbarItemIconContainerClass,
                isCurrentItem && navbarCurrentItemIconContainerClass,
              )}
            >
              <ChevronDown size={16} />
            </span>
          </GlobalNavbar.ButtonItem>
        );
      default:
        return null;
    }
  };

type NavbarItem = (
  | IGlobalNavbarLinkItemProps
  | IGlobalNavbarButtonItemProps
) & { id: string; relationTo: RelationTo };
export interface IGlobalHeaderProps extends IBaseProps {
  navbarItems?: NavbarItem[];
  logo?: ILogoProps;
  ctaButtonLabel?: string;
  ctaActionType?: keyof ReturnType<typeof RemoteActions>;
  ctaActionParams?: unknown | unknown[];
  ctaButtonIcon?: keyof typeof icons;
  navmenu?: Record<string, IMenuCardProps[]>;
}

export const GlobalHeader = ({
  navbarItems,
  logo,
  ctaButtonLabel,
  ctaActionType,
  ctaActionParams,
  ctaButtonIcon,
  navmenu = {},
}: IGlobalHeaderProps) => {
  const navbarRef = useRef<HTMLUListElement>(null);
  const globalMenuRef = useRef<HTMLUListElement>(null);

  const router = useRouter();

  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [currentNavbarItemId, setCurrentNavbarItemId] = useState<
    NavbarItem["id"] | undefined
  >();

  const navmenuItems = currentNavbarItemId ? navmenu[currentNavbarItemId] : [];
  const CTAIcon =
    ctaButtonIcon && icons[ctaButtonIcon]
      ? (icons[ctaButtonIcon] as ComponentType<IBaseProps & LucideProps>)
      : Star;

  const collapseNavmenu = () => {
    if (!isNavMenuOpen) {
      return;
    }
    setIsNavMenuOpen(false);
    setCurrentNavbarItemId(undefined);
  };
  const handleCtaButtonClick = () => {
    const remoteActions = RemoteActions({
      routerNavigate: router.push,
    });
    const remoteAction =
      remoteActions[ctaActionType as keyof typeof remoteActions];

    if (remoteAction) {
      remoteAction(Array<unknown | unknown[]>().concat(ctaActionParams));
    }
  };
  const handleNavbarButtonClick = (
    currentItemId: NavbarItem["id"] | undefined,
  ) => {
    setCurrentNavbarItemId(currentItemId);

    if (!isNavMenuOpen) {
      setIsNavMenuOpen(true);
    }
  };
  const handleNavbarLinkClick = () => {
    collapseNavmenu();
  };

  const handleNavbarLinkHover = () => {
    collapseNavmenu();
  };

  const handleBurgerMenuClick = () => {
    setIsNavMenuOpen(true);
    setCurrentNavbarItemId(undefined);
  };

  const handleCloseMenuClick = () => {
    collapseNavmenu();
  };

  usePointerOut([navbarRef, globalMenuRef], collapseNavmenu);

  return (
    <Header className={globalHeaderClass} isNavMenuOpen={isNavMenuOpen}>
      <Header.LeftToolbar>
        {logo && <Logo {...logo} className={appLogoClass} />}
      </Header.LeftToolbar>
      <Header.CenterToolbar className={centerToolbarClass}>
        <GlobalNavbar ref={navbarRef} className={globalNavbarClass}>
          {navbarItems?.map(
            renderGlobalNavbarItem(
              currentNavbarItemId,
              handleNavbarButtonClick,
              handleNavbarLinkClick,
              handleNavbarLinkHover,
            ),
          )}
        </GlobalNavbar>
      </Header.CenterToolbar>
      <Header.RightToolbar>
        <Button onClick={handleCtaButtonClick} className={ctaButtonClass}>
          <span className={ctaButtonLabelClass}>{ctaButtonLabel}</span>
          <CTAIcon size={24} className={ctaButtonIconClass} />
        </Button>
        {isNavMenuOpen ? (
          <Button className={closeButtonClass} onClick={handleCloseMenuClick}>
            <X size={32} />
          </Button>
        ) : (
          <Button className={burgerButtonClass} onClick={handleBurgerMenuClick}>
            <Menu size={32} />
          </Button>
        )}
      </Header.RightToolbar>
      {!!navmenuItems?.length && (
        <Header.NavMenu>
          <GlobalMenu
            ref={globalMenuRef}
            className={navmenuClass}
            onMouseLeave={collapseNavmenu}
          >
            {navmenuItems.map(renderNavMenuItem(collapseNavmenu))}
          </GlobalMenu>
        </Header.NavMenu>
      )}
    </Header>
  );
};
