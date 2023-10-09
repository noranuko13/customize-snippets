import { IAttr } from "../issues/attrs";

export class WarnNoTargetError extends Error {
  constructor(message: string, target: Element | IAttr | IAttr[]) {
    console.warn(message, target);
    super(message);
    this.name = "WarnNoTargetError";
  }
}
