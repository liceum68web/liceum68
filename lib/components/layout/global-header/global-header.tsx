"use client";

import { ChevronDown, LucideProps, Menu, Star, X } from "lucide-react";
import * as icons from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, MouseEvent } from "react";
import { useClickAway } from "react-use";

import { Button, Header, ILogoProps, Logo } from "@/lib/components/base";
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
} from "./global-header.styles";
import { GlobalMenu } from "./global-menu";
import {
  GlobalNavbar,
  IGlobalNavbarButtonItemProps,
  IGlobalNavbarLinkItemProps,
} from "./global-navbar";
import { IMenuCardProps, MenuCard } from "./menu-card";

const renderNavMenuItem = (item: IMenuCardProps) => {
  const { id, label, description, icon, href } = item;

  return (
    <GlobalMenu.Item key={id}>
      <MenuCard
        label={label}
        description={description}
        icon={icon}
        href={href}
      />
    </GlobalMenu.Item>
  );
};

const renderGlobalNavbarItem =
  (
    onNavbarButtonClick: (id: NavbarItem["id"]) => void,
    onNavbarLinkClick: VoidFunction,
  ) =>
  (item: NavbarItem) => {
    const { id, relationTo, ...navbarItemProps } = item;
    const handleButtonClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onNavbarButtonClick(id);
    };

    switch (relationTo) {
      case RelationTo.PAGES:
        return (
          <GlobalNavbar.LinkItem
            {...(navbarItemProps as IGlobalNavbarLinkItemProps)}
            key={id}
            onClick={onNavbarLinkClick}
            className={navbarButtonClass}
          />
        );
      case RelationTo.CATEGORIES:
        return (
          <GlobalNavbar.ButtonItem
            {...(navbarItemProps as IGlobalNavbarButtonItemProps)}
            key={id}
            onClick={handleButtonClick as VoidFunction}
            className={navbarButtonClass}
          >
            <span key="label" className={navbarButtonLabelClass}>
              {navbarItemProps.label}
            </span>
            <ChevronDown key="icon" size={16} />
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
  const clickAwayColdSpotRef = useRef<HTMLUListElement>(null);

  const router = useRouter();

  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [currentNavbarItemId, setCurrentNavbarItemId] = useState<
    NavbarItem["id"] | undefined
  >();

  const navmenuItems = currentNavbarItemId ? navmenu[currentNavbarItemId] : [];
  const CTAIcon =
    ctaButtonIcon && icons[ctaButtonIcon]
      ? (icons[ctaButtonIcon] as React.ComponentType<IBaseProps & LucideProps>)
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
    if (currentNavbarItemId === currentItemId) {
      collapseNavmenu();

      return;
    } else {
      setCurrentNavbarItemId(currentItemId);
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
    setCurrentNavbarItemId(undefined);
  };

  const handleCloseMenuClick = () => {
    collapseNavmenu();
  };

  useClickAway(clickAwayColdSpotRef, () => {
    if (!isNavMenuOpen) {
      return;
    }
    collapseNavmenu();
  }, ["click"]);

  return (
    <Header className={globalHeaderClass} isNavMenuOpen={isNavMenuOpen}>
      <Header.LeftToolbar>
        {logo && <Logo {...logo} className={appLogoClass} />}
      </Header.LeftToolbar>
      <Header.CenterToolbar className={centerToolbarClass}>
        <GlobalNavbar ref={clickAwayColdSpotRef} className={globalNavbarClass}>
          {navbarItems?.map(
            renderGlobalNavbarItem(
              handleNavbarButtonClick,
              handleNavbarLinkClick,
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
          <GlobalMenu ref={clickAwayColdSpotRef} className={navmenuClass}>
            {navmenuItems.map(renderNavMenuItem)}
          </GlobalMenu>
        </Header.NavMenu>
      )}
    </Header>
  );
};
