import React from "react";
import ReactDOM from "react-dom";
import rootComponent from "./App";
// Note that SingleSpaContext is a react@16.3 (if available) context that provides the singleSpa props
import singleSpaReact from "single-spa-react";

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent,
  errorBoundary(err, info, props) {
    // https://reactjs.org/docs/error-boundaries.html
    return <div>This renders when a catastrophic error occurs</div>;
  },
});

export const { bootstrap, mount, unmount } = reactLifecycles;
