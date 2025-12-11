import { IBaseProps, ILayoutContentDto } from "@/lib/types";
import { LayoutMappers } from "@/lib/utils";

import { GlobalFooter } from "../global-footer/global-footer";
import { GlobalHeader } from "../global-header";
import { UtilityBar } from "../utility-bar/utility-bar";
import {
  globalLayoutContainerClass,
  globalLayoutHeaderContainerClass,
  globalLayoutMainContainerClass,
  globalMainClass,
} from "./global-layout.styles";

export interface IGlobalLayoutProps extends IBaseProps {
  content: ILayoutContentDto;
}

export const GlobalLayout = ({ content, children }: IGlobalLayoutProps) => {
  const {
    mapContentToHeaderProps,
    mapContentToUtilityBarProps,
    mapContentToFooterProps,
  } = LayoutMappers(content);
  const headerProps = mapContentToHeaderProps();
  const utilityBarProps = mapContentToUtilityBarProps();
  const footerProps = mapContentToFooterProps();

  // TODO: Add animation for UtilityBar (and GlobalHeader)
  // to slide up and down from/to the top edge of the viewport
  //  on scroll (main container top margin adjustment needed)

  return (
    <div className={globalLayoutContainerClass}>
      <div className={globalLayoutHeaderContainerClass}>
        <UtilityBar {...utilityBarProps} />
        <GlobalHeader {...headerProps} />
      </div>
      <div className={globalLayoutMainContainerClass}>
        <main className={globalMainClass}>{children}</main>
        <GlobalFooter {...footerProps} />
      </div>
    </div>
  );
};
