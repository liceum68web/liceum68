import { Meta, StoryObj } from "@storybook/nextjs";

import { ISliderProps, Slider } from "./slider";

type StoryProps = ISliderProps;

const meta: Meta<StoryProps> = {
  title: "Widgets/Slider",
  component: Slider,
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
      <div style={{ width: "100%", padding: 10 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Slider {...args}>
      <div
        style={{
          width: "200%",
          height: "200px",
          textWrap: "nowrap",
          display: "flex",
          alignItems: "center",
        }}
      >
        Some really long line of text that exceeds the width of the slider
        container to demonstrate the scrolling functionality. Even more text
        should go here to ensure the content is scrollable within the slider.
      </div>
    </Slider>
  ),
};

export const Default: Story = {
  ...Template,
};
