export interface Event {
  StartDate: string; // Consider using Date if you want to parse the string to a Date object
  Status: string;
  eventCode: string;
  eventId: number;
  Description: string;
  NameEn: string;
  EndDate: string;
  NameAr: string;
}

export interface Product {
  BankName: string;
  Category: string;
  Description: string;
  productId: string;
  BankIBAN: string;
  bankBIC: string;
  EndDate: string;
  StartDate: string;
  Type: string;
  productCode: string;
  NameEn: string;
  partyCode: string;
  logo: string;
  AccountRoutingNumber: string;
  BankAccountNumber: string;
  events: Event[];
  NameAr: string;
  status: string;
}

export interface GetProduct {
  BankName: string;
  Category: string;
  Description: string;
  productId: string;
  BankIBAN: string;
  BankBIC: string;
  EndDate: string;
  StartDate: string;
  Type: string;
  productCode: string;
  NameEn: string;
  partyCode: string;
  logo: string;
  AccountRoutingNumber: string;
  BankAccountNumber: string;
  events: Event[];
  NameAr: string;
  status: string;
}
export interface CreateProduct {
  BankName: string;
  Category: string;
  Description: string;
  productId: string;
  BankIBAN: string;
  BankBIC: string;
  EndDate: string;
  StartDate: string;
  Type: string;
  productCode: string;
  NameEn: string;
  partyCode: string;
  logo: string;
  NameAr: string;
  status: string;
}
export interface GetProductsInterface {
  status?: number;
  totalListSize?: number;
  products: Product[];
}
