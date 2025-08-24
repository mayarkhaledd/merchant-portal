import React, { useState, useRef, useEffect, useMemo } from "react";
import { Button, TextField } from "@mui/material";
import { emailConstants } from "./Email.constants";
import { getParamValue } from "../Whatsapp";
import { GetSystemParamsInterface } from "@ejada/types/api/whatsappInterface";
import { t } from "i18next";
import i18n from "@ejada/common/locals/i18n";

interface EmailBuilderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (htmlContent: string, documentData: any) => void;
  initialTemplate?: string;
  templateName: string;
  setTemplateName: (name: string) => void;
  savedDocument?: any;
  rawJson?: any;
  systemParamsData: GetSystemParamsInterface | null;
}

// Cookie utility functions
const getCookieValue = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

const getUserDataFromCookies = (): {
  userId: string;
  userName: string;
  userEmail: string;
  tenantId: string;
  tenantName: string;
  appTypeId: string;
  otpReference: string;
  otpValidationStatus: string;
  otpVerified: string;
  token?: string;
} => {
  return {
    userId: getCookieValue("userId") || "",
    userName: getCookieValue("userName") || "",
    userEmail: getCookieValue("userEmail") || "",
    tenantId: getCookieValue("tenantId") || "",
    tenantName: getCookieValue("tenantName") || "",
    appTypeId: getCookieValue("appTypeId") || "",
    otpReference: getCookieValue("otpReference") || "",
    otpValidationStatus: getCookieValue("otpValidationStatus") || "",
    otpVerified: getCookieValue("otpVerified") || "",
  };
};

// Generate a user-specific authentication token
const generateUserToken = (userData: any): string => {
  const tokenData = {
    userId: userData.userId,
    userName: userData.userName,
    userEmail: userData.userEmail,
    tenantId: userData.tenantId,
    tenantName: userData.tenantName,
    otpReference: userData.otpReference,
    timestamp: Date.now(),
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    sessionId: `${userData.userId}_${userData.tenantId}_${Date.now()}`,
  };

  // Encode the token (in production, you'd use proper JWT signing)
  return btoa(JSON.stringify(tokenData));
};

