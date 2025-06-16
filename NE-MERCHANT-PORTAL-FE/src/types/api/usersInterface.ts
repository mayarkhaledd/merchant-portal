import { GetUsersInterface } from "../ui/userInterfaces";
import { ResponseInterface } from "./responseInterface";
import { RoleInterface } from "@ejada/types";
export interface UserData {
  OTPFlag: string;
  firstName: string;
  firstNameAr: string;
  jobTitle: string;
  lastLoginTimestamp: string;
  lastName: string;
  lastNameAr: string;
  mobileNum: string;
  otpflag: string;
  partyId: string;
  password: string;
  phoneNum: string;
  userEmail: string;
  userId: string;
  userName: string;
  userStatus: string;
  userType: string;
  userlang: string;
}
export interface UserPayload {
  userId: string;
}
export interface UserResopnse extends ResponseInterface<{ userId: string }> {}

export interface NewPasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface NewPasswordResponse
  extends ResponseInterface<{ data: ResetPassawordResponseInterface }> {}

export interface GetUserByIDPayload {
  userId: string;
  detailsMode: string;
}

export interface GetUserByIDResponse
  extends ResponseInterface<{
    user: {
      firstName: string;
      firstNameAr: string;
      groupsList: {
        groupCd: string;
        groupDesc: string;
        groupStatus: string;
        id: number;
        rolesList: {
          id: number;
          roleCd: string;
          roleDesc: string;
          rolePermissions: string;
          roleStatus: string;
        }[];
      }[];
      jobTitle: string;
      lastLoginTimestamp: string;
      lastName: string;
      lastNameAr: string;
      mobileNum: string;
      partyId: string;
      phoneNum: string;
      rolesList: {
        id: number;
        roleCd: string;
        roleDesc: string;
        rolePermissions: string;
        roleStatus: string;
      }[];
      userEmail: string;
      userId: string;
      userName: string;
      userStatus: string;
      userStatusReason: string;
      userType: string;
      userlang: string;
    };
  }> {}

export interface GetUsersPayload {
  partyCode?: string | number | string[] | number[];
  userStatus?: string | number | string[] | number[];
  offset: number;
  limit: number;
  userEmail?: string;
  userName?: string;
  registrationDate?: string | Date;
}

export interface GetUsersResponse
  extends ResponseInterface<GetUsersInterface> {}

export interface CreateUserPayload {
  firstName: string;
  firstNameAr: string;
  jobTitle: string;
  lastName: string;
  lastNameAr: string;
  mobileNum: string;
  phoneNum: string;
  partyId: string;
  userEmail: string;
  userId: string;
  userName: string;
  userlang: string;
}

export interface CreateUserResponse
  extends ResponseInterface<{
    userId: string;
  }> {}

export interface InitResetPasswordPayload {
  passResetMethod: string;
  passResetMethodvalue: string;
}

export interface InitResetPasswordResponse extends ResponseInterface<void> {}

export interface SearchUsersPayload {
  userEmail?: string;
  userName?: string;
  userStatus?: string;
  partyCode?: string;
  creationDate?: string;
}

export interface SearchUsersResspnse
  extends ResponseInterface<{
    userEmail: string;
    partyId: string;
    userName: string;
    userId: string;
  }> {}

export interface DeleteUserPayload {
  deletionReason: string;
  userId: string;
}

export interface DeleteUserResponse extends ResponseInterface<void> {}

export interface UpdateUserPayload {
  firstName?: string;
  firstNameAr?: string;
  jobTitle?: string;
  lastName?: string;
  lastNameAr?: string;
  mobileNum?: string;
  phoneNum?: string;
  partyId?: string;
  userEmail?: string;
  userId?: string;
  userName?: string;
  userlang?: string;
  userStatus?: string;
  userStatusReason?: string;
}
export interface UpdateUserResponse extends ResponseInterface<void> {}

export interface GetGroupUsersPayload {
  groupId: string;
}
export interface GetGroupUsersResponse
  extends ResponseInterface<{
    users: {
      lastName: string;
      userLang: string;
      userStatus: string;
      organizationName: string;
      userStatusReason: string;
      jobTitle: string;
      groupsList: {
        groupDesc: string;
        rolesList: string;
        groupStatus: string;
        id: number;
        groupCd: string;
      }[];
      phoneNum: string;
      userName: string;
      userId: string;
      lastLoginTimestamp: string;
      firstName: string;
      mobileNum: string;
      rolesList: RoleInterface[];
      lastNameAr: string;
      firstNameAr: string;
      userEmail: string;
      userType: string;
      partyId: string;
    }[];
  }> {}

export interface ResetPassawordResponseInterface {
  rqUID: string;
  statusCode: string;
  statusDesc: string;
  debugId: string;
  statusDtls: string[];
  success: boolean;
}
