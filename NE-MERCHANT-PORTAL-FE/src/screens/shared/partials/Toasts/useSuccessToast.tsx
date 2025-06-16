import { useEffect } from "react";
import { toast } from "react-toastify";
import { Notification } from "eds-react";

export function useSuccessToast(isSuccess: boolean, SuccessMessage: string) {
  useEffect(() => {
    if (isSuccess) {
      toast.dark(<Notification title={SuccessMessage} option="success" />, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [isSuccess]);
}
