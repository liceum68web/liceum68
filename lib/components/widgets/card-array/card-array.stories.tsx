import { Meta, StoryObj } from "@storybook/nextjs";

import { ArrayLayoutType } from "@/lib/types";

import { ICardArrayProps, CardArray } from "./card-array";

const renderArrayChild = (_: unknown, idx: number) => (
  <div
    key={idx}
    style={{
      height: 450,
      width: "100%",
      minWidth: 250,
      backgroundColor: "#f3f4f6",
      borderRadius: 8,
    }}
  />
);

type StoryProps = ICardArrayProps;

const meta: Meta<StoryProps> = {
  title: "Widgets/CardArray",
  component: CardArray,
};

export default meta;

type Story = StoryObj<StoryProps>;

const Template: Story = {
  args: {
    layout: ArrayLayoutType.GRID,
  },
  argTypes: {
    layout: {
      control: "select",
      options: Object.values(ArrayLayoutType),
    },
    className: {
      control: false,
    },
  },
  render: (args) => (
    <CardArray {...args}>{[...Array(8)].map(renderArrayChild)}</CardArray>
  ),
};

export const Default: Story = {
  ...Template,
};
