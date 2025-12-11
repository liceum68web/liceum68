import { Meta, StoryObj } from "@storybook/nextjs";
import React from "react";

import { IMainGridProps, MainGrid } from "./main-grid";

const mockGridChildren = new Array(12).fill(null);

const mainGridClass = "h-[calc(100vh-40px)]";
const gridColumnClass =
  "h-full bg-orange-500 flex justify-center items-center text-white";

type StoryProps = IMainGridProps;

const meta: Meta<StoryProps> = {
  title: "Base/MainGrid",
  component: MainGrid,
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
  render: (args: StoryProps) => (
    <MainGrid {...args} className={mainGridClass}>
      {mockGridChildren.map((_, idx) => (
        <div className={gridColumnClass} key={idx}>
          col {idx + 1}
        </div>
      ))}
    </MainGrid>
  ),
};

export const Default: Story = {
  ...Template,
};
