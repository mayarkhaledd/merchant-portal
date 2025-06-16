import { ResponseInterface } from "./responseInterface";

export interface PartyCodeData {
  organizationName: string;
  partyCode: string;
}
export interface Party {
  allowRedeem: string;
  partyStatus: string;
  allowEarn: string;
  partyCode: string;
  partyName: string;
  isAutoReconciled: string;
  partyLogo: string;
}
export interface OtherLoyaltyProgram {
  otherLoyaltyRecognitionList: {
    schemaCode: string;
    tierName: string;
    tierCode: string;
    otherLoyaltyRecognitionId: number;
  }[];
  otherLoyaltyProgramId: string;
  partyCode: string;
  name: string;
  status: string;
}

export interface GetPartyCodeListResponse
  extends ResponseInterface<{
    PartyCodes: PartyCodeData[];
  }> {}

export interface GetPartiesPayload {
  name?: string;
  status?: string;
  type?: string;
  category?: string;
  classification?: string;
  directRedemption?: string;
  isCharity?: string;
  limit: number;
  offset: number;
}
export interface GetPartiesResponse
  extends ResponseInterface<{ parties: Party[] }> {}

export interface CreatePartyPayload {
  allowEarn: string;
  allowRedeem: string;
  billingInfo: {
    bankAccountNo: string;
    bankBIC: string;
    bankIban: string;
    bankName: string;
    billingBusinessCategory: string;
    billingPeriodUnit: string;
    billingStartDate: string;
    billingType: string;
    crNum: string;
    tin: string;
  };
  classification: string;
  contracts: {
    billingDiscount: number;
    contractCopy: string;
    contractEndDate: string;
    contractName: string;
    contractStartDate: string;
    redemptionEndDate: string;
    redemptionStartDate: string;
  }[];
  description: string;
  directRedemption: string;
  earningPointPrice: number;
  email: string;
  isAutoReconciled: string;
  isCharity: string;
  isProgramOwner: string;
  logoSFLId: string;
  maxAllowedEarnPoints: number;
  maxTransactionValue: number;
  memberPortalVisibility: string;
  minAllowedRedeemPoints: number;
  name: string;
  nameAr: string;
  partyCode: string;
  pointPrice: number;
  pointsPendingPeriod: number;
  redemptionPointPrice: number;
  returnPeriod: number;
  type: string;
  vat: number;
}

export interface CreatePartyResponse
  extends ResponseInterface<{
    partyId: number | string;
  }> {}

export interface GetOtherLoyaltyProgramsPayload {
  partyCode?: string;
  loyaltyProgramId?: string;
}

export interface GetOtherLoyaltyProgramsResponse
  extends ResponseInterface<{
    otherLoyaltyProgram: OtherLoyaltyProgram;
  }> {}

export interface GetPartyManagementRequestsPayload {
  requestCheckerId?: string;
  requestMakerId?: string;
  requestStatus?: string;
  requestType?: string;
}

export interface GetPartyManagementRequestsResponse
  extends ResponseInterface<{
    otherLoyaltyProgram: OtherLoyaltyProgram;
    PartyRequests: {
      requestCheckerId: string;
      requestType: string;
      payload: string;
      requestAction: string;
      partyRequestId: number;
      rejectionReason: string;
      requestOperation: string;
      requestMakerId: string;
      requestStatus: string;
    }[];
  }> {}

export interface GetPartyDetailsPayload {
  partyCode: string;
  includeLocations: string;
}

