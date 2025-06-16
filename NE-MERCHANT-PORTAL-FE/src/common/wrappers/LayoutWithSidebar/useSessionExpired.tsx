import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@ejada/navigation";
import { useRefreshToken } from "@ejada/providers";
import { HTTPCookies } from "@ejada/common";
interface data {
  returnedObject: { newToken: string; newRefreshToken: string };
}
export function useSessionExpired() {
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [accessToken, setAccessToken] = useState(() =>
    Cookies.get(HTTPCookies.token),
  );
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Call mutation function of handle refreshToken
  const { mutate } = useRefreshToken();

  useEffect(() => {
    if (!accessToken) return;

    try {
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      const exp = payload.exp; // Expiration time in seconds (Unix timestamp)

      const expirationDate = exp * 1000;

      const timeRemaining = expirationDate - Date.now();

      if (timeRemaining <= 0) {
        Cookies.remove(HTTPCookies.token);

        setIsSessionExpired(true);
        return;
      }

      const timer = setTimeout(() => {
        Cookies.remove(HTTPCookies.token);

        setIsSessionExpired(true);
      }, timeRemaining);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }, [accessToken]);

  useEffect(() => {
    if (isSessionExpired) {
      startForceLogoutTimer();
    } else {
      clearForceLogoutTimer();
    }

    return () => clearForceLogoutTimer();
  }, [isSessionExpired]);

  const handleLogout: () => void = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    Cookies.remove(HTTPCookies.token);
    Cookies.remove(HTTPCookies.refreshToken);
    Cookies.remove(HTTPCookies.appTypeId);
    navigate(AppRoutes.login);
  };

  const handleExtend = () => {
    const refershToken = Cookies.get(HTTPCookies.refreshToken);

    // Prepare payload for the mutation
    const payload = {
      refreshToken: refershToken,
    };

    // @ts-expect-error Expected 1 argument, but got 2.
    mutate(payload, {
      onSuccess: (result: data) => {
        const tokenData = result ? result?.returnedObject : "";
        const newAccessToken = tokenData ? tokenData?.newToken : "";
        const newRefreshToken = tokenData ? tokenData?.newRefreshToken : "";
        // Update cookies
        Cookies.set(HTTPCookies.token, newAccessToken);
        Cookies.set(HTTPCookies.refreshToken, newRefreshToken);

        // Update state
        setAccessToken(newAccessToken);
        setIsSessionExpired(false);
        clearForceLogoutTimer();
      },
      onError: () => {
        // Clear tokens and mark session as expired
        console.log("error");
        Cookies.remove(HTTPCookies.token);
        Cookies.remove(HTTPCookies.refreshToken);
        Cookies.remove(HTTPCookies.appTypeId);
        setIsSessionExpired(true);
        navigate(AppRoutes.login);
      },
    });
  };

  const startForceLogoutTimer = () => {
    timeoutRef.current = setTimeout(() => {
      Cookies.remove(HTTPCookies.token);
      Cookies.remove(HTTPCookies.refreshToken);
      Cookies.remove(HTTPCookies.appTypeId);
      navigate(AppRoutes.login);
    }, 10000); // 10 seconds = 10000
  };

  const clearForceLogoutTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return {
    isSessionExpired,
    handleLogout,
    startForceLogoutTimer,
    clearForceLogoutTimer,
    handleExtend,
  };
}
