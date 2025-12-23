import { Meta, StoryObj } from "@storybook/nextjs";

import { IArticleProps, Article } from "./article";

type StoryProps = IArticleProps;

const meta: Meta<StoryProps> = {
  title: "Widgets/Article",
  component: Article,
};

export default meta;

type Story = StoryObj<StoryProps>;

const Template: Story = {
  args: {
    src: "https://ixadhieei5brbay9.public.blob.vercel-storage.com/article-banner-fallback.svg",
    title: "Sample Article Title",
    text: "This is a sample article content used to demonstrate the Article widget in Storybook.",
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
