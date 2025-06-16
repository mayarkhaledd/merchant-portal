export interface PartyInterface {
  allowRedeem: string;
  partyStatus: string;
  allowEarn: string;
  partyCode: string;
  partyName: string;
  isAutoReconciled: string;
  partyLogo: string;
}
export interface PartyDetailsInterface {
  data: {
    data: {
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
        category: string;
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
        category: string;
        pointPrice: number;
        status: string;
        city: string;
        address: string;
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
    };
  };
}

export interface PartySiteInterface {
  partySiteCode: string;
  partySiteName: string;
  partySiteAddressType: string;
  partySiteType: string;
  partySiteStatus: string;
}
export interface PartySiteDetailsInterface {}