export interface GetPartyDetailsResponse
  extends ResponseInterface<{
    partyWithLocations: {
      directRedemption: string;
      redemptionPointPrice: number;
      redemptionEndDate: string;
      description: string;
      contracts: (null | {
        contractCopy: string;
        redemptionEndDate: string;
        contractStartDate: string;
        contractEndDate: string;
        contractId: string;
        redemptionStartDate: string;
        billingDiscount: number;
        contractName: string;
      })[];
      type: string;
      billingPeriodUnit: string;
      maxAllowedEarnPoints: number;
      returnPeriod: number;
      allowRedeem: string;
      memberPortalVisibility: string;
      earningPointPrice: number;
      partyId: string;
      email: string;
      nameAr: string;
      allowEarn: string;
      contractStartDate: string;
      contractEndDate: string;
      vat: number;
      isAutoReconciled: string;
      minAllowedRedeemPoints: number;
      classification: string;
      pointEarnThreshold: number;
      billingStartDate: string;
      isCharity: string;
      maxTransactionValue: number;
      logoSFLId: string;
      partyCode: string;
      name: string;
      pointsPendingPeriod: number;
      redemptionStartDate: string;
      isProgramOwner: string;
      locations: {
        locationStatus: string;
        address: {
          country: string;
          city: string;
          latitude: number;
          postalCd: string;
          phoneNum: string;
          apartmentNum: string;
          house: string;
          addressId: number;
          mobileNum: string;
          street: string;
          additionalInfo: string;
          countryName: string;
          fax: string;
          region: string;
          email: string;
          longitude: number;
        };
        locationLanguages: {
          locationNameLanguageId: number;
          langCode: string;
          value: string;
        }[];
        locationId: string;
        siteParticipatingInLoyalty: string;
        additionalInfo: string;
        locationWorkingHours: {
          LocationWorkingHourId: number;
          closeTime: {
            date: number;
            hours: number;
            seconds: number;
            month: number;
            timezoneOffset: number;
            year: number;
            minutes: number;
            time: number;
            day: number;
          };
          day: string;
        }[];
        locationType: string;
        locationAttributes: {
          locationAttributeId: number;
          code: string;
          value: string;
        }[];
        locationCode: string;
        locationManager: string;
        pointsLimitPerTransaction: number;
      }[];
      pointPrice: number;
      contacts: (null | {
        address: string;
        contactStatus: string;
        contactId: string;
        phone: string;
        name: string;
        fax: string;
        email: string;
      })[];
    };
    party: {
      directRedemption: string;
      redemptionPointPrice: number;
      redemptionEndDate: string;
      description: string;
      contracts: {
        contractCopy: string;
        redemptionEndDate: string;
        contractStartDate: string;
        contractEndDate: string;
        contractId: string;
        redemptionStartDate: string;
        billingDiscount: number;
        contractName: string;
      }[];
      type: string;
      billingPeriodUnit: string;
      maxAllowedEarnPoints: number;
      returnPeriod: number;
      allowRedeem: string;
      memberPortalVisibility: string;
      earningPointPrice: number;
      partyId: string;
      email: string;
      nameAr: string;
      allowEarn: string;
      contractStartDate: string;
      contractEndDate: string;
      vat: number;
      isAutoReconciled: string;
      minAllowedRedeemPoints: number;
      classification: string;
      pointEarnThreshold: number;
      billingStartDate: string;
      isCharity: string;
      maxTransactionValue: number;
      billingInfo: {
        billingBusinessCategory: string;
        billingInfoId: string;
        billingType: string;
        bankBIC: string;
        tin: string;
        bankAccountNo: string;
        bankIban: string;
        bankName: string;
        billingPeriodUnit: string;
        billingStartDate: string;
        crNum: string;
      };
      logoSFLId: string;
      partyCode: string;
      name: string;
      pointsPendingPeriod: number;
      redemptionStartDate: string;
      isProgramOwner: string;
      pointPrice: number;
      city: string;
      contacts: {
        address: string;
        contactStatus: string;
        contactId: string;
        phone: string;
        name: string;
        fax: string;
        email: string;
      }[];
    };
  }> {}

export interface GetPartyOtherLoyaltyProgramsPayload {
  partyCode?: string;
}
export interface GetPartyOtherLoyaltyProgramsResponse
  extends ResponseInterface<{
    otherLoyaltyPrograms: {
      otherLoyaltyRecognitionList: {
        schemaCode: string;
        tierName: string;
        tierCode: string;
        id: string;
      }[];
      name: string;
      id: string;
      status: string;
    }[];
  }> {}

export interface UpdatePartyPendingRequestsPayload {
  requestId: string;
  action?: string;
  rejectionReason?: string;
}
export interface UpdatePartyPendingRequestsResponse
  extends ResponseInterface<{
    partyBaseDetails: {
      directRedemption: string;
      redemptionPointPrice: number;
      redemptionEndDate: string;
      description: string;
      type: string;
      billingPeriodUnit: string;
      returnPeriod: number;
      memberPortalVisibility: string;
      earningPointPrice: number;
      partyId: string;
      email: string;
      contractStartDate: string;
      contractEndDate: string;
      vat: number;
      classification: string;
      pointEarnThreshold: string;
      billingStartDate: string;
      isCharity: string;
      logoSFLId: string;
      partyCode: string;
      name: string;
      redemptionStartDate: string;
      pointPrice: number;
      status: string;
    };
  }> {}

export interface UpdatePartyPayload {
  partyCode?: string;
  allowEarn: string;
  allowRedeem: string;
  classification: string;
  description: string;
  directRedemption: string;
  earningPointPrice: number;
  email: string;
  isAutoReconciled: string;
  isCharity: string;
  isProgramOwner: string;
  logoSFLId: string;
  maxAllowedEarnPoints: number;
  maxTransactionValue: number;
  memberPortalVisibility: string;
  minAllowedRedeemPoints: number;
  name: string;
  nameAr: string;
  partyBillingInfo: {
    bankAccountNo: string;
    bankBIC: string;
    bankIban: string;
    bankName: string;
    billingBusinessCategory: string;
    billingPeriodUnit: string;
    billingStartDate: string;
    billingType: string;
    crNum: string;
    tin: string;
  };
  partyContract: {
    billingDiscount: number;
    contractCopy: string;
    contractEndDate: string;
    contractName: string;
    contractStartDate: string;
    redemptionEndDate: string;
    redemptionStartDate: string;
  };
  pointPrice: number;
  pointsPendingPeriod: number;
  redemptionPointPrice: number;
  returnPeriod: number;
  type: string;
  vat: number;
}

