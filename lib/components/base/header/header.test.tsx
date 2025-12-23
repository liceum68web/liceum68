import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";

import {
  applicationHeaderTestId,
  mainPanelTestId,
  navMenuContainerTestId,
  navMenuDrawerTestId,
  rightToolbarTestId,
} from "./constants";
import { Header } from "./header";

describe("<Header />", () => {
  afterEach(cleanup);
  it("should render the header container", () => {
    render(<Header />);

    const headerContainer = screen.getByTestId(applicationHeaderTestId);

    expect(headerContainer).toBeInTheDocument();
  });

  it("should have two child divs for main panel and nav menu drawer", () => {
    render(<Header />);

    const headerContainer = screen.getByTestId(applicationHeaderTestId);
    const mainPanel = screen.getByTestId(mainPanelTestId);
    const navMenu = screen.getByTestId(navMenuDrawerTestId);

    expect(headerContainer.children.length).toBe(2);
    expect(headerContainer).toContainElement(mainPanel);
    expect(headerContainer).toContainElement(navMenu);
  });

  it("should render navMenu collapsed and transparent (zero opacity) by default", () => {
    render(<Header />);

    const navMenu = screen.getByTestId(navMenuDrawerTestId);

    expect(navMenu).toHaveClass("opacity-0");
  });

  it('should render navMenu collapsed with "isNavMenuOpen" prop false', () => {
    render(<Header isNavMenuOpen={false} />);

    const navMenu = screen.getByTestId(navMenuDrawerTestId);

    expect(navMenu).toHaveClass("opacity-0");
    expect(navMenu).toHaveClass("grid-rows-[0fr]");
  });

  it('should render navMenu expanded when "isNavMenuOpen" prop is true', () => {
    render(<Header isNavMenuOpen={true} />);

    const navMenu = screen.getByTestId(navMenuDrawerTestId);

    expect(navMenu).toHaveClass("opacity-100");
    expect(navMenu).toHaveClass("grid-rows-[1fr]");
  });
});

describe("<Header.RightToolbar />", () => {
  afterEach(cleanup);
  it("should render the right toolbar contents inside main panel", () => {
    render(
      <Header>
        <Header.RightToolbar>Right Toolbar</Header.RightToolbar>
      </Header>
    );

    const mainPanel = screen.getByTestId(mainPanelTestId);
    const rightToolbar = screen.getByTestId(rightToolbarTestId);

    expect(rightToolbar).toBeInTheDocument();
    expect(mainPanel).toContainElement(rightToolbar);
    expect(rightToolbar).toHaveTextContent("Right Toolbar");
  });

  it("should not render the right toolbar if not provided as child", () => {
    render(<Header />);

    const mainPanel = screen.getByTestId(mainPanelTestId);
    const rightToolbar = screen.queryByTestId(rightToolbarTestId);

    expect(rightToolbar).not.toBeInTheDocument();
    expect(mainPanel).not.toContainElement(rightToolbar as HTMLElement);
  });
});

describe("<Header.LeftToolbar />", () => {
  afterEach(cleanup);
  it("should render the left toolbar contents inside main panel", () => {
    render(
      <Header>
        <Header.LeftToolbar>Left Toolbar</Header.LeftToolbar>
      </Header>
    );

    const mainPanel = screen.getByTestId(mainPanelTestId);
    const leftToolbar = screen.getByTestId("header-left-toolbar");

    expect(leftToolbar).toBeInTheDocument();
    expect(mainPanel).toContainElement(leftToolbar);
    expect(leftToolbar).toHaveTextContent("Left Toolbar");
  });

  it("should not render the left toolbar if not provided as child", () => {
    render(<Header />);

    const mainPanel = screen.getByTestId(mainPanelTestId);
    const leftToolbar = screen.queryByTestId("header-left-toolbar");

    expect(leftToolbar).not.toBeInTheDocument();
    expect(mainPanel).not.toContainElement(leftToolbar as HTMLElement);
  });
});

describe("<Header.CenterToolbar />", () => {
  afterEach(cleanup);
  it("should render the center toolbar contents inside main panel", () => {
    render(
      <Header>
        <Header.CenterToolbar>Center Toolbar</Header.CenterToolbar>
      </Header>
    );

    const mainPanel = screen.getByTestId(mainPanelTestId);
    const centerToolbar = screen.getByTestId("header-center-toolbar");

    expect(centerToolbar).toBeInTheDocument();
    expect(mainPanel).toContainElement(centerToolbar);
    expect(centerToolbar).toHaveTextContent("Center Toolbar");
  });

  it("should not render the center toolbar if not provided as child", () => {
    render(<Header />);

    const mainPanel = screen.getByTestId(mainPanelTestId);
    const centerToolbar = screen.queryByTestId("header-center-toolbar");

    expect(centerToolbar).not.toBeInTheDocument();
    expect(mainPanel).not.toContainElement(centerToolbar as HTMLElement);
  });
});

describe("<Header.NavMenu />", () => {
  afterEach(cleanup);
  it("should render the nav menu drawer contents inside nav menu drawer", () => {
    render(
      <Header>
        <Header.NavMenu>Nav Menu Drawer</Header.NavMenu>
      </Header>
    );

    const navMenuDrawer = screen.getByTestId(navMenuDrawerTestId);
    const navMenu = screen.getByTestId(navMenuContainerTestId);

    expect(navMenu).toBeInTheDocument();
    expect(navMenuDrawer).toContainElement(navMenu);
    expect(navMenu).toHaveTextContent("Nav Menu Drawer");
  });

  it("should not render the nav menu if not provided as child", () => {
    render(<Header />);

    const navMenuDrawer = screen.getByTestId(navMenuDrawerTestId);
    const navMenu = screen.queryByTestId(navMenuContainerTestId);

    expect(navMenu).not.toBeInTheDocument();
    expect(navMenuDrawer).not.toContainElement(navMenu as HTMLElement);
  });
});
