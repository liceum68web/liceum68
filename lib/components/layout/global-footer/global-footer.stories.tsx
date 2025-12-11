import { Meta, StoryObj } from "@storybook/nextjs";

import { ContactInfoType, SocialType } from "@/lib/types";

import { GlobalFooter, IGlobalFooterProps } from "./global-footer";

type StoryProps = IGlobalFooterProps;

const meta: Meta<StoryProps> = {
  title: "Layout/Global Footer",
  component: GlobalFooter,
};

export default meta;

type Story = StoryObj<StoryProps>;

const Template: Story = {
  args: {
    logo: {
      imgSrc: "/app-logo.svg",
      href: "/",
      altText: "App Logo",
      width: 87,
      height: 67,
    },
    socialButtons: [
      {
        type: SocialType.FACEBOOK,
        href: "https://www.facebook.com",
      },
      {
        type: SocialType.INSTAGRAM,
        href: "https://www.instagram.com",
      },
      {
        type: SocialType.YOUTUBE,
        href: "https://www.youtube.com",
      },
    ],
    quickLinksTitle: "Quick Links",
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    resourcesLinksTitle: "Resources",
    resourcesLinks: [
      { label: "Documentation", href: "/documentation" },
      { label: "Help Center", href: "/help" },
      { label: "Privacy Policy", href: "/policy" },
    ],
    contacts: {
      [ContactInfoType.PHONE]: "+1 (555) 123-4567",
      [ContactInfoType.EMAIL]: "info@example.com",
      [ContactInfoType.ADDRESS]: "123 Main St, City, Country",
    },
  },
};

export const Default: Story = {
  ...Template,
};
