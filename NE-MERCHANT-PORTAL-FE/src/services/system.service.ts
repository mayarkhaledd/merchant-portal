import {
  CreateSourceSystemPayload,
  CreateSourceSystemResponse,
  deleteSourceSystemPayload,
  DeleteSourceSystemResponse,
  GetSourceSystemPayload,
  GetSourceSystemResponse,
  UpdateSourceSystemPayload,
  UpdateSourceSystemResponse,
} from "@ejada/types/api/systemInterface";
import httpClient from "./httpClient";
import { API } from "@ejada/common";
//import Cookies from "js-cookie";

export const SystemService = {
  CreateSystem: async (
    data: CreateSourceSystemPayload,
  ): Promise<CreateSourceSystemResponse> => {
    const response = await httpClient.post(API.createSystem, data);
    return {
      ...response.data,
    };
  },
  updateSystem: async (
    data: UpdateSourceSystemPayload,
  ): Promise<UpdateSourceSystemResponse> => {
    const response = await httpClient.put(
      `${API.createSystem}/${data.id}`,
      data,
    );
    return {
      ...response.data,
    };
  },
  getSystems: async (
    data: GetSourceSystemPayload,
  ): Promise<GetSourceSystemResponse> => {
    // const Payload = {
    //   tenantId: Cookies.get("tenantId")
    //     ? (Cookies.get("tenantId") as string)
    //     : " ",
    // };

    // if (!Payload.tenantId.trim()) {
    //   throw new Error("Invalid or missing cookie values");
    // }

    const response = await httpClient.get(API.createSystem, {
      params: {
        ...data,
        // ...Payload
      },
    });
    return {
      ...response.data,
    };
  },
  deleteSourceSystemById: async (
    data: deleteSourceSystemPayload,
  ): Promise<DeleteSourceSystemResponse> => {
    const response = await httpClient.delete(`${API.createSystem}/${data.id}`);
    return {
      status: response.status,
      ...response.data,
    };
  },
};
