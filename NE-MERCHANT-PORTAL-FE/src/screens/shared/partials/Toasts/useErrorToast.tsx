import { useEffect } from "react";
import { toast } from "react-toastify";
import { Notification } from "eds-react";
import { AxiosError } from "axios";

export function useErrorToast(
  isError: boolean,
  errorMessage: string,
  apiErrorMessage: string | AxiosError,
) {
  useEffect(() => {
    if (isError && errorMessage && apiErrorMessage) {
      toast.dark(
        <Notification
          title={errorMessage}
          body={apiErrorMessage as string}
          option="fail"
        />,
        {
          position: toast.POSITION.TOP_RIGHT,
        },
      );
    }
  }, [isError, errorMessage, apiErrorMessage]);
}
