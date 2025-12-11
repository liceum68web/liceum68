"use client";

import { Menu, X } from "lucide-react";

import { useViewport } from "@/lib/hooks/use-viewport";
import { AppRoutes } from "@/lib/types/navigation";
import { Button, Header, Logo } from "@/lib/components/base";
import { useContent } from "@/lib/hooks/use-content";
import { IBaseProps, INavMenuItemDto, ComponentUuid } from "@/lib/types";
import { headerNavbarSlug } from "@/lib/constants";

import { GlobalMenu } from "../global-menu/global-menu";
import { useRef, useState } from "react";
import { GlobalNavbar } from "../global-navbar/global-navbar";
import { useClickAway } from "react-use";
import { height, logoImgSrc, width } from "./constants";
import { MenuCard } from "../menu-card/menu-card";

const renderNavMenuItem = (isMobile: boolean) => (item: INavMenuItemDto) => {
  const { uuid, label } = item;

  return (
    <GlobalMenu.Item key={uuid}>
      <MenuCard>{label}</MenuCard>
    </GlobalMenu.Item>
  );
};

const renderGlobalNavbarItem =
  (
    onNavbarButtonClick: (
      id: INavMenuItemDto["uuid"],
      navmenuItems: INavMenuItemDto["childComponents"]
    ) => void,
    onNavbarLinkClick: VoidFunction
  ) =>
  (item: INavMenuItemDto) => {
    const { uuid, label, componentUuid, route, externalUrl, childComponents } =
      item;

    switch (componentUuid) {
      case ComponentUuid.NavbarLink:
        return (
          <GlobalNavbar.LinkItem
            key={uuid}
            label={label}
            route={route}
            onClick={onNavbarLinkClick}
          />
        );
      case ComponentUuid.NavbarLinkOut:
        return (
          <GlobalNavbar.LinkOutItem
            key={uuid}
            label={label}
            externalUrl={externalUrl}
          />
        );
      case ComponentUuid.NavbarButton:
        return (
          <GlobalNavbar.ButtonItem
            key={uuid}
            label={label}
            onClick={() => onNavbarButtonClick(uuid, childComponents ?? [])}
          >
            {label}
          </GlobalNavbar.ButtonItem>
        );
      default:
        return null;
    }
  };
export interface IGlobalHeaderProps extends IBaseProps {
  headerContent?: Record<string, unknown>;
}

export const GlobalHeader = ({ headerContent }: IGlobalHeaderProps) => {
  const clickAwayColdSpotRef = useRef<HTMLUListElement>(null);

  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [currentNavbarItemId, setCurrentNavbarItemId] =
    useState<INavMenuItemDto["uuid"]>();
  const [navmenuItems, setNavmenuItems] = useState<
    INavMenuItemDto["childComponents"]
  >([]);

  const { isMobile } = useViewport();
  const { findContentBySlug } = useContent(headerContent);

  const { uuid: navbarId, childComponents: navbarItems } =
    findContentBySlug(headerNavbarSlug);

  const collapseNavmenu = () => {
    if (!isNavMenuOpen) {
      return;
    }
    setIsNavMenuOpen(false);
    setCurrentNavbarItemId(undefined);
    setNavmenuItems(undefined);
  };
  const handleNavbarButtonClick = (
    currentItemId: INavMenuItemDto["uuid"],
    navmenuItems: INavMenuItemDto["childComponents"]
  ) => {
    if (currentNavbarItemId === currentItemId) {
      collapseNavmenu();

      return;
    } else {
      setCurrentNavbarItemId(currentItemId);
      setNavmenuItems(navmenuItems);
    }

    if (!isNavMenuOpen) {
      setIsNavMenuOpen(true);
    }
  };
  const handleNavbarLinkClick = () => {
    collapseNavmenu();
  };
  const handleBurgerMenuClick = () => {
    setIsNavMenuOpen(true);
    setCurrentNavbarItemId(navbarId);
    setNavmenuItems([...navbarItems]);
  };

  const handleCloseMenuClick = () => {
    collapseNavmenu();
  };

  useClickAway(
    clickAwayColdSpotRef,
    () => {
      if (isNavMenuOpen) {
        collapseNavmenu();
      }
    },
    ["click"]
  );

  return (
    <Header isNavMenuOpen={isNavMenuOpen}>
      <Header.LeftToolbar>
        <Logo
          href={AppRoutes.HOME}
          imgSrc={logoImgSrc}
          width={width}
          height={height}
        />
      </Header.LeftToolbar>
      {!isMobile && (
        <Header.CenterToolbar>
          <GlobalNavbar ref={clickAwayColdSpotRef}>
            {navbarItems.map(
              renderGlobalNavbarItem(
                handleNavbarButtonClick,
                handleNavbarLinkClick
              )
            )}
          </GlobalNavbar>
        </Header.CenterToolbar>
      )}
      <Header.RightToolbar>
        {isMobile && !isNavMenuOpen && (
          <Button onClick={handleBurgerMenuClick}>
            <Menu size={32} />
          </Button>
        )}
        {isMobile && isNavMenuOpen && (
          <Button onClick={handleCloseMenuClick}>
            <X size={32} />
          </Button>
        )}
      </Header.RightToolbar>
      {navmenuItems?.length && (
        <Header.NavMenu>
          <GlobalMenu isMobile={isMobile} ref={clickAwayColdSpotRef}>
            {navmenuItems.map(renderNavMenuItem(isMobile))}
          </GlobalMenu>
        </Header.NavMenu>
      )}
    </Header>
  );
};
