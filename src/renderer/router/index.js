import React from "react";
import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./router";

function Index() {
  function LazyElement({ importFunc }) {
    const LazyComponent = lazy(importFunc);
    return (
      <Suspense fallback="渲染中">
        <LazyComponent />
      </Suspense>
    );
  }

  function dealRoutes(data, result = []) {
    data.forEach((router) => {
      if (router.element && typeof router.element == "function") {
        router.element = (
          <LazyElement key={router.path} importFunc={router.element} />
        );
      }
      if (router.children) {
        dealRoutes(router.children);
      }
      result.push(router);
    });

    return result;
  }

  return useRoutes(dealRoutes(routes));
}

export default Index;
