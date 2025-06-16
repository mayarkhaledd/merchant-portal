import { ScreenTitleProps } from "./ScreenTitle.types";


export const ScreenTitle = ({ title }: ScreenTitleProps) => {
  return (
    <div className="flex justify-start items-center">
      <div className="bg-primary-blue w-1 h-8 me-4"></div>
      <h1 className=" font-readexProBold700 text-2xl ">{title}</h1>
    </div>
  );
};