export interface UpdatePartyResponse extends ResponseInterface<object> {}

export interface CreatePartySitePayload {
  additionalInfo: string;
  address: {
    additionalInfo: string;
    apartmentNum: string;
    city: string; //req
    country: string; //req
    countryName: string;
    email: string;
    house: string;
    mobileNum: string;
    phoneNum: string;
    postalCd: string;
    street: string; //req
  };
  locationAttributes: {
    code: string; //req
    value: string; //req
  }[];
  locationCode: string; //req
  locationLanguages: {
    langCode: string; //req
    value: string; //req
  }[];
  locationManager: string; //req

  locationStatus: string; //req
  locationType: string; //req
  locationWorkingHours: {
    CloseTime: string; //req
    OpenTime: string; //req
    locationWorkingDays: string; //req
  }[];
  partyCode: string; //req
  siteParticipatingInLoyalty: string; //req
}

export interface CreatePartySiteResponse
  extends ResponseInterface<{
    locationId: number | string;
  }> {}

export interface PartySite {
  locationStatus: string;
  address: {
    country: string;
    city: string;
    latitude: number;
    postalCd: string;
    phoneNum: string;
    apartmentNum: string;
    house: string;
    addressId: number;
    mobileNum: string;
    street: string;
    additionalInfo: string;
    countryName: string;
    fax: string;
    region: string;
    email: string;
    longitude: number;
  };
  locationLanguages: {
    langCode: string;
    id: number;
    value: string;
  }[];
  locationWokringHours: {
    closeTime: string;
    id: number;
    openTime: string;
    day: string;
  }[];
  siteParticipatingInLoyalty: string;
  additionalInfo: string;
  locationType: string;
  locationAttributes: {
    code: string;
    id: number;
    value: string;
  }[];
  id: number;
  locationCode: string;
  locationManager: string;
  party: {
    partyCode: string;
    partyName: string;
    partyId: number;
  };
}
export interface GetPartySitesPayload {
  city?: string;
  locationCode?: string;
  locationName?: string;
  partyCode?: string;
  status?: string;
}

export interface GetPartySitesResponse
  extends ResponseInterface<{ locations: PartySite[] }> {}

export interface PartySiteDetails {
  locationStatus: string;
  address: {
    country: string;
    city: string;
    latitude: number;
    postalCd: string;
    phoneNum: string;
    apartmentNum: string;
    house: string;
    addressId: number;
    mobileNum: string;
    street: string;
    additionalInfo: string;
    countryName: string;
    fax: string;
    region: string;
    email: string;
    longitude: number;
  };
  locationLanguages: {
    langCode: string;
    locationNameLanguageId: number;
    value: string;
  }[];
  locationWokringHours: {
    closeTime: {
      date: number;
      day: number;
      hours: number;
      minutes: number;
      month: number;
      seconds: number;
      time: number;
      timezoneOffset: number;
      year: number;
    };
    LocationWorkingHourId: number;
    openTime: {
      date: number;
      day: number;
      hours: number;
      minutes: number;
      month: number;
      seconds: number;
      time: number;
      timezoneOffset: number;
      year: number;
    };
    day: string;
  }[];
  siteParticipatingInLoyalty: string;
  additionalInfo: string;
  locationType: string;
  locationAttributes: {
    code: string;
    locationAttributeId: number;
    value: string;
  }[];
  locationId: string;
  locationCode: string;
  locationManager: string;
  pointsLimitPerTransaction: number;
}
export interface GetPartySiteDetailsPayload {
  locationCode: string;
}

//need updates in Details response
export interface GetPartySiteDetailsResponse
  extends ResponseInterface<{ location: PartySiteDetails }> {}

export interface CreateUpdatePartySitePayload {
  locationCode?: string; //required
  additionalInfo: string;
  address: {
    country: string; //req
    city: string; //req
    unitNumber: string; //pattern
    phoneNum: string; //
    street: string; //
    additionalInfo: string; //
    buildingNumber: string; //
    email: string; // pattern
    addressType: string; //(WS/PB/HM)pattern
    postalCd: string; //
    mobileNum: string; //pattern
    countryName: string; //
  };
  locationAttributes: {
    code: string; //
    value: string; //
  }[];
  partyCode: string; //req

  locationManager: string; //

  locationStatus: string; //pattern(O/C/D)
  locationType: string; // pattern(Store/Online/Head Office)
  locationWorkingHours: {
    closeTime: string; //
    day: string; //pattern (Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday)
    openTime: string; //pattern(09:00)
  }[];
  siteParticipatingInLoyalty: string; // pattern(Y/N)
}

export interface UpdatePartySiteResponse extends ResponseInterface<object> {}

export interface DeletePartySitePayload {
  locationCode: string;
}

export interface DeletePartySiteResponse extends ResponseInterface<object> {}
