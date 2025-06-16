import { AuthResponseInterface } from "@ejada/types";

export function adaptAuthData(data: AuthResponseInterface) {
  return {
    ...data,
  };
}
