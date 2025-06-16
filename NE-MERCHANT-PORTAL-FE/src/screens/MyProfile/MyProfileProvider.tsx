import React from "react";
import { createContext } from "react";
import { MyProfileState } from "./MyProfile.types";
import { useMyProfile } from "@ejada/screens/MyProfile";
export const MyProfileContext = createContext<MyProfileState | undefined>(
  undefined,
);

export const MyProfileProvider: React.FC<{}> = ({}) => {
  const context = useMyProfile();
  return (
    <>
      <MyProfileContext.Provider
        value={{
          ...context,
        }}
      ></MyProfileContext.Provider>
    </>
  );
};
