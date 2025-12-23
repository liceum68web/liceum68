import { Meta, StoryObj } from "@storybook/nextjs";

import { IHeaderProps, Header } from "./header";

type StoryProps = IHeaderProps;

const meta: Meta<StoryProps> = {
  title: "Base/Header",
  component: Header,
};

export default meta;

type Story = StoryObj<StoryProps>;

const Template: Story = {
  args: {
    isNavMenuOpen: false,
  },
  argTypes: {
    className: {
      control: false,
    },
    isNavMenuOpen: {
      control: "boolean",
    },
  },
  render: (args: StoryProps) => (
    <Header {...args}>
      <Header.LeftToolbar>
        <span className="h-16 flex items-center justify-center">
          Left Panel
        </span>
      </Header.LeftToolbar>
      <Header.CenterToolbar>
        <span className="h-16 flex items-center justify-center">
          Center Panel
        </span>
      </Header.CenterToolbar>
      <Header.RightToolbar>
        <span className="h-16 flex items-center justify-center">
          Right Panel
        </span>
      </Header.RightToolbar>
      <Header.NavMenu>
        <span className="flex items-center justify-center h-64 w-full">
          Navigation Menu
        </span>
      </Header.NavMenu>
    </Header>
  ),
};

export const Default: Story = {
  ...Template,
};
