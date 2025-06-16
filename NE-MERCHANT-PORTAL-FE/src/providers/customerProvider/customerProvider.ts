import { useCustomQuery } from "@ejada/providers";
import {
  adaptCreateUpdateCustomer,
  adaptGetCustomer,
  adaptGetCustomers,
} from "@ejada/providers/adaptors/customerAdaptor";
import { CustomerService } from "@ejada/services/customer.service";
import {
  CreateCustomerPayload,
  UpdateCustomerPayload,
  CreateCustomerResponse,
  UpdateCustomerResponse,
  CustomerInterface,
  CustomerStatusPayload,
  CustomerStatusResponse,
  DeleteCustomerPayload,
  DeleteCustomerResponse,
  GetCustomerPayload,
  GetCustomerResponse,
  GetCustomersInterface,
  GetCustomersPayload,
  GetCustomersResponse,
} from "@ejada/types/api/customerManagementInterface";
import { QueryCosntant } from "@ejada/common";
import { useCustomMutation } from "../useCustomMutation";

export function useGetCustomers(data: GetCustomersPayload, enabled?: boolean) {
  return useCustomQuery<
    GetCustomersPayload,
    GetCustomersResponse,
    GetCustomersInterface
  >(
    [QueryCosntant.CUSTOMERS, data.limit as number, data.offset as number],
    () => {
      return CustomerService.getCustomers(data);
    },
    (data: GetCustomersResponse) => adaptGetCustomers(data),
    enabled,
  );
}

export function useCreateCustomer() {
  const onSuccess = (res: CreateCustomerResponse) => {
    const updatedData = adaptCreateUpdateCustomer(res);
    return updatedData;
  };
  return useCustomMutation<CreateCustomerPayload, CreateCustomerResponse>(
    (data: CreateCustomerPayload) => {
      return CustomerService.createCustomer(data);
    },
    onSuccess,
  );
}

export function useUpdateCustomer() {
  const onSuccess = (res: UpdateCustomerResponse) => {
    const updatedData = adaptCreateUpdateCustomer(res);
    return updatedData;
  };
  return useCustomMutation<UpdateCustomerPayload, UpdateCustomerResponse>(
    (data: UpdateCustomerPayload) => {
      return CustomerService.updateCustomer(data);
    },
    onSuccess,
  );
}

export function useDeleteCustomer() {
  const onSuccess = (res: DeleteCustomerResponse) => {
    const updatedData = res;
    return updatedData;
  };
  return useCustomMutation<DeleteCustomerPayload, DeleteCustomerResponse>(
    (data: DeleteCustomerPayload) => {
      return CustomerService.deleteCustomer(data);
    },
    onSuccess,
  );
}

export function useGetCustomer(data: GetCustomerPayload, enabled?: boolean) {
  return useCustomQuery<
    GetCustomerPayload,
    GetCustomerResponse,
    CustomerInterface
  >(
    QueryCosntant.CUSTOMER,
    () => {
      return CustomerService.getCustomer(data);
    },
    (data: GetCustomerResponse) => adaptGetCustomer(data),
    enabled,
  );
}

export function useUpdateCustomerStatus() {
  const onSuccess = (res: CustomerStatusResponse) => {
    return res.status;
  };
  return useCustomMutation<CustomerStatusPayload, CustomerStatusResponse>(
    (data: CustomerStatusPayload) => {
      return CustomerService.updateCustomerStatus(data);
    },
    onSuccess,
  );
}
