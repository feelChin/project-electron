import { useState } from "react";

export const FakeReducer = (reducer, initialState = {}) => {
  const [state, setState] = useState(initialState);
  const dispatch = (action) => {
    setState(reducer(state, action));
  };
  return [state, dispatch];
};
