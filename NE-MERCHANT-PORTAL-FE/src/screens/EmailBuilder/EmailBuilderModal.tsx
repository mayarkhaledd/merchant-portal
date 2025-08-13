import React, { useState, useRef, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { emailConstants } from "./Email.constants";
import { getParamValue } from "../Whatsapp";
import { GetSystemParamsInterface } from "@ejada/types/api/whatsappInterface";
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

  const params = systemParamsData?.params || [];
  const emailBuilderUrl = systemParamsData
    ? getParamValue(params, emailConstants.emailBuilderUrl)
    : "";
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
        },
      };
    } else {
      message = {
        type: "LOAD_TEMPLATE",
        payload: {
          templateName: templateName || "New Template",
          method: "blank",
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

  // Load template when conditions are met
  useEffect(() => {
    if (open && isEditorReady && !hasLoadedTemplate) {
      const loadTimer = setTimeout(() => {
        sendLoadTemplateMessage();
      }, 1500);
      return () => clearTimeout(loadTimer);
    }
  }, [
    open,
    isEditorReady,
    hasLoadedTemplate,
    savedDocument,
    initialTemplate,
    rawJson,
    templateName,
  ]);

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
            payload: { message: "Parent iframe loaded" },
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
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      const { type, payload } = event.data || {};

      switch (type) {
        case "EDITOR_READY":
          setIsLoading(false);
          setIsEditorReady(true);
          break;

        case "TEMPLATE_LOADED":
          // Template loaded successfully - no status message needed
          break;

        case "TEMPLATE_SAVED":
          if (!payload) {
            console.error("No payload in TEMPLATE_SAVED message");
            alert("Error: No data received from editor");
            return;
          }

          const { html, document: savedDocument } = payload;

          if (html && savedDocument) {
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
          break;

        default:
          break;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [open, onSave]);

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
        payload: { templateName: templateName.trim() },
      },
      "*",
    );
  };

  if (!open) return null;

  return (
    <div className="h-full relative">
      <div className="mb-4">
        <TextField
          label="Template Name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          size="small"
          variant="outlined"
          required
          className="mb-4 border-primary-blue text-primary-blue"
          fullWidth
          placeholder="Enter template name..."
        />
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Loading Email Builder...</p>
            <p className="text-sm text-gray-600 mt-2">
              Please wait while the editor initializes
            </p>
          </div>
        </div>
      )}

      {/* Iframe Container */}
      <iframe
        ref={iframeRef}
        src={emailBuilderUrl}
        onLoad={handleIframeLoad}
        style={{
          width: "100%",
          height: "calc(100% - 120px)",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          display: "block",
        }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        title="Email Builder"
      />

      {/* Action Buttons */}
      <div className="mt-4 pb-2 flex justify-end gap-2">
        <Button
          onClick={onClose}
          variant="outlined"
          size="small"
          className="bg-white border-[2px] border-primary-blue text-primary-blue hover:bg-blue-light"
        >
          Cancel
        </Button>
        <Button
          className="ml-4 bg-primary-blue hover:bg-primary-dark text-white"
          variant="contained"
          onClick={handleSave}
          disabled={!isEditorReady || !templateName.trim()}
          size="small"
        >
          Save Template
        </Button>
      </div>
    </div>
  );
};
