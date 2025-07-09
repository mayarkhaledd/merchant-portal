// Wrapper component: decides which sub-component to render.
import React from "react";
import { Control, UseFormSetValue } from "react-hook-form";
import { WhatsappTemplate } from "@ejada/types/api/whatsappInterface";
import { CreateEventMessageValues } from "@ejada/screens/RecipientNotifications/partials/CreateEventMessage/CreateEventMessage.types";

/* Logic hooks */
import { useWhatsappTemplatePreview } from "./partials/useWhatsappTemplatePreview";
import { useWhatsappTemplateForm } from "./partials/useWhatsappTemplateForm";

/* Dumb UI parts (already in your code-base) */
import { EmptyState } from "./partials/EmptyState";
import { PhoneFrame } from "./partials/PhoneFrame";
import { WhatsappMessagePreview } from "./partials/WhatsappMessagePreview";
import { WhatsappTemplateInputs } from "./partials/WhatsappTemplateInputs";

/* ========================================================= *
 *  VERSION 1 – with React-Hook-Form (editable)               *
 * ========================================================= */
const WhatsappTemplatePreviewWithForm: React.FC<{
  template: WhatsappTemplate;
  control: Control<CreateEventMessageValues, any>;
  setValue: UseFormSetValue<CreateEventMessageValues>;
}> = ({ template, control, setValue }) => {
  const { components, headerParams, bodyParams } =
    useWhatsappTemplatePreview(template);

  const { headerVarArray, bodyVarArray } = useWhatsappTemplateForm(
    template,
    control,
    setValue,
    headerParams,
    bodyParams,
  );

  return (
    <div className="flex items-start justify-center gap-6 w-full">
      {/* live inputs */}
      <WhatsappTemplateInputs
        control={control}
        headerParams={headerParams}
        bodyParams={bodyParams}
      />

      {/* phone preview */}
      <PhoneFrame>
        <WhatsappMessagePreview
          headerText={components.header?.text}
          bodyText={components.body?.text}
          footerText={components.footer?.text}
          buttons={components.buttons?.buttons}
          headerVarArray={headerVarArray}
          bodyVarArray={bodyVarArray}
        />
      </PhoneFrame>
    </div>
  );
};

/* ========================================================= *
 *  VERSION 2 – preview-only (no form hooks)                  *
 * ========================================================= */
const WhatsappTemplatePreviewOnly: React.FC<{
  template: WhatsappTemplate;
}> = ({ template }) => {
  const { components, headerParams, bodyParams } =
    useWhatsappTemplatePreview(template);

  // empty arrays leave {{n}} unchanged
  const headerVarArray = new Array(headerParams.length).fill("");
  const bodyVarArray = new Array(bodyParams.length).fill("");

  return (
    <div className="flex items-start justify-center w-full">
      <PhoneFrame>
        <WhatsappMessagePreview
          headerText={components.header?.text}
          bodyText={components.body?.text}
          footerText={components.footer?.text}
          buttons={components.buttons?.buttons}
          headerVarArray={headerVarArray}
          bodyVarArray={bodyVarArray}
        />
      </PhoneFrame>
    </div>
  );
};

/* ========================================================= *
 *  MAIN WRAPPER                                             *
 * ========================================================= */
interface Props {
  selectedTemplate: WhatsappTemplate | null;
  control?: Control<CreateEventMessageValues, any>;
  setValue?: UseFormSetValue<CreateEventMessageValues>;
}

export const WhatsappTemplatePreview: React.FC<Props> = ({
  selectedTemplate,
  control,
  setValue,
}) => {
  if (!selectedTemplate) return <EmptyState />;

  // editable version when BOTH props are provided
  if (control && setValue) {
    return (
      <WhatsappTemplatePreviewWithForm
        template={selectedTemplate}
        control={control}
        setValue={setValue}
      />
    );
  }

  // static version otherwise
  return <WhatsappTemplatePreviewOnly template={selectedTemplate} />;
};
