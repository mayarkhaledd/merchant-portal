import { GetSourceSystemResponse } from "@ejada/types/api/systemInterface";

export function adaptGetSystems(res: GetSourceSystemResponse) {
  return {
    ...res.data,
    status: res.status,
  };
}
