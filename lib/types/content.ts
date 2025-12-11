export type IPageContent = Record<string, unknown>;

export interface ITaggedCollection {
  tags?: string[];
}

export interface IBaseCollectionDto {
  uuid: string;
  slug?: string;
  componentUuid: ComponentUuid;
  associatedTags: { tagLabel: string }[];
  childComponents?: ComponentDto[];
}

export enum ComponentUuid {
  NavbarLink = "navbar-link",
  NavbarLinkOut = "navbar-link-out",
  NavbarButton = "navbar-button",
}

export interface INavbarDto extends IBaseCollectionDto {}
export interface INavMenuItemDto extends IBaseCollectionDto {
  label: string;
  imgSrc?: string;
  description?: string;
  route?: string;
  externalUrl?: string;
}

export type ComponentDto = INavbarDto & INavMenuItemDto;