export const EmailBuilderModal: React.FC<EmailBuilderModalProps> = ({
  open,
  onClose,
  onSave,
  initialTemplate,
  templateName,
  setTemplateName,
  savedDocument,
  rawJson,
  systemParamsData,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [hasLoadedTemplate, setHasLoadedTemplate] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const isRtl = i18n.language === "ar";
  const params = systemParamsData?.params || [];
  const emailBuilderUrl = systemParamsData
    ? getParamValue(params, emailConstants.emailBuilderUrl)
    : "";

  // Get user data from cookies
  const userData = getUserDataFromCookies();

  // Generate authentication token and user permissions
  const userToken = userData.userId ? generateUserToken(userData) : null;
  const userPermissions = getUserPermissions(userData);
  const [sessionId] = useState(
    () => `${userData.userId}_${userData.tenantId}_${Date.now()}`,
  );

  // Function to determine user permissions based on cookie data
  function getUserPermissions(userData: any): string[] {
    const permissions = ["email_builder_access"];

    // Add permissions based on user data - accept either validation method
    const isVerified = userData.otpVerified === "1";
    const isValidated = userData.otpValidationStatus === "Y";

    if (isVerified || isValidated) {
      permissions.push("template_edit", "template_save");
    }

    if (isValidated) {
      permissions.push("template_delete", "advanced_features");
    }

    // Tenant-specific permissions
    if (userData.tenantId) {
      permissions.push("tenant_templates");
    }

    return permissions;
  }

  // Enhanced token validation function
  const validateUserToken = (token: string): any | null => {
    if (!token) {
      console.warn("No token provided");
      return null;
    }

    try {
      const decoded = JSON.parse(atob(token));

      // Validate token expiration
      if (decoded.expires < Date.now()) {
        console.warn("Token expired");
        return null;
      }

      // Validate against current cookie values
      const currentUserData = getUserDataFromCookies();

      if (decoded.userId !== currentUserData.userId) {
        console.warn("Token user mismatch");
        return null;
      }

      if (decoded.tenantId !== currentUserData.tenantId) {
        console.warn("Token tenant mismatch");
        return null;
      }

      // Validate otp status - accept either validation method
      const isValidated =
        currentUserData.otpValidationStatus === "Y" ||
        currentUserData.otpVerified === "1";
      if (!isValidated) {
        console.warn("User otp validation failed", {
          otpValidationStatus: currentUserData.otpValidationStatus,
          otpVerified: currentUserData.otpVerified,
        });
        return null;
      }

      // Return validated user data
      const validatedUserData = {
        userId: decoded.userId,
        userName: decoded.userName,
        userEmail: decoded.userEmail,
        tenantId: decoded.tenantId,
        tenantName: decoded.tenantName,
        otpReference: decoded.otpReference,
        permissions: getUserPermissions(currentUserData),
        tokenValid: true,
        sessionId: decoded.sessionId,
        timestamp: Date.now(),
      };
      return validatedUserData;
    } catch (error) {
      console.error("Token validation error:", error);
      return null;
    }
  };

  const getIframeUrl = () => {
    if (!emailBuilderUrl) return "";

    const url = new URL(emailBuilderUrl);

    if (userToken) {
      url.searchParams.set("token", userToken);
    }

    // Always set, even if empty string
    url.searchParams.set("userId", userData.userId || "");
    url.searchParams.set("userName", userData.userName || "");
    url.searchParams.set("userEmail", userData.userEmail || "");
    url.searchParams.set("tenantId", userData.tenantId || "");
    url.searchParams.set("tenantName", userData.tenantName || "");

    if (userData.otpReference) {
      url.searchParams.set("otpReference", userData.otpReference);
    }
    if (userData.otpValidationStatus) {
      url.searchParams.set("otpValidationStatus", userData.otpValidationStatus);
    }
    if (userData.otpVerified) {
      url.searchParams.set("otpVerified", userData.otpVerified);
    }
    if (userPermissions.length > 0) {
      url.searchParams.set("permissions", userPermissions.join(","));
    }

    url.searchParams.set("sessionId", sessionId);

    return url.toString();
  };

  // Validate rawJson structure
  const validateRawJson = (json: any): boolean => {
    if (!json || typeof json !== "object") return false;
    if (!json.root) return false;

    const childrenIds = json.root?.data?.childrenIds || [];
    const missingChildren = childrenIds.filter((id: string) => !json[id]);

    if (missingChildren.length > 0) {
      console.warn("Missing child blocks:", missingChildren);
    }

    return true;
  };

  // Send template data to iframe editor
  const sendLoadTemplateMessage = () => {
    if (
      !iframeRef.current?.contentWindow ||
      hasLoadedTemplate ||
      !isEditorReady
    ) {
      return;
    }

    let message: any = null;

    // Priority: savedDocument > rawJson > initialTemplate (HTML) > empty
    if (
      savedDocument &&
      typeof savedDocument === "object" &&
      Object.keys(savedDocument).length > 0 &&
      savedDocument.root
    ) {
      message = {
        type: "LOAD_TEMPLATE",
        payload: {
          document: savedDocument,
          templateName,
          method: "document",
          userContext: {
            userId: userData.userId,
            tenantId: userData.tenantId,
            sessionId: `${userData.userId}_${userData.tenantId}`,
          },
        },
      };
    } else if (
      rawJson &&
      typeof rawJson === "object" &&
      Object.keys(rawJson).length > 0
    ) {
      if (validateRawJson(rawJson)) {
        message = {
          type: "LOAD_TEMPLATE",
          payload: {
            json: rawJson,
            templateName,
            method: "json",
            userContext: {
              userId: userData.userId,
              tenantId: userData.tenantId,
              sessionId: `${userData.userId}_${userData.tenantId}`,
            },
          },
        };
      } else {
        // Create fallback for invalid JSON
        const fallbackJson = {
          root: {
            type: "EmailLayout",
            data: {
              backdropColor: "#FFFFFF",
              canvasColor: "#FFFFFF",
              textColor: "#333333",
              fontFamily: "GEOMETRIC_SANS",
              childrenIds: ["fallback_text_block"],
            },
          },
          fallback_text_block: {
            type: "Text",
            data: {
              style: {
                color: null,
                backgroundColor: null,
                fontSize: 16,
                fontFamily: null,
                fontWeight: "normal",
                textAlign: "center",
                padding: { top: 24, bottom: 24, left: 24, right: 24 },
              },
              props: {
                text: "Template could not be loaded properly. Please recreate your template.",
              },
            },
          },
        };

        message = {
          type: "LOAD_TEMPLATE",
          payload: {
            json: fallbackJson,
            templateName,
            method: "json",
            userContext: {
              userId: userData.userId,
              tenantId: userData.tenantId,
              sessionId: `${userData.userId}_${userData.tenantId}`,
            },
          },
        };
      }
    } else if (initialTemplate && initialTemplate.trim()) {
      message = {
        type: "LOAD_TEMPLATE",
        payload: {
          html: initialTemplate,
          templateName,
          method: "html",
          userContext: {
            userId: userData.userId,
            tenantId: userData.tenantId,
            sessionId: `${userData.userId}_${userData.tenantId}`,
          },
        },
      };
    } else {
      message = {
        type: "LOAD_TEMPLATE",
        payload: {
          templateName: templateName || "New Template",
          method: "blank",
          userContext: {
            userId: userData.userId,
            tenantId: userData.tenantId,
            sessionId: `${userData.userId}_${userData.tenantId}`,
          },
        },
      };
    }

    if (message) {
      try {
        iframeRef.current.contentWindow.postMessage(message, "*");
        setHasLoadedTemplate(true);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  const iframeUrl = useMemo(() => getIframeUrl(), [open]);

  // Load template when conditions are met
  useEffect(() => {
    if (open && isEditorReady && !hasLoadedTemplate) {
      sendLoadTemplateMessage();
      setHasLoadedTemplate(true);
    }
  }, [open, isEditorReady, hasLoadedTemplate]);

  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) {
      console.error("Iframe failed to load properly");
      return;
    }

    // Send test message to verify communication
    setTimeout(() => {
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          {
            type: "IFRAME_READY_TEST",
            payload: {
              message: "Parent iframe loaded",
              userContext: {
                userId: userData.userId,
                tenantId: userData.tenantId,
              },
            },
          },
          "*",
        );
      }
    }, 100);
  };

  // Reset state when modal opens/closes and handle messages from iframe
  useEffect(() => {
    if (!open) {
      setIsLoading(true);
      setIsEditorReady(false);
      setHasLoadedTemplate(false);
      setAuthError(null);
      return;
    }

    // Set a timeout for editor loading
    const editorTimeout = setTimeout(() => {
      if (isLoading && !isEditorReady) {
        console.error("Editor failed to load within timeout");
        setIsLoading(false);
        setAuthError(
          "Email builder failed to load. Please refresh and try again.",
        );
      }
    }, 15000); // 15 second timeout

    const handleMessage = (event: MessageEvent) => {
      // Verify origin for security
      if (emailBuilderUrl && event.origin !== new URL(emailBuilderUrl).origin) {
        console.warn("Message from unauthorized origin:", event.origin);
        return;
      }

      const { type, payload } = event.data || {};

      switch (type) {
        case "VALIDATE_TOKEN":
          // Handle token validation request from iframe
          const { token, requestId } = payload || {};
          const validatedUserData = validateUserToken(token);

          // Send validation result back to iframe
          if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
              {
                type: "TOKEN_VALIDATION_RESULT",
                requestId: requestId,
                isValid: !!validatedUserData,
                userData: validatedUserData,
                error: validatedUserData
                  ? null
                  : "Invalid or expired authentication token",
              },
              event.origin,
            );
          }
          break;

        case "EDITOR_READY":
          setIsLoading(false);
          setIsEditorReady(true);
          setAuthError(null);
          break;

        case "ACCESS_DENIED":
          // Handle access denied from iframe
          console.error("Access denied from email builder:", payload);
          setAuthError(payload?.message || "Access denied to email builder");
          setIsLoading(false);
          break;

        case "TEMPLATE_LOADED":
          // Template loaded successfully
          break;

        case "TEMPLATE_SAVED":
          if (!payload) {
            console.error("No payload in TEMPLATE_SAVED message");
            alert("Error: No data received from editor");
            return;
          }

          const { html, document: savedDocument } = payload;

          if (html && savedDocument) {
            // Add user context to saved data
            // const enhancedPayload = {
            //   ...payload,
            //   userContext: {
            //     userId: userData.userId,
            //     userName: userData.userName,
            //     tenantId: userData.tenantId,
            //     tenantName: userData.tenantName,
            //     timestamp: Date.now(),
            //   },
            // };

            onSave(html, savedDocument);
          } else {
            console.error("Missing html or document in save payload");
            alert(
              "Error: Incomplete template data received. Please try again.",
            );
          }
          break;

        case "ERROR":
          console.error("Received error from editor:", payload);
          setAuthError(
            payload?.message || "An error occurred in the email builder",
          );
          break;

        default:
          break;
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(editorTimeout);
    };
  }, [open, onSave, emailBuilderUrl, userData, isLoading, isEditorReady]);

  // Request save from iframe editor
  const handleSave = () => {
    if (!isEditorReady) {
      alert("Editor is not ready yet. Please wait a moment.");
      return;
    }

    if (!templateName.trim()) {
      alert("Please enter a template name before saving.");
      return;
    }

    iframeRef.current?.contentWindow?.postMessage(
      {
        type: "REQUEST_SAVE",
        payload: {
          templateName: templateName.trim(),
          userContext: {
            userId: userData.userId,
            userName: userData.userName,
            tenantId: userData.tenantId,
            tenantName: userData.tenantName,
          },
        },
      },
      "*",
    );
  };

  if (!open) return null;

  // Check authentication requirements
  if (!userData.userId || !userData.tenantId) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-6xl mb-4">🔒</div>
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-4">
            You need to be properly logged in to access the email builder.
            Missing user ID or tenant information.
          </p>
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </div>
      </div>
    );
  }

  // Check validation status - accept either otpValidationStatus='Y' OR otpVerified='1'
  const isValidated =
    userData.otpValidationStatus === "Y" || userData.otpVerified === "1";

  if (!isValidated) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-yellow-600 mb-4">
            Account Validation Required
          </h2>
          <p className="text-gray-600 mb-4">
            Your account needs to be validated before you can access the email
            builder. Please contact your administrator.
          </p>
          <div className="text-xs text-gray-500 mt-4 p-2 bg-gray-100 rounded">
            Debug: otpValidationStatus='{userData.otpValidationStatus}',
            otpVerified='{userData.otpVerified}'
          </div>
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-4">{authError}</p>
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      {/* User Context Display (for debugging - remove in production) */}
      <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
        <span className="font-semibold">User:</span> {userData.userName} (
        {userData.userId}) |<span className="font-semibold"> Tenant:</span>{" "}
        {userData.tenantName} ({userData.tenantId})
      </div>

      <div className="mb-4">
        <TextField
          label={t("email.template_name") || "Template Name"}
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          size="small"
          variant="outlined"
          required
          className="mb-4 border-primary-blue text-primary-blue"
          fullWidth
          placeholder={
            t("email.template_name_placeholder") || "Enter Template Name"
          }
          sx={{
            direction: isRtl ? "rtl" : "ltr",
            "& .MuiInputBase-input": {
              direction: isRtl ? "rtl" : "ltr",
              textAlign: isRtl ? "right" : "left",
              unicodeBidi: "plaintext",
            },
            "& .MuiInputLabel-root": {
              left: isRtl ? "auto" : "14px",
              right: isRtl ? "14px" : "auto",
              transformOrigin: isRtl ? "top right" : "top left",
            },
            "& .MuiInputLabel-shrink": {
              transform: isRtl
                ? "translate(-14px, -9px) scale(0.75)"
                : "translate(14px, -9px) scale(0.75)",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              textAlign: isRtl ? "right" : "left",
            },
            "& .MuiInputBase-input::placeholder": {
              textAlign: isRtl ? "right" : "left",
              direction: isRtl ? "rtl" : "ltr",
            },
          }}
        />
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg font-semibold">
              {t("email.loading_email_builder")}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Authenticating user: {userData.userName}
            </p>
          </div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={iframeUrl}
        onLoad={handleIframeLoad}
        style={{
          width: "100%",
          height: "calc(100% - 160px)",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          display: "block",
        }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        title={`${t("email.email_builder")} - ${userData.userName}`}
      />

      {/* Action Buttons */}
      <div className="mt-4 pb-2 flex justify-end gap-2">
        <Button
          onClick={onClose}
          variant="outlined"
          size="small"
          className="bg-white border-[2px] border-primary-blue text-primary-blue hover:bg-blue-light"
        >
          {t("email.cancel")}
        </Button>
        <Button
          className="ml-4 bg-primary-blue hover:bg-primary-dark text-white"
          variant="contained"
          onClick={handleSave}
          disabled={!isEditorReady || !templateName.trim()}
          size="small"
        >
          {t("email.save_template")}
        </Button>
      </div>
    </div>
  );
};
