import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

import { IBaseProps } from "@/lib/types";

import { logoClass, linkClass } from "./logo.styles";

/**
 * Props interface for the Logo component.
 *
 * Extends IBaseProps to inherit common component properties like className and children.
 * Provides all necessary properties to render a clickable logo with customizable appearance and behavior.
 *
 * @interface ILogoProps
 * @extends {IBaseProps}
 */
export interface ILogoProps extends IBaseProps {
  /**
   * The URL or path that the logo should navigate to when clicked.
   * Can be an internal Next.js route (e.g., '/') or an external URL.
   * @example '/dashboard' | 'https://example.com'
   */
  href: string;

  /**
   * The source path or URL of the logo image to be displayed.
   * Should be accessible from the public directory or be a valid external image URL.
   * @example '/images/logo.svg' | 'https://cdn.example.com/logo.png'
   */
  imgSrc: string;

  /**
   * The width of the logo image in pixels.
   * If not provided, the image will use its intrinsic width or be styled via CSS.
   * @optional
   * @example 120
   */
  width?: number;

  /**
   * The height of the logo image in pixels.
   * If not provided, the image will use its intrinsic height or be styled via CSS.
   * @optional
   * @example 40
   */
  height?: number;

  /**
   * Alternative text for the logo image for accessibility purposes.
   * Provides screen reader support and displays when the image fails to load.
   * @optional
   * @default 'logo'
   * @example 'Company Logo' | 'Brand Name'
   */
  altText?: string;

  /**
   * Optional click handler function that executes when the logo is clicked.
   * Called in addition to the navigation behavior provided by the href prop.
   * Useful for analytics tracking, custom behaviors, or preventDefault scenarios.
   * @optional
   * @default undefined
   * @example () => trackAnalytics('logo_click')
   */
  onClick?: VoidFunction;
}

/**
 * Logo Component
 *
 * A reusable logo component that renders a clickable image wrapped in a Next.js Link.
 * Provides navigation functionality while maintaining accessibility standards and customizable styling.
 *
 * The component combines Next.js optimized Image component with Link component to create
 * an accessible, performant logo that can navigate users to any specified route or URL.
 *
 * @component
 * @param {ILogoProps} props - The props for the Logo component
 * @param {string} props.href - Navigation destination URL or path
 * @param {string} props.imgSrc - Source path or URL for the logo image
 * @param {number} [props.width] - Image width in pixels (optional)
 * @param {number} [props.height] - Image height in pixels (optional)
 * @param {string} [props.altText='logo'] - Alternative text for accessibility
 * @param {VoidFunction} [props.onClick=noop] - Optional click handler
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {string} [props.id] - HTML id attribute
 * @param {React.ReactNode} [props.children] - Child elements (inherited from IBaseProps)
 *
 * @returns {JSX.Element} A clickable logo image wrapped in a navigation link
 *
 * @example
 * ```tsx
 * <Logo
 *   href="/"
 *   imgSrc="/images/logo.svg"
 *   altText="App Logo"
 * />
 */
export const Logo = ({
  href,
  imgSrc,
  width,
  height,
  altText = "logo",
  onClick,
  className,
  ...props
}: ILogoProps) => {
  return (
    <Link className={linkClass} href={href} onClick={onClick} {...props}>
      <Image
        src={imgSrc}
        alt={altText}
        className={clsx(logoClass, className)}
        width={width}
        height={height}
      />
    </Link>
  );
};
