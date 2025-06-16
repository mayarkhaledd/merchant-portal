export interface ResponseInterface<Data> {
  status: number;
  data: Data;
  header?: {
    requestId: string;
    status: {
      code: string | number;
      details: string;
      subErrors?: {
        code: string | number;
        details: string;
      }[];
    };
  };
}
