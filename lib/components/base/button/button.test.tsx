import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Button } from "./button";

describe("<Button />", () => {
  afterEach(cleanup);

  it("should render <button/> element", () => {
    render(<Button>Foo</Button>);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  it("should render button's children", () => {
    render(
      <Button>
        <span>Foo</span>
      </Button>
    );

    const button = screen.getByRole("button");
    const label = screen.getByText("Foo");

    expect(button).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(button).toContainElement(label);
  });

  it("should apply custom className", () => {
    render(<Button className="custom-class">Foo</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("custom-class");
  });

  it("should set disabled attribute and respective class modifier when disabled", () => {
    render(<Button disabled>Foo</Button>);

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(button.className).toMatch(/disabled/);
  });

  it("should not call onClick when disabled", () => {
    const mockOnClick = vi.fn();

    render(
      <Button disabled onClick={mockOnClick}>
        Foo
      </Button>
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("should call onClick when enabled", () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Foo</Button>);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should spread additional props", () => {
    const mockButtonDataTestId = "foo";

    render(<Button data-testid={mockButtonDataTestId}>Foo</Button>);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("data-testid", mockButtonDataTestId);
  });
});
