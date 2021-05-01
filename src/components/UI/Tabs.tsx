import React from "react";
import { Nav } from "react-bootstrap";
import { Route } from "../../typing/common";

type TabsProps = {
  onTabSelect: (route: Route) => void;
  activeTab: Route;
};

export function Tabs({ onTabSelect, activeTab }: TabsProps) {
  function handleTabSelect(selected: string | null) {
    if (selected) {
      onTabSelect(selected as Route);
    }
  }

  return (
    <Nav
      data-testid="tabs-navs"
      variant="pills"
      activeKey={activeTab}
      onSelect={handleTabSelect}
    >
      <NavItem title="Home" eventKey="home" />
      <NavItem title="Products" eventKey="products_list" />
      <NavItem title="Cart" eventKey="cart" />
    </Nav>
  );
}

type Props = {
  title: string;
  eventKey: Route;
};

function NavItem({ title, eventKey }: Props) {
  return (
    <Nav.Item>
      <Nav.Link eventKey={eventKey}>{title}</Nav.Link>
    </Nav.Item>
  );
}
