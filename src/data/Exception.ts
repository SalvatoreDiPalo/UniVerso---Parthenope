import { WrapperAxiosError } from "./WrapperAxiosError";

export class Exception extends Error {
  axiosError?: WrapperAxiosError;

  constructor(m: string, axiosError?: WrapperAxiosError) {
    super(m);
    this.axiosError = axiosError;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, Exception.prototype);
  }
}
