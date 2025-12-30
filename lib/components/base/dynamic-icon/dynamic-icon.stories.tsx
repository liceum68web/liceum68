import { Meta, StoryObj } from "@storybook/nextjs";
import * as icons from "lucide-react";

import { DynamicIcon } from "./dynamic-icon";

type StoryProps = Record<string, unknown>;

const meta: Meta<StoryProps> = {
  title: "Base/DynamicIcon",
};

export default meta;

type Story = StoryObj<StoryProps>;

const Template: Story = {
  render: () => {
    const iconNames = Object.keys(icons).filter(
      (key) =>
        typeof icons[key as keyof typeof icons] === "object" &&
        icons[key as keyof typeof icons] !== null &&
        /^[A-Z]/.test(key) &&
        !key.endsWith("Icon"),
    );

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 20,
          padding: 40,
        }}
      >
        {iconNames.map((iconName) => (
          <div key={iconName} style={{ textAlign: "center" }}>
            <DynamicIcon name={iconName as keyof typeof icons} size={32} />
            <div
              style={{
                display: "flex",
                marginTop: 8,
                fontSize: 12,
              }}
            >
              {iconName}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const Default: Story = {
  ...Template,
};
