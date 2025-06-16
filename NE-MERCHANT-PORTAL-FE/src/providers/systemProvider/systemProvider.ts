import {
  CreateSourceSystemPayload,
  CreateSourceSystemResponse,
  deleteSourceSystemPayload,
  DeleteSourceSystemResponse,
  GetSourceSystemInterface,
  GetSourceSystemPayload,
  GetSourceSystemResponse,
  UpdateSourceSystemPayload,
  UpdateSourceSystemResponse,
} from "@ejada/types/api/systemInterface";
import { useCustomMutation, useCustomQuery } from "..";
import { SystemService } from "@ejada/services/system.service";
import { adaptGetSystems } from "../adaptors/systemAdaptor";
import { QueryCosntant } from "@ejada/common";

export function useCreateSystem() {
  const onSuccess = (res: CreateSourceSystemResponse) => {
    return res.data;
  };
  return useCustomMutation<
    CreateSourceSystemPayload,
    CreateSourceSystemResponse
  >((data: CreateSourceSystemPayload) => {
    return SystemService.CreateSystem(data);
  }, onSuccess);
}
export function useUpdateSystem() {
  const onSuccess = (res: UpdateSourceSystemResponse) => {
    return res.data;
  };
  return useCustomMutation<
    UpdateSourceSystemPayload,
    UpdateSourceSystemResponse
  >((data: UpdateSourceSystemPayload) => {
    return SystemService.updateSystem(data);
  }, onSuccess);
}
export function useGetSystems(data: GetSourceSystemPayload, enabled?: boolean) {
  return useCustomQuery<
    GetSourceSystemPayload,
    GetSourceSystemResponse,
    GetSourceSystemInterface
  >(
    QueryCosntant.SYSTEM,
    () => {
      return SystemService.getSystems(data);
    },
    (data: GetSourceSystemResponse) => adaptGetSystems(data),
    enabled,
  );
}
export function useDeleteSourceSystemById() {
  const onSuccess = (res: DeleteSourceSystemResponse) => {
    const updatedData = res;
    return updatedData;
  };

  return useCustomMutation<
    deleteSourceSystemPayload,
    DeleteSourceSystemResponse
  >((data: deleteSourceSystemPayload) => {
    return SystemService.deleteSourceSystemById(data);
  }, onSuccess);
}
