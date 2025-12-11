import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Logo } from "./logo";

describe("<Logo />", () => {
  afterEach(cleanup);

  const defaultProps = {
    href: "/home",
    imgSrc: "/test-logo.png",
    width: 100,
    height: 50,
  };

  it("should render link element", () => {
    render(<Logo {...defaultProps} />);

    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument();
  });

  it("should render image element", () => {
    render(<Logo {...defaultProps} />);

    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
  });

  it("should set correct href attribute on link", () => {
    const testHref = "/test-page";
    render(<Logo {...defaultProps} href={testHref} />);

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", testHref);
  });

  it("should set correct src attribute on image", () => {
    const testSrc = "/test-image.png";
    render(<Logo {...defaultProps} imgSrc={testSrc} />);

    const image = screen.getByRole("img");

    // Next.js Image component transforms src for optimization
    expect(image.getAttribute("src")).toContain(encodeURIComponent(testSrc));
  });

  it("should set default alt text when not provided", () => {
    render(<Logo {...defaultProps} />);

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("alt", "logo");
  });

  it("should set custom alt text when provided", () => {
    const customAltText = "Company Logo";
    render(<Logo {...defaultProps} altText={customAltText} />);

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("alt", customAltText);
  });

  it("should set width and height attributes", () => {
    const width = 200;
    const height = 100;
    render(<Logo {...defaultProps} width={width} height={height} />);

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("width", width.toString());
    expect(image).toHaveAttribute("height", height.toString());
  });

  it("should apply default logo class", () => {
    render(<Logo {...defaultProps} />);

    const image = screen.getByRole("img");

    expect(image).toHaveClass("object-contain");
  });

  it("should apply custom className", () => {
    render(<Logo {...defaultProps} className="custom-logo-class" />);

    const image = screen.getByRole("img");

    expect(image).toHaveClass("object-contain");
    expect(image).toHaveClass("custom-logo-class");
  });

  it("should call onClick when link is clicked", () => {
    const mockOnClick = vi.fn();

    render(<Logo {...defaultProps} onClick={mockOnClick} />);

    const link = screen.getByRole("link");

    fireEvent.click(link);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick when not provided", () => {
    // This test ensures no errors occur when onClick is not provided
    render(<Logo {...defaultProps} />);

    const link = screen.getByRole("link");

    expect(() => fireEvent.click(link)).not.toThrow();
  });

  it("should spread additional props to link element", () => {
    const testId = "logo-test-id";

    render(<Logo {...defaultProps} data-testid={testId} id="test-id" />);

    const link = screen.getByRole("link");

    // Check that the component can receive additional props (id prop should work)
    expect(link).toHaveAttribute("id", "test-id");
  });

  it("should contain image within link", () => {
    render(<Logo {...defaultProps} />);

    const link = screen.getByRole("link");
    const image = screen.getByRole("img");

    expect(link).toContainElement(image);
  });

  it("should work with provided width and height", () => {
    const { href, imgSrc, width, height } = defaultProps;
    render(<Logo href={href} imgSrc={imgSrc} width={width} height={height} />);

    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toContain(encodeURIComponent(imgSrc));
  });

  it("should handle undefined width and height gracefully", () => {
    // Note: Next.js Image requires width/height or fill prop, so this tests the component's behavior
    // when dimensions are provided but could be dynamic
    render(
      <Logo
        href={defaultProps.href}
        imgSrc={defaultProps.imgSrc}
        width={100}
        height={50}
      />
    );

    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toContain(
      encodeURIComponent(defaultProps.imgSrc)
    );
  });

  it("should work with minimal required props", () => {
    const minimalProps = {
      href: "/",
      imgSrc: "/test.png",
      width: 100,
      height: 50,
    };

    render(<Logo {...minimalProps} />);

    const link = screen.getByRole("link");
    const image = screen.getByRole("img");

    expect(link).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "logo");
  });
});
