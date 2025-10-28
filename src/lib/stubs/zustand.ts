"use client";

import { useSyncExternalStore } from "react";

type StateCreator<T> = (
  set: (
    partial: Partial<T> | ((state: T) => Partial<T>),
    replace?: boolean,
  ) => void,
  get: () => T,
) => T;

export interface StoreApi<T> {
  getState: () => T;
  setState: (
    partial: Partial<T> | ((state: T) => Partial<T>),
    replace?: boolean,
  ) => void;
  subscribe: (listener: () => void) => () => void;
}

type UseStore<T> = {
  (): T;
  <U>(selector: (state: T) => U): U;
  getState: () => T;
  setState: StoreApi<T>["setState"];
  subscribe: StoreApi<T>["subscribe"];
};

const create = <T>(initializer: StateCreator<T>): UseStore<T> => {
  let state: T;
  const listeners = new Set<() => void>();

  const setState: StoreApi<T>["setState"] = (partial) => {
    const nextState =
      typeof partial === "function"
        ? (partial as (state: T) => Partial<T>)(state)
        : partial;
    state = { ...state, ...nextState };
    listeners.forEach((listener) => listener());
  };

  const getState = () => state;

  const subscribe: StoreApi<T>["subscribe"] = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  state = initializer(setState, getState);

  const useStore = (<U>(selector?: (state: T) => U) => {
    return useSyncExternalStore(subscribe, () =>
      selector ? selector(state) : (state as unknown as U),
    );
  }) as UseStore<T>;

  useStore.getState = getState;
  useStore.setState = setState;
  useStore.subscribe = subscribe;

  return useStore;
};

export default create;
