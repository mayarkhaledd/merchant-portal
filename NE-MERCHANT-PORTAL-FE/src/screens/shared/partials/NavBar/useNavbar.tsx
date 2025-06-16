import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { HTTPCookies } from "@ejada/common";
import { AppRoutes } from "@ejada/navigation";
import { useNavigate } from "react-router-dom";
import i18n from "@ejada/common/locals/i18n";
import { useAuth } from "@ejada/providers";

interface AppType {
  name: string;
  id: string;
  active: boolean;
}

export const useNavbar = () => {
  const { t } = useTranslation();
  const { data } = useAuth();
  const navigate = useNavigate();
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const appTypeDropdownRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const [showAppTypeDropdown, setShowAppTypeDropdown] =
    useState<boolean>(false);

  // State for tracking the selected option
  const [selectedOption, setSelectedOption] =
    useState<string>("Select App Type");
  const [selectedUserName, setSelectedUserName] =
    useState<string>("Select Username");
  const [appTypeMenu, setAppTypeMenu] = useState<AppType[]>(() => {
    const raw = Cookies.get(HTTPCookies.appTypes);
    return raw ? JSON.parse(raw) : [];
  });
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect handles setting tenant from data or cookie
    if (currentLanguage === "ar") {
      setSelectedUserName(Cookies.get(HTTPCookies.userNameArabic) || "");
    } else {
      setSelectedUserName(Cookies.get(HTTPCookies.userName) || "");
    }
  }, [data]);

  useEffect(() => {
    // This effect deals with the application type
    const selectedAppTypeId =
      Cookies.get(HTTPCookies.appTypeId.toString()) || appTypeMenu[0]?.id;
    const matchedAppType = appTypeMenu.find(
      (appType) => appType.id === selectedAppTypeId,
    );
    if (matchedAppType) {
      setSelectedOption(matchedAppType.name);
    }
  }, [appTypeMenu]);

  useEffect(() => {
    const selectedAppTypeId = Cookies.get(HTTPCookies.appTypeId.toString());

    if (selectedAppTypeId) {
      const matchedAppType = appTypeMenu.find(
        (appType) => appType.id.toString() === selectedAppTypeId,
      );
      if (matchedAppType) {
        setSelectedOption(matchedAppType.name);
      } else {
        // No matching app type found; handle as incorrect value
        handleInvalidCookie();
      }
    } else {
      // No cookie found; set default
      setDefaultAppType();
    }
  }, [data, appTypeMenu]);

  const setDefaultAppType = () => {
    const selectedAppTypeId = Cookies.get(HTTPCookies.appTypeId.toString());
    const matched = appTypeMenu.find((app) => app.id === selectedAppTypeId);
    if (matched) {
      setSelectedOption(matched.name);
    } else if (appTypeMenu.length > 0) {
      Cookies.set(HTTPCookies.appTypeId, appTypeMenu[0].id);
      setSelectedOption(appTypeMenu[0].name);
    }
  };

  const handleInvalidCookie = () => {
    if (appTypeMenu.length > 0) {
      setSelectedOption(appTypeMenu[0].name);
      Cookies.set(HTTPCookies.appTypeId, appTypeMenu[0].id);
    } else {
      // Set an empty array or handle the case when there are no app types available
      console.error("No app types available to set.");
    }
  };

  const handleSelectedOption = (id: string) => {
    const selectedAppType = appTypeMenu.find((appType) => appType.id === id);

    if (!selectedAppType) {
      console.warn("App type not found:", id);
      return;
    }

    // Save app type ID in cookie (force string)
    Cookies.set(HTTPCookies.appTypeId, selectedAppType.id.toString());

    // Update selected option immediately
    setSelectedOption(selectedAppType.name);

    // Update the AppTypeMenu active state
    const updatedAppTypes = appTypeMenu.map((appType) => ({
      ...appType,
      active: appType.id === selectedAppType.id,
    }));
    setAppTypeMenu(updatedAppTypes);

    setShowAppTypeDropdown(false);
    window.location.reload();
  };

  // Toggle dropdown visibility
  const toggleAppTypeDropdown = () => {
    setShowLanguageDropdown(false);
    setShowAppTypeDropdown((prev) => !prev);
  };

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown((prev) => !prev);
    setShowUserDropdown(false);
    setShowAppTypeDropdown(false);
  };

  // Close dropdowns if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target as Node)
    ) {
      setShowAppTypeDropdown(false);
      setShowLanguageDropdown(false);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("userLanguage", lng);
    setShowLanguageDropdown(false);
    setCurrentLanguage(lng);
    window.location.reload();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogOutClick = () => {
    Cookies.remove(HTTPCookies.token);
    Cookies.remove(HTTPCookies.refreshToken);
    localStorage.removeItem("sessionDate");
    Cookies.remove(HTTPCookies.tenantId);
    Cookies.remove(HTTPCookies.appTypeId);
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove(HTTPCookies.userID);
    Cookies.remove(HTTPCookies.userName);
    Cookies.remove(HTTPCookies.userNameArabic);
    Cookies.remove(HTTPCookies.email);
    Cookies.remove(HTTPCookies.otpReferenece);
    Cookies.remove(HTTPCookies.tenantName);
    Cookies.remove(HTTPCookies.appTypeId);
    Cookies.remove(HTTPCookies.tenantId);
    Cookies.remove(HTTPCookies.appTypeId);
    Cookies.remove(HTTPCookies.tenantName);
    Cookies.remove(HTTPCookies.appTypes);
    Cookies.remove(HTTPCookies.otpVerified);
    Cookies.remove(HTTPCookies.otpValidationStatus);

    navigate(AppRoutes.login);
  };

  return {
    t,
    currentLanguage,
    showUserDropdown,
    showLanguageDropdown,
    userDropdownRef,
    showAppTypeDropdown,
    toggleAppTypeDropdown,
    appTypeDropdownRef,
    navbarRef,
    toggleLanguageDropdown,
    changeLanguage,
    handleLogOutClick,
    selectedOption,
    setSelectedOption,
    appTypeMenu,
    handleSelectedOption,
    selectedUserName,
    languageDropdownRef,
  };
};
