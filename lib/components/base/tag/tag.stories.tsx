import { Meta, StoryObj } from "@storybook/nextjs";

import { ITagProps, Tag } from "./tag";

type StoryProps = ITagProps;

const meta: Meta<StoryProps> = {
  title: "Base/Tag",
  component: Tag,
};

export default meta;

type Story = StoryObj<StoryProps>;

const Template: Story = {
  args: {
    label: "Sample Tag",
  },
  argTypes: {
    className: {
      control: false,
    },
  },
};

export const Default: Story = {
  ...Template,
};
