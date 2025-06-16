import {
  CreateCustomerPayload,
  UpdateCustomerPayload,
  CreateCustomerResponse,
  UpdateCustomerResponse,
  CustomerStatusPayload,
  CustomerStatusResponse,
  DeleteCustomerPayload,
  DeleteCustomerResponse,
  GetCustomerPayload,
  GetCustomerResponse,
  GetCustomersPayload,
  GetCustomersResponse,
} from "@ejada/types/api/customerManagementInterface";
import httpClient from "./httpClient";
import { API } from "@ejada/common";

export const CustomerService = {
  getCustomers: async (
    data: GetCustomersPayload,
  ): Promise<GetCustomersResponse> => {
    const response = await httpClient.get(API.customers, {
      params: { ...data },
    });
    return {
      ...response.data,
    };
  },

  createCustomer: async (
    data: CreateCustomerPayload,
  ): Promise<CreateCustomerResponse> => {
    const response = await httpClient.post(API.customers, data);
    return {
      ...response.data,
    };
  },

  updateCustomer: async (
    data: UpdateCustomerPayload,
  ): Promise<UpdateCustomerResponse> => {
    const response = await httpClient.put(
      `${API.customers}/${data.customerId}`,
      data,
    );
    return {
      ...response.data,
    };
  },

  deleteCustomer: async (
    data: DeleteCustomerPayload,
  ): Promise<DeleteCustomerResponse> => {
    const response = await httpClient.delete(
      `${API.customers}/${data.customerId}`,
    );
    return {
      status: response.status,
      ...response.data,
    };
  },
  //get a customer by id
  getCustomer: async (
    data: GetCustomerPayload,
  ): Promise<GetCustomerResponse> => {
    const response = await httpClient.get(
      `${API.customers}/${data.customerId}`,
    );
    return {
      ...response.data,
    };
  },
  updateCustomerStatus: async (
    data: CustomerStatusPayload,
  ): Promise<CustomerStatusResponse> => {
    const response = await httpClient.patch(
      `${API.customers}/${data.customerId}/status`,
      { activeFlag: data.activeFlag },
    );
    return {
      status: response.status,
      ...response.data,
    };
  },
};
