import { PropsWithChildren } from "react";
import circles from "@ejada/common/assets/circlesBackdrop.svg";
import blueCircle from "@ejada/common/assets/blueCircle.svg";
import EjadaWhiteLogo from "@ejada/common/assets/EjadaWhiteLogo.svg";
export const BackGWithLogo = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center justify-start relative h-full min-h-[100vh]">
      <div className="absolute inset-0 z-0">
        <img className="w-full h-full object-cover" src={circles} />
      </div>
      <div className="relative flex ml-[45%] mt-[8%]">{children}</div>
      <div className="absolute  bottom-0 left-0 ">
        <img className=" w-[80%] " src={blueCircle} alt="Blue Circle" />
        <div className="absolute inset-0 pt-[21%] px-[5%] w-[80%]">
          <img src={EjadaWhiteLogo} alt="EJADA LOGO" />
          <p className="text-white font-readexProBold600 text-[48px] leading-[60px]  tracking-[-0.02em] font-semibold py-[7%]">
            Notifications Engine Merchant Portal
          </p>
          <p className="text-white font-readexProBold600 text-[18px] leading-[22.5px]">
            The Notifications Merchant Portal is a web application that
            simplifies managing notifications events and view notification feed,
            allowing employees to efficiently add events and send notifications.
          </p>
        </div>
      </div>
    </div>
  );
};
