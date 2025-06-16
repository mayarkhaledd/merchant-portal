import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AppRoutes } from "@ejada/navigation";
import { HTTPCookies } from "@ejada/common";

interface ProtectedRouteInterface {
  component: ComponentType;
  login?: boolean;
  isOtpPage?: boolean;
}

export function ProtectedRoute({
  component: Component,
  login,
  isOtpPage,
}: ProtectedRouteInterface) {
  const otpVerified = Cookies.get(HTTPCookies.otpVerified) === "1";
  const otpStatus = Cookies.get(HTTPCookies.otpValidationStatus) === "Y";
  const isLoggedIn = otpVerified && otpStatus;
  const hasOtpReference = Boolean(Cookies.get(HTTPCookies.otpReferenece));
  const accessToken = Cookies.get(HTTPCookies.token);

  // If user is fully logged in and tries to access login or OTP page, redirect to dashboard
  if (isLoggedIn && (login || isOtpPage)) {
    return <Navigate to={AppRoutes.dashboard} replace />;
  }

  // If user tries to access OTP page without an OTP reference or access token, redirect to login
  if (isOtpPage && (!hasOtpReference || !accessToken)) {
    return <Navigate to={AppRoutes.login} replace />;
  }

  // If user tries to access OTP page without having an OTP reference (i.e., not logged in first)
  if (isOtpPage && !hasOtpReference) {
    return <Navigate to={AppRoutes.login} />;
  }

  // If user is not logged in and tries to access protected route, redirect to login
  if (!isLoggedIn && !login && !isOtpPage) {
    return <Navigate to={AppRoutes.login} replace />;
  }

  // If we reach here, either:
  // 1. User is logged in and accessing protected route (allow access)
  // 2. User is not logged in and accessing login page (allow access)
  // 3. User has OTP reference and accessing OTP page (allow access)
  return <Component />;
}
