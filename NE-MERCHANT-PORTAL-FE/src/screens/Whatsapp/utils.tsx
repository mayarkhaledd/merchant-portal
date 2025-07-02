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
import { whatsappConstants } from "./Whatsapp.constants";

export const formateWhatsappTemplatesColumns = (
  data: GetWhatsappTemplatesInterface,
): TTableColumns[] => {
  const templates = data.templates;
  return templates.map((template) => {
    let language = whatsappConstants.emptyString;
    switch (template.languageCode) {
      case whatsappConstants.en:
        language = t("whatsapp.english");
        break;
      case whatsappConstants.en_US:
        language = t("whatsapp.english_us");
        break;
      case whatsappConstants.en_GB:
        language = t("whatsapp.english_uk");
        break;
      case whatsappConstants.ar:
        language = t("whatsapp.arabic");
        break;
      default:
        language = template.languageCode || whatsappConstants.emptyString;
    }
    const categoryKey = (
      template.category || whatsappConstants.emptyString
    ).toLowerCase();
    return {
      templateId: template.templateId || whatsappConstants.emptyString,
      templateName: template.templateName || whatsappConstants.emptyString,
      category: t(`whatsapp.${categoryKey}`),
      status: template.status || whatsappConstants.emptyString,
      language,
    };
  });
};

export function getParamValue(
  params: { key: string; value: string }[],
  key: string,
): string {
  return params.find((p) => p.key === key)?.value || "";
}

