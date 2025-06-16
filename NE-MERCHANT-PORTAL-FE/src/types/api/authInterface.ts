import { ResponseInterface } from "./responseInterface";

export interface LoginPayload {
  password: string;
  email: string;
}
export interface AuthPayload {
  loginName: string;
  password: string;
}
export interface VerifyTokenPayload {
  token: string;
  functionCd?: string;
}
export interface logoutPayload {
  rqUID: string;
  statusCode: string;
  statusDesc: string;
  debugId?: string;
  statusDtls?: string[];
  success?: boolean;
}

export interface AuthUserInterfaceData {
  tenant: Tenant;
  appTypes: AppType[];
  User: User;
  subscriptionId: string;
  token: string;
  refreshToken: string;
  otpReference: string;
}

export interface Tenant {
  id: string;
  name: string;
}

export interface AppType {
  id: number;
  name: string;
  active: boolean;
}

export interface User {
  id: number;
  email: string;
  mobileNumber: string;
  language: string;
  arabicName: string;
  englishName: string;
}

export interface ReturnedObject {
  token: string;
  refreshToken: string;
  otpReferenece: number;
  loggedInUsrInfo: LoggedInUsrInfo;
}

export interface LoggedInUsrInfo {
  usrId: number | string;
  usrEnNm: string;
  usrArNm: string;
  email: string;
  mobileNo: string;
  loginname: string;
  usrLang: string;
  usrTypeCd: string;
  isAdmn: string;
  isLdap: string;
  usrSttsCd: string;
  menuList: string[];
  appActnList: string[];
  orgList: OrgList[];
}

export interface OrgList {
  orgId: number;
  orgEnNm: string;
  orgArNm: string;
  mainOrgId: string;
}

export interface ForgetPasswordPayload {
  passResetMethod: string;
  passResetMethodvalue: string;
}
export interface AuthResponseInterface
  extends ResponseInterface<AuthUserInterfaceData> {}
export interface VerifyResponse
  extends ResponseInterface<{ data: AuthUserInterfaceData }> {}

export interface ForgetPasswordResponse
  extends ResponseInterface<{ userId: string }> {}

export interface GenerateOtpPayload {
  userId: string;
  otpType?: "RegistrationToken" | "ResetOTP" | "Authentication";
}
export interface GenerateOtpResponse
  extends ResponseInterface<{
    otp: string;
  }> {}

export interface VerifyOtpPayload {
  email: string;
  purpose: string;
  otp: number;
  otpReference: string;
}

export interface VerifyOtpResponse
  extends ResponseInterface<Record<string, never>> {}

export interface logoutResponse extends ResponseInterface<logoutPayload> {}

export interface VerfityOtpReturnedObject {
  token: string;
  refreshToken: string;
  otpReferenece: number;
  loggedInUsrInfo: VerfityOtpLoggedInUsrInfo;
}

export interface VerfityOtpLoggedInUsrInfo {
  usrId: number;
  usrEnNm: string;
  usrArNm: string;
  email: string;
  mobileNo: string;
  loginname: string;
  usrLang: string;
  usrTypeCd: string;
  isAdmn: string;
  isLdap: string;
  usrSttsCd: string;
  menuList: string[];
  appActnList: string[];
  orgList: VerfityOtpOrgList[];
}

export interface VerfityOtpOrgList {
  orgId: number;
  orgEnNm: string;
  orgArNm: string;
  mainOrgId: string;
}

export interface VerifyTokenResponse {
  rqUID: string;
  statusCode: string;
  statusDesc: string;
  returnedObject: VerifyTokenReturnedObject;
  debugId: string;
  statusDtls: string[];
  success: boolean;
}

export interface VerifyTokenReturnedObject {
  tokenType: string;
  appUsrInfo: VerifyTokenAppUsrInfo;
  channelInfo: VerifyTokenChannelInfo;
}

export interface VerifyTokenAppUsrInfo {
  usrId: number;
  usrEnNm: string;
  usrArNm: string;
  email: string;
  mobileNo: string;
  loginname: string;
  usrLang: string;
  usrTypeCd: string;
  isAdmn: string;
  isLdap: string;
  usrSttsCd: string;
  mainOrgIds: string;
}

export interface VerifyTokenChannelInfo {
  channelCd: string;
  channelEnDesc: string;
  channelArDesc: string;
}

export interface refershTokenPayload {}
export interface refreshTokenResponse
  extends ResponseInterface<{
    returnedObject: {
      newToken: string;
      refreshToken: string;
    };
  }> {}
