import React from "react";
import { ErrorFallbackProps } from "./ErrorBoundary.types";
import { Banner } from "eds-react";
import { useTranslation } from "react-i18next";

export const ErrorFallback: React.FC<ErrorFallbackProps> = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full h-full grid place-items-center">
      <Banner
        link="/"
        bannerColor={"bg-error"}
        text={t("eventsManagement.something_wrong")}
      />
    </div>
  );
};
