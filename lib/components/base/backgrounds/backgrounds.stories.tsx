import { Meta, StoryObj } from "@storybook/nextjs";

import * as backgroundStyles from "./backgrounds.styles";

type FillPattern = keyof typeof backgroundStyles;

type StoryProps = {
  fillPattern: FillPattern;
};

const meta: Meta<StoryProps> = {
  title: "Base/Backgrounds",
};

export default meta;

type Story = StoryObj<StoryProps>;

const Template: Story = {
  args: {
    fillPattern: Object.keys(backgroundStyles)[0] as FillPattern,
  },
  argTypes: {
    fillPattern: {
      control: "select",
      options: Object.keys(backgroundStyles),
    },
  },
  render: (args, { args: { fillPattern } }) => {
    const BackgroundClass = backgroundStyles[fillPattern];
    return (
      <div
        className={`${BackgroundClass} w-full h-screen flex items-center justify-center`}
      >
        <span>content goes here</span>
      </div>
    );
  },
};

export const Default: Story = {
  ...Template,
};
