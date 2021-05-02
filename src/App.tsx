import React, { useReducer, useState } from "react";
import "./App.css";
import { Product, Route } from "./typing/common";

import { Tabs } from "./components/UI/Tabs";

import { Homepage } from "./components/App/Homepage";
import { CartPanel } from "./components/App/CartPanel";
import { ProductsContainer } from "./components/Products/Products";
import { defaultStore, reducer } from "./utils/appReducer";

function App() {
  const [route, setRoute] = useState<Route>("home");

  const [store, dispatch] = useReducer(reducer, defaultStore);

  const { productsList, cart } = store;

  function handleSubmit(products: Product[]) {
    dispatch({
      type: "ADD_TO_CART",
      value: products,
    });
  }

  return (
    <div className="App">
      <Tabs activeTab={route} onTabSelect={setRoute} />
      <div data-testid="page-container">
        {route === "home" && <Homepage />}
        {route === "products_list" && (
          <ProductsContainer products={productsList} onSubmit={handleSubmit} />
        )}
        {route === "cart" && <CartPanel cart={cart} dispatch={dispatch} />}
      </div>
    </div>
  );
}

export default App;
