import httpClient from "./httpClient";
import { API } from "@ejada/common/constants";
import {
  AuthResponseInterface,
  ForgetPasswordPayload,
  ForgetPasswordResponse,
  VerifyTokenPayload,
  VerifyOtpResponse,
  AuthPayload,
  NewPasswordPayload,
  NewPasswordResponse,
  VerifyOtpPayload,
  logoutPayload,
  logoutResponse,
  VerifyTokenResponse,
  refershTokenPayload,
  refreshTokenResponse,
} from "@ejada/types";
import { HTTPCookies } from "eds-react";
import Cookies from "js-cookie";

export const UserAuthenticationService = {
  authenticateUser: async (
    data: AuthPayload,
  ): Promise<AuthResponseInterface> => {
    const response = await httpClient.post(API.authenticateUser, data);
    const res = {
      status: response.status,
      ...response.data,
    };
    return res;
  },
  verifyToken: async (
    data: VerifyTokenPayload,
  ): Promise<VerifyTokenResponse> => {
    const response = await httpClient.post(API.verifyToken, data, {
      headers: {
        ...httpClient.defaults.headers.common,
        "USER-ID": Cookies.get(HTTPCookies.userID),
      },
    });
    return {
      status: response.status,
      ...response.data,
    };
  },
  initPasswordReset: async (
    data: ForgetPasswordPayload,
  ): Promise<ForgetPasswordResponse> => {
    const response = await httpClient.post(API.changePassword, data);
    return {
      status: response.status,
      ...response.data,
    };
  },
  setNewPassword: async (
    data: NewPasswordPayload,
  ): Promise<NewPasswordResponse> => {
    const response = await httpClient.post(API.changePassword, data);
    return {
      status: response.status,
      ...response.data,
    };
  },
  verifyOpt: async (data: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
    const response = await httpClient.post(API.verifyOtp, data);
    return {
      status: response.status,
      ...response.data,
    };
  },
  logout: async (data: logoutPayload): Promise<logoutResponse> => {
    const response = await httpClient.post(API.logout, data);
    return {
      status: response.status,
      ...response.data,
    };
  },
  refershToken: async (
    data: refershTokenPayload,
  ): Promise<refreshTokenResponse> => {
    const response = await httpClient.post(API.refershToken, data);
    return {
      status: response.status,
      ...response.data,
    };
  },
};
