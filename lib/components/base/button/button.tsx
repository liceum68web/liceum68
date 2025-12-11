import { IBaseProps } from "@/lib/types";
import clsx from "clsx";
import { buttonClass, disabledButtonClass } from "./button.styles";
import { variantClassMap, styleClassMap } from "./constants";
import { ButtonPriority, ButtonVariant } from "./types";
import { HTMLAttributes } from "react";

export interface IButtonProps
  extends IBaseProps,
    HTMLAttributes<HTMLButtonElement> {
  priority?: ButtonPriority;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: VoidFunction;
}

export const Button = ({
  className,
  priority = ButtonPriority.PRIMARY,
  variant = ButtonVariant.SOLID,
  disabled = false,
  onClick,
  children,
  ...attrs
}: IButtonProps) => {
  /**
   * Button component
   *
   * Renders a styled button element with customizable props.
   *
   * @component
   * @example
   * <Button onClick={() => alert('Clicked!')}>Click Me</Button>
   *
   * @param {ButtonProps} props - Props for the Button component.
   * @param {React.ReactNode} props.children - Content to be displayed inside the button.
   * @param {string} [props.variant] - Visual style variant of the button.
   * @param {boolean} [props.disabled] - Whether the button is disabled.
   * @param {() => void} [props.onClick] - Click event handler.
   * @returns {JSX.Element} The rendered button element.
   */
  return (
    <button
      {...attrs}
      className={clsx(
        buttonClass,
        variantClassMap[priority],
        styleClassMap[variant],
        { [disabledButtonClass]: disabled },
        className
      )}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
