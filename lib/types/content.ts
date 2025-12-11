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
