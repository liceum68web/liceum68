export enum RelationTo {
  PAGES = "pages",
  CATEGORIES = "categories",
}

export enum SocialType {
  FACEBOOK = "facebook",
  INSTAGRAM = "instagram",
  YOUTUBE = "youtube",
}

export enum ContactInfoType {
  PHONE = "phone",
  EMAIL = "email",
  ADDRESS = "address",
}

export enum IconPaletteType {
  RED = "red",
  ORANGE = "orange",
  GREEN = "green",
  BLUE = "blue",
  PURPLE = "purple",
  GRAY = "gray",
}

export enum ArrayLayoutType {
  GRID = "grid",
  ROW = "row",
  COLUMN = "column",
}

// TODO: examine and extend as needed once ready
export interface ILayoutContentDto {
  data: {
    metadata?: {
      title?: string;
      description?: string;
    };
    [key: string]: unknown;
  };
}
