import { useEffect } from "react";
import html2canvas from "html2canvas";
import { EmailBuilderModal } from "./EmailBuilderModal";
import { convertHtmlToEditorConfig } from "./htmlToEditorConfig";
import { useSuccessToast } from "../shared";
import { t } from "i18next";
import { useGetSystemParams } from "@ejada/providers";
import { useEmailBuilder } from "./useEmailBuilder";
import { EmailTemplate } from "@ejada/types/api/emailInterface";
import { ContextPopup } from "../shared/partials/PopUp/ContextPopup";

export default function EmailBuilder() {
  const { updatedData: systemParamsData, refetch: refetchSystemParamsData } =
    useGetSystemParams({}, false);

  // Use the email builder hook
  const {
    templates,
    editingTemplate,
    isLoading,
    isBuilderOpen,
    setIsBuilderOpen,
    selectedTemplateDocument,
    setSelectedTemplateDocument,
    selectedRawJson,
    setSelectedRawJson,
    isCreatingTemplate,
    isUpdatingTemplate,
    isDeletingTemplate,
    isCreateEmailTemplateSuccess,
    isUpdateEmailTemplateSuccess,
    createEmailTemplate,
    updateEmailTemplate,
    handleEditTemplate,
    clearEditingTemplate,
    initialTemplate,
    setInitialTemplate,
    templateName,
    setTemplateName,
    handleDeleteTemplate,
    confirmDeleteTemplate,
    cancelDeleteTemplate,

    // Delete popup state
    isDeletePopUpOpen,
    templateToDelete,
  } = useEmailBuilder();

  useEffect(() => {
    refetchSystemParamsData?.();
  }, []);

  // Generate thumbnail from HTML content - Returns base64 data URL
  const generateThumbnail = async (html: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const iframe = document.createElement("iframe");
        iframe.style.position = "absolute";
        iframe.style.left = "-9999px";
        iframe.style.top = "-9999px";
        iframe.style.width = "800px";
        iframe.style.height = "600px";
        iframe.style.border = "none";

        document.body.appendChild(iframe);

        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) {
          reject(new Error("Could not access iframe document"));
          return;
        }

        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { 
                  margin: 0; 
                  padding: 20px; 
                  font-family: Arial, sans-serif;
                  width: 800px;
                  background: white;
                }
                * { box-sizing: border-box; }
              </style>
            </head>
            <body>${html}</body>
          </html>
        `);
        iframeDoc.close();

        setTimeout(async () => {
          try {
            const canvas = await html2canvas(iframeDoc.body, {
              width: 800,
              height: 600,
              scale: 0.5,
              useCORS: true,
              allowTaint: true,
              backgroundColor: "#ffffff",
              logging: false,
              removeContainer: true,
              imageTimeout: 5000,
            });

            const thumbnailCanvas = document.createElement("canvas");
            thumbnailCanvas.width = 400;
            thumbnailCanvas.height = 300;
            const ctx = thumbnailCanvas.getContext("2d");

            if (ctx) {
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(0, 0, 400, 300);

              const aspectRatio = canvas.width / canvas.height;
              const thumbAspectRatio = 400 / 300;
              let drawWidth, drawHeight, offsetX, offsetY;

              if (aspectRatio > thumbAspectRatio) {
                drawHeight = 300;
                drawWidth = drawHeight * aspectRatio;
                offsetX = (400 - drawWidth) / 2;
                offsetY = 0;
              } else {
                drawWidth = 400;
                drawHeight = drawWidth / aspectRatio;
                offsetX = 0;
                offsetY = (300 - drawHeight) / 2;
              }

              ctx.drawImage(canvas, offsetX, offsetY, drawWidth, drawHeight);
              const thumbnailDataUrl = thumbnailCanvas.toDataURL(
                "image/png",
                0.8,
              );
              resolve(thumbnailDataUrl);
            } else {
              reject(
                new Error("Could not get 2D context for thumbnail canvas"),
              );
            }
          } catch (html2canvasError) {
            console.warn("html2canvas failed, creating fallback thumbnail");
            const fallbackThumbnail = generateFallbackThumbnail(
              templateName || "Email Template",
            );
            resolve(fallbackThumbnail);
          } finally {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }
        }, 1000);
      } catch (error) {
        console.warn("Error in generateThumbnail:", error);
        const fallbackThumbnail = generateFallbackThumbnail(
          templateName || "Email Template",
        );
        resolve(fallbackThumbnail);
      }
    });
  };

  // Generate a consistent fallback thumbnail
  const generateFallbackThumbnail = (name: string): string => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 400, 300);
      gradient.addColorStop(0, "#f8fafc");
      gradient.addColorStop(0.5, "#e2e8f0");
      gradient.addColorStop(1, "#cbd5e1");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 400, 300);

      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, 398, 298);

      ctx.fillStyle = "#64748b";
      ctx.font = "bold 40px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("📧", 200, 120);

      ctx.fillStyle = "#374151";
      ctx.font = "bold 18px Arial, sans-serif";
      ctx.fillText("Email Template", 200, 155);

      ctx.fillStyle = "#6b7280";
      ctx.font = "14px Arial, sans-serif";
      const displayName =
        name.length > 30 ? name.substring(0, 30) + "..." : name;
      ctx.fillText(displayName, 200, 180);

      return canvas.toDataURL("image/png", 0.8);
    }

    return (
      "data:image/svg+xml;base64," +
      btoa(`
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
        <text x="200" y="140" text-anchor="middle" font-family="Arial" font-size="20" fill="#64748b">📧</text>
        <text x="200" y="165" text-anchor="middle" font-family="Arial" font-size="16" fill="#374151">Email Template</text>
        <text x="200" y="185" text-anchor="middle" font-family="Arial" font-size="12" fill="#9ca3af">${name}</text>
      </svg>
    `)
    );
  };

  // Render thumbnail with proper fallback
  const renderThumbnail = (template: EmailTemplate) => {
    if (template.thumbnail && template.thumbnail.startsWith("data:image/")) {
      return (
        <div
          className="h-48 bg-cover bg-center bg-white"
          style={{ backgroundImage: `url(${template.thumbnail})` }}
        />
      );
    }

    return (
      <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <div className="text-3xl mb-2">📧</div>
          <div className="font-medium text-sm">{template.templateName}</div>
          <div className="text-xs opacity-75">{t("email.email_template")}</div>
        </div>
      </div>
    );
  };

  useSuccessToast(
    isCreateEmailTemplateSuccess || isUpdateEmailTemplateSuccess,
    t("email.success_saved") as string,
  );

  // Save or update template with proper API integration
  const handleSaveTemplate = async (html: string, documentData: any) => {
    try {
      if (!templateName.trim()) {
        alert("Template name is required!");
        return;
      }

      if (!html || !documentData) {
        console.error("Missing HTML or document data");
        alert("Error: Template data is missing. Please try again.");
        return;
      }

      if (!documentData.root) {
        console.error("Document missing root block");
        alert("Error: Template structure is invalid. Please try again.");
        return;
      }

      // Generate thumbnail
      let thumbnail: string;
      try {
        thumbnail = await generateThumbnail(html);
      } catch (thumbnailError) {
        console.warn("Thumbnail generation failed, using fallback");
        thumbnail = generateFallbackThumbnail(templateName);
      }

      const templateData = {
        name: templateName,
        html,
        documentData,
        thumbnail,
      };

      if (editingTemplate) {
        // Update existing template via API
        await updateEmailTemplate(editingTemplate.id!, templateData);
      } else {
        // Create new template via API
        await createEmailTemplate(templateData);
      }

      handleCloseBuilder();
    } catch (error) {
      console.error("Error saving template:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      alert(`Error saving template: ${errorMessage}`);
    }
  };

  const handleCloseBuilder = () => {
    setIsBuilderOpen(false);
    clearEditingTemplate();
    setTemplateName("");
    setSelectedTemplateDocument(null);
    setSelectedRawJson(null);
    setInitialTemplate("");
  };

  const handleOpenBuilder = () => {
    setIsBuilderOpen(true);
  };

  // Edit existing template - convert HTML to editor format if needed
  const handleEditTemplateClick = (template: EmailTemplate) => {
    setTemplateName(template.templateName || "");
    handleEditTemplate(template);

    // Parse documentData if it's a string
    let parsedDocumentData = template.documentData;
    if (typeof template.documentData === "string") {
      try {
        parsedDocumentData = JSON.parse(template.documentData);
      } catch (error) {
        console.error("Error parsing document data:", error);
        parsedDocumentData = undefined;
      }
    }

    const hasValidDoc =
      parsedDocumentData &&
      typeof parsedDocumentData === "object" &&
      (parsedDocumentData as any).root &&
      Object.keys(parsedDocumentData).length > 1;

    if (hasValidDoc) {
      setSelectedRawJson(null);
      setInitialTemplate("");
      setSelectedTemplateDocument(parsedDocumentData);
    } else {
      try {
        const rawJson = convertHtmlToEditorConfig(template.htmlContent || "");

        if (!rawJson || Object.keys(rawJson).length === 0) {
          throw new Error("Conversion returned empty object");
        }

        setSelectedTemplateDocument(null);
        setInitialTemplate("");
        setSelectedRawJson(rawJson);
      } catch (error) {
        console.error("Conversion failed:", error);
        setSelectedTemplateDocument(null);
        setSelectedRawJson(null);
        setInitialTemplate(template.htmlContent || "");
      }
    }

    setTimeout(() => {
      setIsBuilderOpen(true);
    }, 200);
  };

  // Preview template in new window
  const handlePreviewTemplate = (template: EmailTemplate) => {
    const previewWindow = window.open("", "_blank", "width=800,height=600");
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Preview: ${template.templateName}</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { 
                margin: 0; 
                padding: 20px; 
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                min-height: 100vh;
              }
              .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              .preview-header {
                background: #e2e8f0;
                padding: 10px 15px;
                margin: -20px -20px 20px -20px;
                border-radius: 8px 8px 0 0;
                font-weight: bold;
                color: #374151;
              }
              table { width: 100%; border-collapse: collapse; }
              img { max-width: 100%; height: auto; }
              .button { display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="preview-header">📧 Email Preview: ${template.templateName}</div>
              <div class="email-content">
                ${template.htmlContent || '<p style="color: #6b7280; text-align: center; padding: 40px;">No content available for this template.</p>'}
              </div>
            </div>
          </body>
        </html>
      `);
      previewWindow.document.close();
    }
  };

  if (isBuilderOpen) {
    return (
      <EmailBuilderModal
        open={isBuilderOpen}
        onClose={handleCloseBuilder}
        onSave={handleSaveTemplate}
        initialTemplate={initialTemplate}
        templateName={templateName}
        setTemplateName={setTemplateName}
        savedDocument={selectedTemplateDocument}
        rawJson={selectedRawJson}
        systemParamsData={systemParamsData}
      />
    );
  }
  {
    isDeletePopUpOpen && templateToDelete && (
      <ContextPopup
        option="deleteEmailTemplate"
        templateName={templateName as string}
        onClose={cancelDeleteTemplate}
        onConfirm={confirmDeleteTemplate}
      />
    );
  }
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">
            {t("email.loading_templates")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {t("email.email_builder_title") || "Email Template Builder"}
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            {t("email.email_builder_description")}
          </p>
          <button
            onClick={handleOpenBuilder}
            disabled={isCreatingTemplate}
            className="bg-primary-blue hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 text-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreatingTemplate ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                {t("email.creating")}
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {t("email.create_new_template") || "Create New Template"}
              </>
            )}
          </button>
        </div>

        {/* Templates Grid */}
        {templates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Template Thumbnail */}
                <div className="relative overflow-hidden">
                  {renderThumbnail(template)}

                  {/* Action Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTemplateClick(template)}
                        disabled={isUpdatingTemplate}
                        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transform hover:scale-110 transition-all duration-200 disabled:opacity-50"
                        title={t("email.edit_template") as string}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => handlePreviewTemplate(template)}
                        className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transform hover:scale-110 transition-all duration-200"
                        title={t("email.preview_template") as string}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => handleDeleteTemplate(template.id!)}
                        disabled={isDeletingTemplate}
                        className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transform hover:scale-110 transition-all duration-200 disabled:opacity-50"
                        title={t("email.delete_template") as string}
                      >
                        {isDeletingTemplate ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <h3
                    className="text-lg font-semibold text-gray-800 mb-2 truncate"
                    title={template.templateName}
                  >
                    {template.templateName}
                  </h3>

                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        template.enabledFlag === "Y"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {template.enabledFlag === "Y" ? "Active" : "Inactive"}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {template.updatedDate
                        ? new Date(template.updatedDate).toLocaleDateString()
                        : template.createdDate
                          ? new Date(template.createdDate).toLocaleDateString()
                          : "Unknown"}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditTemplateClick(template)}
                      disabled={isUpdatingTemplate}
                      className="flex-1 px-3 py-2 border border-primary-blue text-primary-blue rounded-lg hover:bg-blue-50 transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-1 disabled:opacity-50"
                    >
                      {isUpdatingTemplate ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-blue"></div>
                          {t("email.updating")}
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          {t("email.edit")}
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handlePreviewTemplate(template)}
                      className="flex-1 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      {t("email.preview")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {t("email.no_templates")}
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                {t("email.get_started_desc")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
