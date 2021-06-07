import React, { useState } from "react";
import "./App.css";
import { Product, Route } from "./typing/common";

import { AppHeader } from "./components/UI/Header";

import { Homepage } from "./components/App/Homepage";
import { CartPanel } from "./components/App/CartPanel";
import { ProductsContainer } from "./components/Products/Products";
import { useStore } from "./utils/appReducer";

function App() {
  const [route, setRoute] = useState<Route>("home");

  const { dispatch, state } = useStore();

  const { productsList, cart } = state;

  function handleSubmit(products: Product[]) {
    dispatch({
      type: "ADD_TO_CART",
      value: products,
    });
  }

  return (
    <div
      style={{ height: "100vh" }}
      className="bg-gradient-to-tl from-yellow-100 via-yellow-300 to-yellow-500

      p-3"
    >
      <div
        className="bg-white border-4 border-opacity-75 border-yellow-300 container mx-auto p-10 rounded-3xl shadow-md"
        style={{ height: "100vh" }}
      >
        <div data-testid="tabs-navs">
          <AppHeader activeRoute={route} onRouteChange={setRoute} />
        </div>
        <div data-testid="page-container">
          {route === "home" && <Homepage />}
          {route === "products_list" && (
            <ProductsContainer
              products={productsList}
              onSubmit={handleSubmit}
            />
          )}
          {route === "cart" && <CartPanel cart={cart} dispatch={dispatch} />}
        </div>
      </div>
    </div>
  );
}

export default App;
