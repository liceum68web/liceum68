import { Meta, StoryObj } from "@storybook/nextjs";

import { IButtonProps, Button } from "./button";
import { ButtonPriority, ButtonVariant } from "./types";

type StoryProps = IButtonProps;

const meta: Meta<StoryProps> = {
  title: "Base/Button",
  component: Button,
};

export default meta;

type Story = StoryObj<StoryProps>;

const Template: Story = {
  args: {
    priority: ButtonPriority.PRIMARY,
    variant: ButtonVariant.SOLID,
    disabled: false,
  },
  argTypes: {
    priority: {
      control: "select",
      options: Object.values(ButtonPriority),
    },
    variant: {
      control: "select",
      options: Object.values(ButtonVariant),
    },
    disabled: {
      control: "boolean",
    },
    className: {
      control: false,
    },
    onClick: {
      control: false,
    },
  },
  render: (args: StoryProps) => <Button {...args}>Button Label</Button>,
};

export const Default: Story = {
  ...Template,
};
