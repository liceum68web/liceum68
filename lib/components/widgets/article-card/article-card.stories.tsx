import { Meta, StoryObj } from "@storybook/nextjs";

import { IArticleCardProps, ArticleCard } from "./article-card";

type StoryProps = IArticleCardProps;

const meta: Meta<StoryProps> = {
  title: "Widgets/ArticleCard",
  component: ArticleCard,
};

export default meta;

type Story = StoryObj<StoryProps>;

const Template: Story = {
  args: {
    title: "Sample Article Title for Storybook Showcase. An Engaging Headline",
    text: "This is a sample article description to showcase the ArticleCard component in Storybook. It provides a brief overview of the article content. It is designed to be concise and informative, giving users a quick insight into the article's main points.",
    imageSrc: "/article-banner-fallback.webp",
    tags: ["Technology", "Education", "Innovation hub", "Science", "Research"],
    url: "/articles/sample-article",
  },
  argTypes: {
    className: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, height: 750, padding: 60 }}>
        <Story />
      </div>
    ),
  ],
};

export const Default: Story = {
  ...Template,
};
