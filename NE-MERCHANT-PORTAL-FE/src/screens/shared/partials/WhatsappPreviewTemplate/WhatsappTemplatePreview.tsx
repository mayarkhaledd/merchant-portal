import React from "react";
import { Control, UseFormSetValue } from "react-hook-form";
import { WhatsappTemplate } from "@ejada/types/api/whatsappInterface";
import { CreateEventMessageValues } from "@ejada/screens/RecipientNotifications/partials/CreateEventMessage/CreateEventMessage.types";
import { useWhatsappTemplatePreview } from "./partials/useWhatsappTemplatePreview";
import { useWhatsappTemplateForm } from "./partials/useWhatsappTemplateForm";
import { EmptyState } from "./partials/EmptyState";
import { PhoneFrame } from "./partials/PhoneFrame";
import { WhatsappMessagePreview } from "./partials/WhatsappMessagePreview";
import { WhatsappTemplateInputs } from "./partials/WhatsappTemplateInputs";

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
      {(headerParams.length > 0 || bodyParams.length > 0) && (
        <WhatsappTemplateInputs
          control={control}
          headerParams={headerParams}
          bodyParams={bodyParams}
        />
      )}

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

const WhatsappTemplatePreviewOnly: React.FC<{
  template: WhatsappTemplate;
}> = ({ template }) => {
  const { components, headerParams, bodyParams } =
    useWhatsappTemplatePreview(template);

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

interface Props {
  selectedTemplate: WhatsappTemplate | null;
  control?: any;
  setValue?: any;
}

export const WhatsappTemplatePreview: React.FC<Props> = ({
  selectedTemplate,
  control,
  setValue,
}) => {
  if (!selectedTemplate) return <EmptyState />;

  if (control && setValue) {
    return (
      <WhatsappTemplatePreviewWithForm
        template={selectedTemplate}
        control={control}
        setValue={setValue}
      />
    );
  }

  return <WhatsappTemplatePreviewOnly template={selectedTemplate} />;
};
