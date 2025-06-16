export interface UserInterface {
  lastName: string;
  userStatus: string;
  organizationName: string;
  groupsList: {
    groupDesc: string;
    rolesList: string;
    groupStatus: string;
    id: number;
    groupCd: string;
  }[];
  userName: string;
  userId: string;
  lastLoginTimestamp: string;
  firstName: string;
  lastNameAr: string;
  userOTPStatus: string;
  registrationDate: string;
  firstNameAr: string;
  userEmail: string;
  userType: string;
}
export interface GroupUsersInterface {
  lastName: string;
  userLang?: string;
  userStatus: string;
  organizationName: string;
  userStatusReason?: string;
  jobTitle?: string;
  groupsList?: {
    groupDesc: string;
    rolesList: string;
    groupStatus: string;
    id: number;
    groupCd: string;
  }[];
  phoneNum?: string;
  userName: string;
  userId: string;
  lastLoginTimestamp?: string;
  firstName: string;
  mobileNum?: string;
  rolesList?: {
    roleCd: string;
    roleDesc: string;
    rolePermissions: string;
    Id: number;
    roleStatus: string;
  }[];
  lastNameAr?: string;
  firstNameAr?: string;
  userEmail?: string;
  userType: string;
  partyId?: string;
}
export interface GroupUsersTableDataInterface {
  userName: string;
  userId: string;
  nameEn: string;
  organization: string;
  type: string;
  status: string;
}
export interface GroupUsersData {}

export interface UserDetailsInterface {
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
  rolesList: {
    roleCd: string;
    roleDesc: string;
    rolePermissions: string;
    Id: number;
    roleStatus: string;
  }[];
  lastNameAr: string;
  firstNameAr: string;
  userEmail: string;
  userType: string;
  partyId: string;
}
export interface GetUserByIdInterface {
  user: UserDetailsInterface;
}
export interface GetUsersInterface {
  status?: number;
  totalListSize?: number;
  users: UserInterface[];
}

export interface GetUserByIDInterface {
  status?: number;
  data: {
    user: {
      userName: string;
      firstName: string;
      firstNameAr: string;
      lastName: string;
      lastNameAr: string;
      jobTitle: string;
      lastLoginTimestamp: string;
      mobileNum: string;
      partyId: string;
      phoneNum: string;
      userEmail: string;
      userId: string;
      userStatus: string;
      userStatusReason: string;
      userType: string;
      rolesList: {
        id: number;
        roleCd: string;
        roleDesc: string;
        rolePermissions: string;
        roleStatus: string;
      }[];
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
    };
  };
}

export interface SearchUserInterface {
  email: string;
  partyID: string;
  userName: string;
  userID: string;
}

export interface CreateUserInterface {
  userID: string;
}

export interface PartyCodeInterface {
  organizationName: string;
  partyCode: string;
}
export interface EventStatusInterface {
  eventCode: string;
  eventStatus: string;
}
// export interface GetEventsInteface {
//   productEvents: ProductEvent[];
// }
export interface GetGroupUsersInterface {
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
    rolesList: {
      roleCd: string;
      roleDesc: string;
      rolePermissions: string;
      Id: number;
      roleStatus: string;
    }[];
    lastNameAr: string;
    firstNameAr: string;
    userEmail: string;
    userType: string;
    partyId: string;
  }[];
}
