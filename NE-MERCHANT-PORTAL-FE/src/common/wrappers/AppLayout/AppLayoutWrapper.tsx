import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayoutWrapper = ({ children }: AppLayoutProps) => {
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  useEffect(() => {
    const userLanguage = localStorage.getItem("userLanguage") || "en";
    const isArabic = userLanguage === "ar";

    // Set document direction
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    setDirection(isArabic ? "rtl" : "ltr");

    // Set language in i18n
    i18n.changeLanguage(userLanguage);
  }, [i18n]);

  return (
    <div dir={direction} lang={localStorage.getItem("userLanguage") || "en"}>
      {children}
    </div>
  );
};
