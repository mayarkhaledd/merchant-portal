import * as yup from "yup";
import { passwordRegexPattern } from "@ejada/common/utils";
export const SetNewPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("New Password is required")
    .matches(
      passwordRegexPattern,
      "Password must include at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long",
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .matches(
      passwordRegexPattern,
      "Password must include at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long",
    )
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});
