import { ErrorInterface } from "@ejada/types";
import { AxiosError } from "axios";

export function parseAxiosError(error: AxiosError): ErrorInterface {
  const status = error.status
    ? error.status
    : error.response?.status && error.response.status;
  return {
    statusCode: status || 0,
    message: error.message,
  };
}
