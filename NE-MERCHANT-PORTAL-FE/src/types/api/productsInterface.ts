import { GetProductsInterface, Product } from "../ui/productsInterfaces";
import { ResponseInterface } from "./responseInterface";

export interface GetProductsPayload {
  activeDate?: string;
  category?: string;
  offset?: number;
  limit?: number;
  name?: string;
  partyCode?: string;
  status?: string;
  type?: string;
}
export interface GetProductsResponse
  extends ResponseInterface<GetProductsInterface> {}

export interface CreateProductPayload {
  BankBIC: string;
  BankIBAN: string;
  BankName: string;
  Category: string;
  Description: string;
  EndDate: string; // Consider using Date if you want to parse the string to a Date object
  NameAr: string;
  NameEn: string;
  StartDate: string; // Consider using Date if you want to parse the string to a Date object
  Type: string;
  logo: string;
  partyCode: string;
  productCode: string;
  status: string;
}

export interface EditProductPayload {
  BankBIC?: string;
  BankIBAN?: string;
  BankName?: string;
  Category?: string;
  Description?: string;
  EndDate?: string; // Consider using Date if you want to parse the string to a Date object
  NameAr?: string;
  NameEn?: string;
  StartDate?: string; // Consider using Date if you want to parse the string to a Date object
  Type?: string;
  logo?: string;
  partyCode?: string;
  productCode?: string;
  status?: string;
  productId?: string;
}
export interface CreateProductResponse extends ResponseInterface<Product> {}

export interface EditProductResponse extends ResponseInterface<Product> {}

export interface GetProductPayload {
  productCode: string | undefined;
}
export interface GetProductResponse
  extends ResponseInterface<{
    productRes: {
      BankName: string;
      BankBIC: string;
      Category: string;
      Description: string;
      productId: string;
      BankIBAN: string;
      EndDate: string;
      StartDate: string;
      Type: string;
      productCode: string;
      NameEn: string;
      partyCode: string;
      logo: string;
      AccountRoutingNumber: string;
      BankAccountNumber: string;
      events: {
        StartDate: string;
        Status: string;
        eventCode: string;
        eventId: number;
        Description: string;
        NameEn: string;
        EndDate: string;
        NameAr: string;
      }[];
      NameAr: string;
      status: string;
    };
  }> {}
