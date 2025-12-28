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
    text: "This is a sample article content used to demonstrate the Article widget in Storybook. It showcases how the component renders text, images, publication dates, and tags effectively. The Article widget is designed to be flexible and easy to use in various contexts within a web application. Feel free to customize the content as needed to fit your specific use case. Enjoy exploring the features of this component!",
    publicationDate: "2024-06-15",
    tags: ["News", "Updates", "Storybook"],
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
