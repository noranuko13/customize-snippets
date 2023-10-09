import { WarnNoTargetError } from "./errors";

export const handler = (fn: () => void) => {
  try {
    fn();
  } catch (e) {
    if (e instanceof WarnNoTargetError) {
      // Nothing
    } else {
      throw e;
    }
  }
};

export const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
