import {
  createEvent,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import React from "react";
import { Route } from "../../typing/common";
import { Tabs } from "./Tabs";

describe("Tabs", () => {
  const onTabSelectMock = jest.fn();

  const renderTabs = (route: Route): RenderResult => {
    return render(<Tabs onTabSelect={onTabSelectMock} activeTab={route} />);
  };

  beforeEach(() => {
    onTabSelectMock.mockReset();
  });

  it("should trigger onTabSelect with route", async () => {
    const { getByText } = renderTabs("home");

    const productsNav = getByText("Products");

    fireEvent(productsNav, createEvent.click(productsNav));

    expect(onTabSelectMock).toBeCalledWith("products_list");
  });

  it("should correctly set the active tab classname", () => {
    const { getByText } = renderTabs("products_list");

    const productsNav = getByText("Products");
    expect(productsNav.className.includes("active")).toBeTruthy();
  });
});
