import {
  CreateTemplatePayload,
  GetWhatsappTemplatesInterface,
  TemplateComponentsList,
  WhatsappTemplate,
} from "@ejada/types/api/whatsappInterface";
import { TTableColumns } from "eds-react";
import {
  ButtonType,
  Variable,
  WhatsappFormValues,
  WhatsappInitialValues,
} from "@ejada/screens/Whatsapp";
import Cookies from "js-cookie";
import { filterEmptyValues } from "../shared";
import { t } from "i18next";

export const formateWhatsappTemplatesColumns = (
  data: GetWhatsappTemplatesInterface,
): TTableColumns[] => {
  const templates = data.templates;
  return templates.map((template) => {
    let language = "";
    switch (template.languageCode) {
      case "en":
        language = t("whatsapp.english");
        break;
      case "en_US":
        language = t("whatsapp.english_us");
        break;
      case "en_GB":
        language = t("whatsapp.english_uk");
        break;
      case "ar":
        language = t("whatsapp.arabic");
        break;
      default:
        language = template.languageCode || "";
    }
    const categoryKey = (template.category || "").toLowerCase();
    return {
      templateId: template.templateId || "",
      templateName: template.templateName || "",
      category: t(`whatsapp.${categoryKey}`),
      status: template.status || "",
      language,
    };
  });
};

export const formatWhatsappTemplatePayload = (
  data: WhatsappFormValues,
): CreateTemplatePayload => {
  const components: TemplateComponentsList[] = [];

  // HEADER
  if (data.header) {
    components.push({
      type: "HEADER",
      text: data.header,
      format: "TEXT",
      mediaUrl: "",
      mediaCaption: "",
      parameters: [],
      buttons: [],
      example: {
        bodyText: [[]],
        headerText: data.headerVariables
          ? data.headerVariables.map((v) => v.value)
          : [],
        headerHandle: [],
      },
    });
  }

  // BODY
  if (data.body || data.securityCheckbox) {
    components.push({
      type: "BODY",
      text: data.body || "",
      format: "",
      mediaUrl: "",
      mediaCaption: "",
      ...(data.securityCheckbox ? { addSecurityRecommendation: true } : {}),
      parameters: [],
      buttons: [],
      example: {
        bodyText: data.bodyVariables
          ? [data.bodyVariables.map((v) => v.value)]
          : [[]],
        headerText: [],
        headerHandle: [],
      },
    });
  }

  // FOOTER
  if (data.footer || data.expirationCheckbox) {
    components.push({
      type: "FOOTER",
      text: data.footer || "",
      format: "",
      mediaUrl: "",
      mediaCaption: "",
      codeExpirationMinutes: data.expirationCheckbox
        ? data.expiryDuration || ""
        : "",
      parameters: [],
      buttons: [],
      example: {
        bodyText: [[]],
        headerText: [],
        headerHandle: [],
      },
    });
  }

  // BUTTONS
  if (data.categoryButtons === "Authentication") {
    components.push({
      type: "BUTTONS",
      text: "",
      format: "",
      mediaUrl: "",
      mediaCaption: "",
      parameters: [],
      buttons: [
        {
          type: "OTP",
          otpType: "ONE_TAP",
          text: data.copyCodeButton || "",
          name: "",
          phoneNumber: "",
          url: "",
          supportedApp: [
            {
              packageName: "com.example.luckyshrub",
              signatureHash: "K8a/AINcGX7",
            },
          ],
          parameterPosition: 0,
          exampleValue: "",
        },
      ],
      example: {
        bodyText: [[]],
        headerText: [],
        headerHandle: [],
      },
    });
  } else if (data.buttons && data.buttons.length > 0) {
    components.push({
      type: "BUTTONS",
      text: "",
      format: "",
      mediaUrl: "",
      mediaCaption: "",
      parameters: [],
      buttons: data.buttons.map((button) => ({
        type:
          button.buttonType === "CALL"
            ? "PHONE_NUMBER"
            : button.buttonType === "OFFER_CODE"
              ? "OTP"
              : button.buttonType,
        otpType: button.buttonType === "OFFER_CODE" ? "COPY_CODE" : "",
        text: button.text || "",
        name: "",
        phoneNumber: button.buttonType === "CALL" ? button.phone || "" : "",
        url: button.buttonType === "URL" ? button.url || "" : "",
        supportedApp: [
          {
            packageName: "com.example.luckyshrub",
            signatureHash: "K8a/AINcGX7",
          },
        ],
        parameterPosition: 0,
        exampleValue:
          button.buttonType === "OFFER_CODE" ? button.text || "" : "",
      })),
      example: {
        bodyText: [[]],
        headerText: [],
        headerHandle: [],
      },
    });
  }

  const payload: CreateTemplatePayload = {
    templateId: "", // Should be set if updating, else leave empty for create
    templateName: data.templateName,
    languageCode: data.languageCode,
    category: data.categoryButtons.toUpperCase(),
    namespace: "test-ns", // Should be sent to BE
    components: components || [],
    tenantId: Cookies.get("tenantId") || "",
  };

  // Recursively remove empty values and properties with value 0
  const cleanComponents = (components: TemplateComponentsList[]) =>
    components.map((component) => {
      const newComponent = { ...component };

      // Remove empty 'example' objects
      if (
        newComponent.example &&
        Object.values(newComponent.example).every(
          (v) =>
            (Array.isArray(v) &&
              v.every((arr) =>
                Array.isArray(arr) ? arr.length === 0 : v.length === 0,
              )) ||
            (Array.isArray(v) && v.length === 0),
        )
      ) {
        // @ts-expect-error: example is optional and can be deleted
        delete newComponent.example;
      }

      // Clean buttons array - remove properties with value 0 or empty strings
      if (newComponent.buttons && newComponent.buttons.length > 0) {
        newComponent.buttons = newComponent.buttons.map((button) => {
          const cleanedButton = { ...button };

          // Remove properties with value 0
          Object.keys(cleanedButton).forEach((key) => {
            if (cleanedButton[key as keyof typeof cleanedButton] === 0) {
              delete cleanedButton[key as keyof typeof cleanedButton];
            }
          });

          return cleanedButton;
        });
      }

      // Remove properties with value 0 from the component itself
      Object.keys(newComponent).forEach((key) => {
        const value = newComponent[key as keyof typeof newComponent];
        if (typeof value === "number" && value === 0) {
          delete newComponent[key as keyof typeof newComponent];
        }
      });

      return newComponent;
    });

  payload.components = cleanComponents(payload.components);

  return filterEmptyValues(payload);
};

