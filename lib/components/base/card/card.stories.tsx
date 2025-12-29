import { Meta, StoryObj } from "@storybook/nextjs";

import { ICardProps, Card } from "./card";

type StoryProps = ICardProps;

const meta: Meta<StoryProps> = {
  title: "Base/Card",
  component: Card,
};

export default meta;

type Story = StoryObj<StoryProps>;

const Template: Story = {
  args: {},
  argTypes: {
    className: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400, height: 450, padding: 60 }}>
        <Story />
      </div>
    ),
  ],
};

export const Default: Story = {
  ...Template,
};
