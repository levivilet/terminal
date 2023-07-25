import * as Id from "../Id/Id.js";

export const state = {
  callbacks: Object.create(null),
};

export const registerPromise = () => {
  const id = Id.create();
  const promise = new Promise((resolve) => {
    state.callbacks[id] = resolve;
  });
  return {
    id,
    promise,
  };
};

export const resolve = (id, value) => {
  const callback = state.callbacks[id];
  if (!callback) {
    throw new Error(`callback not found`);
  }
  callback(value);
  delete state.callbacks[id];
};
