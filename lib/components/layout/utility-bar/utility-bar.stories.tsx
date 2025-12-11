import { Meta, StoryObj } from "@storybook/nextjs";

import { ContactInfoType, SocialType } from "@/lib/types";

import { UtilityBar, IUtilityBarProps } from "./utility-bar";

type StoryProps = IUtilityBarProps;

const meta: Meta<StoryProps> = {
  title: "Layout/Utility Bar",
  component: UtilityBar,
};

export default meta;

type Story = StoryObj<StoryProps>;

const Template: Story = {
  args: {
    quickContact: [ContactInfoType.PHONE, "+1 (555) 123-4567"],
    shortcuts: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

export const Default: Story = {
  ...Template,
};
