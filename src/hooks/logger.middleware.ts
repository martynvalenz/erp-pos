import type { StateCreator, StoreMutatorIdentifier } from "zustand";

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string,
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f /* name */) => (set, get, store) => {
  type T = ReturnType<typeof f>;
  const loggedSet: typeof set = (
    state: T | Partial<T> | ((state: T) => T | Partial<T>),
    replace?: boolean,
  ) => {
    set(state, replace as false | undefined);
  };
  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;
