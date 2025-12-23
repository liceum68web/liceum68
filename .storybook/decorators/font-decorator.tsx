import clsx from "clsx";
import { DecoratorFunction } from "storybook/internal/types";

import { fontInter } from "../../lib/constants";

export const fontDecorator: () => DecoratorFunction = () => (Story) =>
  (
    <div className={fontInter.className}>
      <Story />
    </div>
  );
