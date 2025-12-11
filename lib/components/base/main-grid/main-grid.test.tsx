import { cleanup, render, screen } from "@testing-library/react";
import { MainGrid } from "./main-grid";
import { mainGridDataTestId } from "./constants";
import { describe, it, expect, afterEach } from "vitest";

describe("MainGrid", () => {
  afterEach(cleanup);
  it("should render without crashing", () => {
    render(<MainGrid>Content</MainGrid>);

    const grid = screen.getByTestId(mainGridDataTestId);

    expect(grid).toBeInTheDocument();
  });

  it("should render children correctly", () => {
    render(
      <MainGrid>
        <div>Child 1</div>
        <div>Child 2</div>
      </MainGrid>
    );

    const firstChild = screen.getByText("Child 1");
    const secondChild = screen.getByText("Child 2");

    expect(firstChild).toBeInTheDocument();
    expect(secondChild).toBeInTheDocument();
  });

  it("should apply corresponding className", () => {
    render(<MainGrid className="custom-class">Test</MainGrid>);

    const grid = screen.getByTestId(mainGridDataTestId);

    expect(grid).toHaveClass("custom-class");
  });

  it("should set the id attribute if provided", () => {
    render(<MainGrid id="main-grid-id">Test</MainGrid>);

    const grid = screen.getByTestId(mainGridDataTestId);

    expect(grid).toHaveAttribute("id", "main-grid-id");
  });
});
