import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { EmailBuilderModal } from "./EmailBuilderModal";
import { convertHtmlToEditorConfig } from "./htmlToEditorConfig";
import { useSuccessToast } from "../shared";
import { t } from "i18next";
import { useGetSystemParams } from "@ejada/providers";

interface EmailTemplate {
  id: string;
  name: string;
  html: string;
  documentData: any;
  createdAt?: string;
  updatedAt?: string;
  thumbnail?: string;
}

export default function EmailBuilder() {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [initialTemplate, setInitialTemplate] = useState("");
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(
    null,
  );
  const [selectedTemplateDocument, setSelectedTemplateDocument] =
    useState<any>(null);
  const [selectedRawJson, setSelectedRawJson] = useState<any>(null);
  const [isTemplateSaved, setIsTemplateSaved] = useState<boolean>();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [templateName, setTemplateName] = useState("");
  const { updatedData: systemParamsData, refetch: refetchSystemParamsData } =
    useGetSystemParams({}, false);

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
            // Create fallback thumbnail instead of random Unsplash
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
        // Create fallback thumbnail instead of random Unsplash
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
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 400, 300);
      gradient.addColorStop(0, "#f8fafc");
      gradient.addColorStop(0.5, "#e2e8f0");
      gradient.addColorStop(1, "#cbd5e1");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 400, 300);

      // Add border
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, 398, 298);

      // Add email icon
      ctx.fillStyle = "#64748b";
      ctx.font = "bold 40px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("📧", 200, 120);

      // Add "Email Template" text
      ctx.fillStyle = "#374151";
      ctx.font = "bold 18px Arial, sans-serif";
      ctx.fillText("Email Template", 200, 155);

      // Add template name (truncated if too long)
      ctx.fillStyle = "#6b7280";
      ctx.font = "14px Arial, sans-serif";
      const displayName =
        name.length > 30 ? name.substring(0, 30) + "..." : name;
      ctx.fillText(displayName, 200, 180);

      return canvas.toDataURL("image/png", 0.8);
    }

    // Ultimate fallback - SVG as data URL
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

    // Show default thumbnail for templates without saved thumbnails
    return (
      <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <div className="text-3xl mb-2">📧</div>
          <div className="font-medium text-sm">{template.name}</div>
          <div className="text-xs opacity-75">Email Template</div>
        </div>
      </div>
    );
  };

  useSuccessToast(
    isTemplateSaved as boolean,
    t("email.success_saved") as string,
  );

  // MOCK API call to save template (commented real API call)
  const saveTemplateToAPI = async (
    templateData: any,
    isEdit: boolean,
    templateId?: string,
  ) => {
    try {
      console.log("🔄 MOCK: Saving template to API...", {
        templateData,
        isEdit,
        templateId,
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful response
      const mockResponse = {
        success: true,
        data: {
          id: templateId || `mock_${Date.now()}`,
          ...templateData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };

      console.log("✅ MOCK: Template saved successfully", mockResponse.data);
      return mockResponse.data;

      /* REAL API CALL - COMMENTED OUT
      const url = isEdit ? `/api/templates/${templateId}` : "/api/templates";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(templateData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.message || "Failed to save template");
      }
      */
    } catch (error) {
      console.error("Error saving template:", error);
      throw error;
    }
  };

  // MOCK API call to delete template (commented real API call)
  const deleteTemplateFromAPI = async (templateId: string) => {
    try {
      console.log("🔄 MOCK: Deleting template from API...", templateId);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log("✅ MOCK: Template deleted successfully");

      /* REAL API CALL - COMMENTED OUT
      const response = await fetch(`/api/templates/${templateId}`, {
        method: "DELETE",
        headers: {
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to delete template");
      }
      */
    } catch (error) {
      console.error("Error deleting template:", error);
      throw error;
    }
  };

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

      // Generate thumbnail (this will be a base64 data URL)
      let thumbnail: string;
      try {
        console.log("Generating thumbnail for template...");
        thumbnail = await generateThumbnail(html);
        console.log("Thumbnail generated successfully");
      } catch (thumbnailError) {
        console.warn("Thumbnail generation failed, using fallback");
        thumbnail = generateFallbackThumbnail(templateName);
      }

      const templateData = {
        name: templateName,
        html,
        documentData,
        thumbnail, // This is the base64 data URL that will be saved to backend
      };

      if (editingTemplate) {
        // Update existing template via API
        const updatedTemplate = await saveTemplateToAPI(
          templateData,
          true,
          editingTemplate.id,
        );
        setTemplates((prev) =>
          prev.map((t) => (t.id === editingTemplate.id ? updatedTemplate : t)),
        );
        setIsTemplateSaved(true);
      } else {
        // Create new template via API
        const newTemplate = await saveTemplateToAPI(templateData, false);
        setTemplates((prev) => [newTemplate, ...prev]);
        setIsTemplateSaved(true);
      }

      handleCloseBuilder();
    } catch (error) {
      console.error("Error saving template:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      alert(`Error saving template: ${errorMessage}`);
    }
  };

  // Delete template with API integration
  const handleDeleteTemplate = async (templateId: string) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      try {
        await deleteTemplateFromAPI(templateId);
        setTemplates((prev) => prev.filter((t) => t.id !== templateId));
        console.log("✅ Template deleted from local state");
      } catch (error) {
        console.error("Error deleting template:", error);
        alert("Failed to delete template. Please try again.");
      }
    }
  };

  const handleCloseBuilder = () => {
    setIsBuilderOpen(false);
    setEditingTemplate(null);
    setTemplateName("");
    setSelectedTemplateDocument(null);
    setSelectedRawJson(null);
    setInitialTemplate("");
  };

  const handleOpenBuilder = () => {
    setIsBuilderOpen(true);
  };

  // Edit existing template - convert HTML to editor format if needed
  const handleEditTemplate = (template: EmailTemplate) => {
    setTemplateName(template.name);
    setEditingTemplate(template);

    const hasValidDoc =
      template.documentData &&
      typeof template.documentData === "object" &&
      template.documentData.root &&
      Object.keys(template.documentData).length > 1;

    if (hasValidDoc) {
      // Use existing document data (preferred format for editor)
      setSelectedRawJson(null);
      setInitialTemplate("");
      setSelectedTemplateDocument(template.documentData);
    } else {
      // Convert HTML to editor format
      try {
        const rawJson = convertHtmlToEditorConfig(template.html);

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
        setInitialTemplate(template.html);
      }
    }

    // Open modal after state is set
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
            <title>Preview: ${template.name}</title>
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
              <div class="preview-header">📧 Email Preview: ${template.name}</div>
              <div class="email-content">
                ${template.html || '<p style="color: #6b7280; text-align: center; padding: 40px;">No content available for this template.</p>'}
              </div>
            </div>
          </body>
        </html>
      `);
      previewWindow.document.close();
    }
  };

  // MOCK Fetch templates from API on component mount (commented real API call)
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);
        console.log("🔄 MOCK: Fetching templates from API...");

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Create mock templates with proper thumbnails
        const mockTemplateConfigs = [
          {
            id: "mock_template_1",
            name: "Welcome Email",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #2563eb; text-align: center;">Welcome to Our Platform! 🎉</h1>
                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                  Thank you for joining us! We're excited to have you on board and can't wait to show you what we have in store.
                </p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="#" style="background-color: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Get Started
                  </a>
                </div>
              </div>
            `,
            documentData: {
              root: {
                type: "EmailLayout",
                data: {
                  backdropColor: "#FFFFFF",
                  canvasColor: "#FFFFFF",
                  textColor: "#333333",
                  fontFamily: "GEOMETRIC_SANS",
                  childrenIds: [
                    "welcome_header",
                    "welcome_text",
                    "welcome_button",
                  ],
                },
              },
              welcome_header: {
                type: "Heading",
                data: {
                  style: {
                    color: "#2563eb",
                    backgroundColor: null,
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: { top: 32, bottom: 16, left: 24, right: 24 },
                  },
                  props: {
                    level: "h1",
                    text: "Welcome to Our Platform! 🎉",
                  },
                },
              },
              welcome_text: {
                type: "Text",
                data: {
                  style: {
                    color: "#333333",
                    backgroundColor: null,
                    fontSize: 16,
                    fontWeight: "normal",
                    textAlign: "left",
                    padding: { top: 8, bottom: 8, left: 24, right: 24 },
                  },
                  props: {
                    text: "Thank you for joining us! We're excited to have you on board and can't wait to show you what we have in store.",
                  },
                },
              },
              welcome_button: {
                type: "Button",
                data: {
                  style: {
                    backgroundColor: null,
                    padding: { top: 24, bottom: 24, left: 24, right: 24 },
                    textAlign: "center",
                  },
                  props: {
                    buttonBackgroundColor: "#2563eb",
                    buttonStyle: "rounded",
                    buttonTextColor: "#FFFFFF",
                    fullWidth: false,
                    size: "large",
                    text: "Get Started",
                    url: "#",
                  },
                },
              },
            },
            createdAt: "2024-08-10T10:30:15.123Z",
            updatedAt: "2024-08-10T10:30:15.123Z",
          },
          {
            id: "mock_template_2",
            name: "Newsletter",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #059669; text-align: center;">📰 Monthly Newsletter</h1>
                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                  Stay updated with our latest news, features, and announcements. 
                  Here's what's new this month!
                </p>
              </div>
            `,
            documentData: null, // This will test HTML conversion flow
            createdAt: "2024-08-08T14:22:33.789Z",
            updatedAt: "2024-08-08T14:22:33.789Z",
          },
        ];

        // Generate thumbnails for mock templates
        const mockTemplates: EmailTemplate[] = await Promise.all(
          mockTemplateConfigs.map(async (config) => {
            try {
              // Try to generate real thumbnail from HTML
              const thumbnail = await generateThumbnail(config.html);
              return {
                ...config,
                thumbnail,
              };
            } catch (error) {
              console.warn(
                `Failed to generate thumbnail for ${config.name}, using fallback`,
              );
              // Use fallback thumbnail if generation fails
              return {
                ...config,
                thumbnail: generateFallbackThumbnail(config.name),
              };
            }
          }),
        );

        console.log("✅ MOCK: Templates fetched successfully", mockTemplates);
        setTemplates(mockTemplates);

        /* REAL API CALL - COMMENTED OUT
        const response = await fetch("/api/templates", {
          headers: {
            // 'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setTemplates(result.data || []);
        } else {
          console.error("Failed to fetch templates:", result.message);
          setTemplates([]);
        }
        */
      } catch (error) {
        console.error("Error fetching templates:", error);
        // Keep empty array on error, don't show mock data
        setTemplates([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">
            Loading Templates...
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
            Email Template Builder
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Create stunning email templates with our builder
          </p>
          <button
            onClick={handleOpenBuilder}
            className="bg-primary-blue hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 text-lg flex items-center gap-2"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Template
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
                        onClick={() => handleEditTemplate(template)}
                        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transform hover:scale-110 transition-all duration-200"
                        title="Edit Template"
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
                        title="Preview Template"
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
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transform hover:scale-110 transition-all duration-200"
                        title="Delete Template"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <h3
                    className="text-lg font-semibold text-gray-800 mb-2 truncate"
                    title={template.name}
                  >
                    {template.name}
                  </h3>

                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Active
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
                      {template.updatedAt
                        ? new Date(template.updatedAt).toLocaleDateString()
                        : template.createdAt
                          ? new Date(template.createdAt).toLocaleDateString()
                          : "Unknown"}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditTemplate(template)}
                      className="flex-1 px-3 py-2 border border-primary-blue text-primary-blue rounded-lg hover:bg-blue-50 transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-1"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
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
                      Preview
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
                No Templates Yet
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                Get started by creating your first email template. Use our
                intuitive builder to create professional emails in minutes.
              </p>

              {/* <button
                onClick={handleOpenBuilder}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 font-bold text-lg flex items-center gap-2 mx-auto"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Your First Template
              </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
