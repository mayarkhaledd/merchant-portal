export const noSpecialCharRegex: RegExp = /[^\w\u0600-\u06FF\s]/gu;
export const specialCharRegex: RegExp = /[^\w\u0600-\u06FF\s-]/gu;
export const acceptNumberOnlyRegex: RegExp = /[^\d]/gu;
export const acceptArabicOnlyRegex: RegExp = /[^\u0600-\u06FF\s]/gu;
export const acceptEnglishOnlyRegex: RegExp = /[^\w\s]/gu;
export const emailRegexPattern =
  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
export const passwordRegexPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]).{8,}$/;
export const lettersAndNumbersPattern = /^(?=.*\p{L})(?=.*\d)[\p{L}\d\s]+$/u;
export const englishDescription: RegExp = /^(?=.*[A-Za-z])[A-Za-z0-9\s_]+$/;
export const arabicDescription: RegExp =
  /^(?=.*[\u0600-\u06FF])[\u0600-\u06FF\s0-9_!@#$%^&*(),.?":{}|<>-]+$/;
export const maxTenCharsPattern: RegExp = /^.{0,10}$/;
export const passwordRegexPatternEightCharacters = /^.{8,}$/;
export const namePattern = /^[\p{L}\s]+$/u; //for arabic and english characters
export const acceptOneNumberOnlyRegex: RegExp = /^[0-9]$/;
