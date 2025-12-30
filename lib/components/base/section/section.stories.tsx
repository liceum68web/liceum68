import { Meta, StoryObj } from "@storybook/nextjs";

import { ISectionProps, Section } from "./section";

type StoryProps = ISectionProps;

const meta: Meta<StoryProps> = {
  title: "Base/Section",
  component: Section,
};

export default meta;

type Story = StoryObj<StoryProps>;

const Template: Story = {
  args: {
    sectionAnchorLabel: "some anchor",
    sectionTitle: "Section Title",
    sectionDescription:
      "This is a description for the section. It provides additional context and information about the content within this section.",
  },
  argTypes: {
    className: {
      control: false,
    },
  },
  render: (args) => (
    <>
      <Section {...args} className="bg-blue-50">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}
        >
          Section content goes here.
        </div>
      </Section>
      <Section {...args} className="bg-amber-50">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}
        >
          Adjacent section content goes here.
        </div>
      </Section>
    </>
  ),
};

export const Default: Story = {
  ...Template,
};
