import { DeleteComponent } from "../PopUp/Delete";
import {
  DeleteComponentProps,
  PopupProps,
} from "@ejada/screens/shared/partials/PopUp/PopupIntefaces";

export const ContextPopup = ({
  option,
  ...props
}: PopupProps & { option: string }) => {
  switch (option) {
    case "delete":
      return <DeleteComponent {...(props as DeleteComponentProps)} />;

    default:
      return null;
  }
};
