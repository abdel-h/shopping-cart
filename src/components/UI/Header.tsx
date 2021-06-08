import React from "react";
import { Route } from "../../typing/common";
import { CartButton } from "./CartButton";
import { HeaderLink } from "./HeaderLink";
import { AppLogo } from "./Logo";

type Props = {
  onRouteChange: (route: Route) => void;
  activeRoute: Route;
};

export function AppHeader({ activeRoute, onRouteChange }: Props) {
  function handleRouteChange(route: Route) {
    return () => {
      onRouteChange(route);
    };
  }

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          <HeaderLink
            text="Home"
            onClick={handleRouteChange("home")}
            active={activeRoute === "home"}
          />
          <HeaderLink
            text="Fruitz"
            onClick={handleRouteChange("products_list")}
            active={activeRoute === "products_list"}
          />
        </nav>
        <a className="flex order-first lg:order-none lg:w-1/5 h-1 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
          <AppLogo />
        </a>
        <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
          <CartButton />
        </div>
      </div>
    </header>
  );
}
