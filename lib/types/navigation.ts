export enum AppRoutes {
  HOME = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",
  PROFILE = "/profile",
  SETTINGS = "/settings",
  HELP = "/help",
  DOCUMENTATION = "/documentation",
}

export interface NavigationLink {
  label: string;
  href: string;
}
