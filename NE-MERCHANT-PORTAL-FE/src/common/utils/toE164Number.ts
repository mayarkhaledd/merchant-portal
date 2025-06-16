import { parsePhoneNumberFromString, E164Number } from 'libphonenumber-js';

export const toE164Number = (phone: string): E164Number | undefined => {
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber ? phoneNumber.number as E164Number : undefined;
};