import { Meta, StoryObj } from "@storybook/nextjs";
import { ILogoProps, Logo } from "./logo";
import { AppRoutes } from "@/lib/types";

type StoryProps = ILogoProps;

const meta: Meta<StoryProps> = {
  title: "Molecules/Logo",
  component: Logo,
};

export default meta;

type Story = StoryObj<StoryProps>;

const Template: Story = {
  args: {
    href: AppRoutes.HOME,
    imgSrc: "/logo.svg",
    altText: "App Logo",
    width: 313,
    height: 35,
  },
  argTypes: {
    className: {
      control: false,
    },
    width: {
      control: { type: "number" },
    },
    height: {
      control: { type: "number" },
    },
    altText: {
      control: { type: "text" },
    },
    onClick: {
      control: false,
    },
  },
};

export const Default: Story = {
  ...Template,
};

export const WithCustomStyling: Story = {
  ...Template,
  args: {
    ...Template.args,
    className: "border border-gray-300 p-2 rounded",
    altText: "Styled Logo",
  },
};

export const SmallSize: Story = {
  ...Template,
  args: {
    ...Template.args,
    width: 150,
    height: 20,
    altText: "Small Logo",
  },
};

export const WithoutDimensions: Story = {
  ...Template,
  args: {
    href: AppRoutes.HOME,
    imgSrc: "/logo.svg",
    altText: "Logo without specified dimensions",
  },
};
