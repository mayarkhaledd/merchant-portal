import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { parseAxiosError, QueryCosntant } from "@ejada/common";

export function useCustomQuery<Payload, Response, DataInterface>(
  queryKey: (number | QueryCosntant)[] | string,
  queryFn: (data: Payload) => Promise<Response>,
  onSuccess?: (data: Response) => DataInterface,
  enabled?: boolean,
): {
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
  isSuccess: boolean;
  updatedData: DataInterface | null;
  isFetched: boolean;
  isStale: boolean;
  refetch?: () => void;
} {
  const [updatedData, setUpdatedData] = useState<DataInterface | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
    isFetched,
    isStale,
  } = useQuery<
    Response,
    AxiosError
    // @ts-expect-error unkonwn type for queryFn
  >({ queryKey: [queryKey], queryFn: queryFn, enabled: enabled });

  // Handle success callback

  useEffect(() => {
    if (data && onSuccess) {
      // @ts-expect-error unknown data type
      const updatedData = onSuccess(data);
      setUpdatedData(updatedData);
    }
  }, [isSuccess, data]);

  // Handle error callback
  useEffect(() => {
    if (error) [parseAxiosError(error)];
  }, [isError, error]);

  return {
    updatedData,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
    isFetched,
    isStale,
  };
}
