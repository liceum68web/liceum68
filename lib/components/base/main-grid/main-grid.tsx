 
import clsx from "clsx";

import { IBaseProps } from "@/lib/types";

import { mainGridDataTestId } from "./constants";
import { mainGridClass } from "./main-grid.styles";

export interface IMainGridProps extends IBaseProps {}

export const MainGrid = ({ id, className, children }: IMainGridProps) => {
  /**
   * MainGrid component for layout structure.
   *
   * This component provides a flexible grid layout for its children, supporting custom class names and additional props.
   *
   * @component
   * @example
   * // Basic usage
   * <MainGrid>
   *   <div>Item 1</div>
   *   <div>Item 2</div>
   * </MainGrid>
   *
   * @param {React.PropsWithChildren<{ className?: string }>} props - The props for MainGrid.
   * @param {string} [props.className] - Optional additional class names for the grid container.
   * @param {React.ReactNode} props.children - The child elements to be rendered inside the grid.
   * @returns {JSX.Element} The rendered grid container with children.
   */
  return (
    <div
      id={id}
      data-testid={mainGridDataTestId}
      className={clsx(mainGridClass, className)}
    >
      {children}
    </div>
  );
};
