import { UserAuthenticationService } from "@ejada/services";

import {
  logoutPayload,
  logoutResponse,
  AuthPayload,
  VerifyTokenPayload,
  VerifyTokenResponse,
  refreshTokenResponse,
  refershTokenPayload,
  AuthResponseInterface,
} from "@ejada/types";
import { useQueryClient } from "@tanstack/react-query";
import { adaptAuthData, useCustomMutation } from "@ejada/providers";
import Cookies from "js-cookie";
import { HTTPCookies } from "@ejada/common/constants";
import {
  ForgetPasswordPayload,
  ForgetPasswordResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
  NewPasswordPayload,
  NewPasswordResponse,
} from "@ejada/types";

export function useAuth() {
  const queryClient = useQueryClient();

  const onSuccess = (res: AuthResponseInterface) => {
    // Check if we have valid response data
    if (!res.data) {
      console.error("Invalid response data");
      return;
    }
    // Transfrom response to component data
    const updatedData = adaptAuthData(res);

    // Update User Cache
    queryClient.setQueryData(["userEn"], updatedData.data.User.englishName);
    queryClient.setQueryData(["userAr"], updatedData.data.User.arabicName);
    queryClient.setQueryData(["AppTypesBackup"], updatedData.data.appTypes);

    Cookies.set(
      HTTPCookies.appTypes,
      JSON.stringify(updatedData.data.appTypes),
    );

    try {
      Cookies.set(HTTPCookies.userID, updatedData.data.User.id.toString());
      Cookies.set(HTTPCookies.token, updatedData.data.token);
      Cookies.set(HTTPCookies.email, updatedData.data.User.email);
      Cookies.set(HTTPCookies.userName, updatedData.data.User.englishName);
      Cookies.set(HTTPCookies.otpReferenece, updatedData.data.otpReference);
      Cookies.set(HTTPCookies.tenantId, updatedData.data.tenant.id.toString());
      Cookies.set(HTTPCookies.tenantName, updatedData.data.tenant.name);
      Cookies.set(HTTPCookies.userNameArabic, updatedData.data.User.arabicName);
      const activeAppType = updatedData.data.appTypes.find(
        (appType) => appType.active === true,
      );
      if (activeAppType) {
        Cookies.set(HTTPCookies.appTypeId, activeAppType.id.toString());
      }
    } catch (error) {
      console.log("Error while setting cookies:", error);
    }
  };
  return useCustomMutation<AuthPayload, AuthResponseInterface>(
    (data: AuthPayload) => {
      event?.preventDefault();
      const updatedData = {
        loginName: data.loginName,
        password: data.password.toString(),
      };
      return UserAuthenticationService.authenticateUser(updatedData);
    },
    (response: AuthResponseInterface) => {
      onSuccess(response);
    },
  );
}

export function useVerifyToken() {
  return useCustomMutation<VerifyTokenPayload, VerifyTokenResponse>(
    UserAuthenticationService.verifyToken,
  );
}

export function useForgotPassword() {
  const queryClient = useQueryClient();
  const onSuccess = (res: ForgetPasswordResponse) => {
    // Transform response to component data
    const updatedData = adaptForgotPassword(res);

    // Update user
    queryClient.setQueryData(["user"], updatedData.userId);

    // Set uesrId as cookie
    Cookies.set(HTTPCookies.userID, updatedData.userId);
  };

  return useCustomMutation<ForgetPasswordPayload, ForgetPasswordResponse>(
    (data: ForgetPasswordPayload) => {
      return UserAuthenticationService.initPasswordReset(data);
    },
    onSuccess,
  );
}

export function useVerifyOtp() {
  const onSuccess = (data: VerifyOtpResponse) => {
    return data;
  };
  return useCustomMutation<VerifyOtpPayload, VerifyOtpResponse>(
    UserAuthenticationService.verifyOpt,
    onSuccess,
  );
}

export function useChangePassword() {
  return useCustomMutation<NewPasswordPayload, NewPasswordResponse>(
    (data: NewPasswordPayload) => {
      const updatedData = { ...data };
      return UserAuthenticationService.setNewPassword(updatedData);
    },
  );
}
export interface ForgotPasswordInterface {
  userId: string;
}
export function adaptForgotPassword(
  data: ForgetPasswordResponse,
): ForgotPasswordInterface {
  return {
    userId: data.data.userId,
  };
}

export function useLogout() {
  const onSuccess = (res: logoutResponse) => {
    const updatedData = res;
    return updatedData;
  };

  return useCustomMutation<logoutPayload, logoutResponse>(
    (data: logoutPayload) => {
      return UserAuthenticationService.logout(data);
    },
    onSuccess,
  );
}

export function useRefreshToken() {
  return useCustomMutation<refershTokenPayload, refreshTokenResponse>(
    (data: refershTokenPayload) => {
      return UserAuthenticationService.refershToken(data);
    },
  );
}
