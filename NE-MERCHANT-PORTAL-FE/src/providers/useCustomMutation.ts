import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface MutationFnType<Payload, Response> {
  (data: Payload): Promise<Response>;
}

export function useCustomMutation<Payload, Response>(
  mutationFn: MutationFnType<Payload, Response>,
  onSuccess?: (data: Response) => void,
): {
  mutate: (data: Payload) => void;
  data: Response | undefined;
  isPending: boolean;
  isError: boolean;
  error: AxiosError | null;
  isSuccess: boolean;
  reset: () => void;
} {
  const { mutate, data, isPending, isError, error, isSuccess, reset } =
    useMutation<Response, AxiosError, Payload>({
      mutationFn: (data: Payload) => mutationFn(data),
      onSuccess: onSuccess as (data: Response) => void,
      retry: 0,
    });

  return { mutate, data, isPending, isError, error, isSuccess, reset };
}