export const formatWhatsappTemplatePayload = (
  data: WhatsappFormValues,
): CreateTemplatePayload => {
  const components: TemplateComponentsList[] = [];

  // HEADER
  if (data.header) {
    components.push({
      type: whatsappConstants.header,
      text: data.header,
      format: whatsappConstants.text_type,
      mediaUrl: whatsappConstants.emptyString,
      mediaCaption: whatsappConstants.emptyString,
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
      type: whatsappConstants.body,
      text: data.body || whatsappConstants.emptyString,
      format: whatsappConstants.emptyString,
      mediaUrl: whatsappConstants.emptyString,
      mediaCaption: whatsappConstants.emptyString,
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
      type: whatsappConstants.footer,
      text: data.footer || whatsappConstants.emptyString,
      format: whatsappConstants.emptyString,
      mediaUrl: whatsappConstants.emptyString,
      mediaCaption: whatsappConstants.emptyString,
      codeExpirationMinutes: data.expirationCheckbox
        ? data.expiryDuration || whatsappConstants.emptyString
        : whatsappConstants.emptyString,
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
  if (data.categoryButtons === whatsappConstants.authentication) {
    components.push({
      type: whatsappConstants.buttons,
      text: whatsappConstants.emptyString,
      format: whatsappConstants.emptyString,
      mediaUrl: whatsappConstants.emptyString,
      mediaCaption: whatsappConstants.emptyString,
      parameters: [],
      buttons: [
        {
          type: whatsappConstants.otp,
          otpType: whatsappConstants.one_tap,
          text: data.copyCodeButton || whatsappConstants.emptyString,
          name: whatsappConstants.emptyString,
          phoneNumber: whatsappConstants.emptyString,
          url: whatsappConstants.emptyString,
          supportedApp: [
            {
              packageName: whatsappConstants.packageName,
              signatureHash: whatsappConstants.signatureHash,
            },
          ],
          parameterPosition: 0,
          exampleValue: data.copyCodeButton || whatsappConstants.emptyString,
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
      type: whatsappConstants.buttons,
      text: whatsappConstants.emptyString,
      format: whatsappConstants.emptyString,
      mediaUrl: whatsappConstants.emptyString,
      mediaCaption: whatsappConstants.emptyString,
      parameters: [],
      buttons: data.buttons.map((button) => ({
        type:
          button.buttonType === whatsappConstants.call
            ? whatsappConstants.phone
            : button.buttonType === whatsappConstants.offerCode
              ? whatsappConstants.otp
              : button.buttonType,
        otpType:
          button.buttonType === whatsappConstants.offerCode
            ? whatsappConstants.copy_code
            : whatsappConstants.emptyString,
        text: button.text || whatsappConstants.emptyString,
        name: whatsappConstants.emptyString,
        phoneNumber:
          button.buttonType === whatsappConstants.call
            ? button.phone || whatsappConstants.emptyString
            : whatsappConstants.emptyString,
        url:
          button.buttonType === whatsappConstants.url
            ? button.url || whatsappConstants.emptyString
            : whatsappConstants.emptyString,
        supportedApp: [
          {
            packageName: whatsappConstants.packageName,
            signatureHash: whatsappConstants.signatureHash,
          },
        ],
        parameterPosition: 0,
        exampleValue:
          button.buttonType === whatsappConstants.offerCode
            ? button.text || whatsappConstants.emptyString
            : whatsappConstants.emptyString,
      })),
      example: {
        bodyText: [[]],
        headerText: [],
        headerHandle: [],
      },
    });
  }

  const payload: CreateTemplatePayload = {
    templateId: whatsappConstants.emptyString, // Should be set if updating, else leave empty for create
    templateName: data.templateName,
    languageCode: data.languageCode,
    category: data.categoryButtons.toUpperCase(),
    namespace: whatsappConstants.namespace, // Should be sent to BE
    components: components || [],
    tenantId:
      Cookies.get(whatsappConstants.tenantId) || whatsappConstants.emptyString,
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
      template.components.find(
        (comp) => comp.componentType === whatsappConstants.header,
      ) || null;
    bodyComponent =
      template.components.find(
        (comp) => comp.componentType === whatsappConstants.body,
      ) || null;
    footerComponent =
      template.components.find(
        (comp) => comp.componentType === whatsappConstants.footer,
      ) || null;
    buttonsComponent =
      template.components.find(
        (comp) => comp.componentType === whatsappConstants.buttons,
      ) || null;
  }

  // Map parameters to variables with proper typing
  const mapParametersToVariables = (parameters: any[] = []): Variable[] => {
    if (!parameters || parameters.length === 0) return [];
    return [...parameters]
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      .map((param) => ({
        type: param.type || whatsappConstants.emptyString,
        value: param.example || whatsappConstants.emptyString,
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
        button.buttonType === whatsappConstants.otp
          ? whatsappConstants.offerCode
          : button.buttonType === whatsappConstants.phone
            ? whatsappConstants.call
            : button.buttonType === whatsappConstants.url
              ? whatsappConstants.url
              : button.buttonType || whatsappConstants.emptyString,
      text: button.text || whatsappConstants.emptyString,
      url: button.url || whatsappConstants.emptyString,
      phone: button.phoneNumber || whatsappConstants.emptyString,
    };
  };

  let buttons: ButtonType[] = [];
  if (buttonsComponent?.buttons) {
    buttons = buttonsComponent.buttons.map(mapButtonToButtonType);
  }

  // Authentication specific fields
  let copyCodeButton = whatsappConstants.emptyString;
  let securityCheckbox = false;
  let expirationCheckbox = false;
  let expiryDuration = whatsappConstants.emptyString;

  if (template.category === whatsappConstants.authentication) {
    if (buttonsComponent?.buttons) {
      const otpButton = buttonsComponent.buttons.find(
        (b: any) =>
          b.buttonType === whatsappConstants.otp ||
          (b.otpType && b.otpType === whatsappConstants.copy_code),
      );
      copyCodeButton = otpButton?.text || whatsappConstants.emptyString;
    }
    securityCheckbox = !!bodyComponent?.addSecurityRecommendation;
    expirationCheckbox = !!footerComponent?.codeExpirationMinutes;
    expiryDuration =
      footerComponent?.codeExpirationMinutes || whatsappConstants.emptyString;
  }

  return {
    templateName: template.templateName || whatsappConstants.emptyString,
    languageCode: template.languageCode || whatsappConstants.emptyString,
    categoryButtons: template.category || whatsappConstants.emptyString,
    header: headerComponent?.text || whatsappConstants.emptyString,
    body: bodyComponent?.text || whatsappConstants.emptyString,
    footer: footerComponent?.text || whatsappConstants.emptyString,
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
    case whatsappConstants.url:
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
          {button.url && (
            <div className="text-xs text-gray-500 mt-1 px-4 break-all">
              {button.url}
            </div>
          )}
        </button>
      );

    case whatsappConstants.call:
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
          {button.phone && (
            <div className="text-xs text-gray-500 mt-1 px-4 break-all">
              {button.phone}
            </div>
          )}
        </button>
      );

    case whatsappConstants.offerCode:
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
          {button.text && (
            <div className="text-xs text-gray-500 mt-1 px-4 break-all">
              Code: {button.text}
            </div>
          )}
        </button>
      );

    default:
      return null;
  }
};
