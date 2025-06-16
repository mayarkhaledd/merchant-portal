import React, { useState, useEffect } from "react";
import vectorIcon from "@ejada/common/assets/Vector.png";
import helpCircleIcon from "@ejada/common/assets/help-circle-filled.png";
import CloseIcon from "@ejada/common/assets/close.png";
import failedIcon from "@ejada/common/assets/FailedIcon.png";
import alertIcon from "@ejada/common/assets/alertIcon.svg";
import infoIcon from "@ejada/common/assets/infoToastIcon.svg";
interface NotificationProps {
  option?: "success" | "fail" | "pending" | "caution" | "info";
  title?: string;
  body?: string;
  primaryButtonLabel?: string;
  primaryCallback?: () => void;
  secondaryButtonLabel?: string;
  secondaryCallback?: () => void;
}
export const DrawerNotification: React.FC<NotificationProps> = ({
  title,
  body,
  option,
  primaryButtonLabel,
  primaryCallback,
  secondaryButtonLabel,
  secondaryCallback,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  let icon;
  let bgColor;
  switch (option) {
    case "pending":
      icon = helpCircleIcon;
      bgColor = "bg-neutrals/N6";
      break;
    case "fail":
      icon = failedIcon;
      bgColor = "bg-error-bg";
      break;
    case "success":
      icon = vectorIcon;
      bgColor = "bg-light-green";
      break;
    case "caution":
      icon = alertIcon;
      bgColor = "bg-caution-bg";
      break;
    case "info":
      icon = infoIcon;
      bgColor = "bg-blue-info";
      break;
    default:
      icon = helpCircleIcon;
      bgColor = "bg-neutrals/N6";
  }

  return (
    visible && (
      <div
        className={`${bgColor} text-black font-readexProRegular pt-4 pb-4 px-4 rounded-[7px] w-full gap-3 notification`}
        style={{ zIndex: 1000 }} // Add z-index here
      >
        <div className="flex justify-between items-center">
          <div>
            <img src={icon} alt="Icon" className="inline-block mr-2" />
            <p className="text-base font-readexProSemiBold600 ml-1 mb-2 inline-block">
              {title}
            </p>
          </div>
          <button
            className="  top-4 right-0 w-[24px] text-black"
            onClick={handleClose}
          >
            <img src={CloseIcon} className="w-6" alt="Close Icon" />
          </button>
        </div>
        <p className="ml-9 text-sm">{body}</p>
        {primaryButtonLabel && !secondaryButtonLabel ? (
          <div className="flex right-0 gap-[10px] justify-end">
            <button
              onClick={primaryCallback ? () => primaryCallback() : () => {}}
            >
              {primaryButtonLabel}
            </button>
          </div>
        ) : primaryButtonLabel && secondaryButtonLabel ? (
          <div className="flex flex-row right-0 justify-end gap-[10px]">
            <button
              onClick={secondaryCallback ? () => secondaryCallback() : () => {}}
              className="px-2 pb-0 font-readexProMedium500"
            >
              {secondaryButtonLabel}
            </button>
            <button
              onClick={primaryCallback ? () => primaryCallback() : () => {}}
              className="px-2 pb-0 font-readexProMedium500"
            >
              {primaryButtonLabel}
            </button>
          </div>
        ) : null}
      </div>
    )
  );
};
