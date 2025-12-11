import { Meta, StoryObj } from "@storybook/nextjs";
import { GlobalHeader, IGlobalHeaderProps } from "./global-header";

type StoryProps = IGlobalHeaderProps;

const meta: Meta<StoryProps> = {
  title: "Styled/Global Header",
  component: GlobalHeader,
};

export default meta;

type Story = StoryObj<StoryProps>;

const Template: Story = {
  args: {},
};

export const Default: Story = {
  ...Template,
};
