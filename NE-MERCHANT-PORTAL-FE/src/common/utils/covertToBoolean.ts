export const convertToBoolean = (value: string): boolean => {
  if (value.toLocaleUpperCase() === "Y" || value.toLocaleLowerCase() === "true")
    return true;
  //add code to handle "y","n" to true ,false for isloyalty
  if (
    value.toLocaleUpperCase() === "N" ||
    value.toLocaleLowerCase() === "false"
  )
    return false;
  return true;
};