export const mapWhatsappTemplateInterfaceToInitialValues = (
  template: WhatsappTemplate,
): WhatsappInitialValues => {
  // Get header and body components
  let headerComponent = null;
  let bodyComponent = null;
  let footerComponent = null;
  let buttonsComponent = null;

  // Find components by their type instead of relying on order
  if (template.components && Array.isArray(template.components)) {
    headerComponent =
      template.components.find((comp) => comp.componentType === "HEADER") ||
      null;
    bodyComponent =
      template.components.find((comp) => comp.componentType === "BODY") || null;
    footerComponent =
      template.components.find((comp) => comp.componentType === "FOOTER") ||
      null;
    buttonsComponent =
      template.components.find((comp) => comp.componentType === "BUTTONS") ||
      null;
  }

  // Map parameters to variables with proper typing
  const mapParametersToVariables = (parameters: any[] = []): Variable[] => {
    if (!parameters || parameters.length === 0) return [];
    return [...parameters]
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      .map((param) => ({
        type: param.type || "",
        value: param.example || "",
      }));
  };

  // Map header and body variables
  const headerVariables = headerComponent?.parameters
    ? mapParametersToVariables(headerComponent.parameters)
    : [];
  const bodyVariables = bodyComponent?.parameters
    ? mapParametersToVariables(bodyComponent.parameters)
    : [];

  // Map buttons
  const mapButtonToButtonType = (button: any): ButtonType => {
    return {
      buttonType:
        button.buttonType === "OTP"
          ? "OFFER_CODE"
          : button.buttonType === "PHONE_NUMBER"
            ? "CALL"
            : button.buttonType === "URL"
              ? "URL"
              : button.buttonType || "",
      text: button.text || "",
      url: button.url || "",
      phone: button.phoneNumber || "",
    };
  };

  let buttons: ButtonType[] = [];
  if (buttonsComponent?.buttons) {
    buttons = buttonsComponent.buttons.map(mapButtonToButtonType);
  }

  // Authentication specific fields
  let copyCodeButton = "";
  let securityCheckbox = false;
  let expirationCheckbox = false;
  let expiryDuration = "";

  if (template.category === "AUTHENTICATION") {
    if (buttonsComponent?.buttons) {
      const otpButton = buttonsComponent.buttons.find(
        (b: any) =>
          b.buttonType === "OTP" || (b.otpType && b.otpType === "COPY_CODE"),
      );
      copyCodeButton = otpButton?.text || "";
    }
    securityCheckbox = !!bodyComponent?.addSecurityRecommendation;
    expirationCheckbox = !!footerComponent?.codeExpirationMinutes;
    expiryDuration = footerComponent?.codeExpirationMinutes || "";
  }

  return {
    templateName: template.templateName || "",
    languageCode: template.languageCode || "",
    categoryButtons: template.category || "",
    header: headerComponent?.text || "",
    body: bodyComponent?.text || "",
    footer: footerComponent?.text || "",
    headerVariables,
    bodyVariables,
    copyCodeButton,
    expirationCheckbox,
    expiryDuration,
    securityCheckbox,
    buttons,
  };
};

export const renderButton = (button: ButtonType, index: number) => {
  if (!button || !button.text) return null; // Ensure button has text

  switch (button.buttonType) {
    case "URL":
      return (
        <button
          key={index}
          className="w-full border border-blue-500 text-blue-500 py-1 rounded flex flex-col items-center"
          onClick={(e) => e.preventDefault()}
          type="button"
        >
          <div className="flex items-center gap-2 justify-between w-full px-4 break-all">
            <span className="text-sm">{button.text}</span>
          </div>
        </button>
      );

    case "CALL":
      return (
        <button
          key={index}
          className="w-full border border-green-500 text-green-500 py-1 rounded flex flex-col items-center"
          onClick={(e) => e.preventDefault()}
          type="button"
        >
          <div className="flex items-center gap-2 justify-between w-full px-4 break-all">
            <span className="text-sm">{button.text}</span>
          </div>
        </button>
      );

    case "OFFER_CODE":
      return (
        <button
          key={index}
          className="w-full border border-purple-500 text-purple-500 py-1 rounded flex flex-col items-center"
          onClick={(e) => e.preventDefault()}
          type="button"
        >
          <div className="flex items-center gap-2 justify-between w-full px-4">
            <span className="text-sm">{button.text}</span>
          </div>
        </button>
      );

    default:
      return null;
  }
};
