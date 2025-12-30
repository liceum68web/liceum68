import { Meta, StoryObj } from "@storybook/nextjs";

import { IconPaletteType } from "@/lib/types";

import { IFlashCardProps, FlashCard } from "./flash-card";

type StoryProps = IFlashCardProps;

const meta: Meta<StoryProps> = {
  title: "Widgets/FlashCard",
  component: FlashCard,
};

export default meta;

type Story = StoryObj<StoryProps>;

const Template: Story = {
  args: {
    icon: "Star",
    iconFramePalette: IconPaletteType.BLUE,
    title: "Flash Card Title",
    description:
      "This is a description for the flash card. It provides additional information.",
  },
  argTypes: {
    className: {
      control: false,
    },
    icon: {
      control: false,
    },
    iconFramePalette: {
      control: "select",
      options: Object.values(IconPaletteType),
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 550, height: 450, padding: 60 }}>
        <Story />
      </div>
    ),
  ],
};

export const Default: Story = {
  ...Template,
};
