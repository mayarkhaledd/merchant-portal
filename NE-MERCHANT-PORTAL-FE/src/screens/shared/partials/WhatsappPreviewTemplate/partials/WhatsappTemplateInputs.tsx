import React from "react";
import { Controller, Control } from "react-hook-form";
import { CreateEventMessageValues } from "@ejada/screens/RecipientNotifications/partials/CreateEventMessage/CreateEventMessage.types";

interface Props {
  control?: Control<CreateEventMessageValues, any>; // optional
  headerParams: string[];
  bodyParams: string[];
}

export const WhatsappTemplateInputs: React.FC<Props> = ({
  control,
  headerParams,
  bodyParams,
}) => {
  if (!control) return null; // show nothing in preview-only mode

  return (
    <div className="flex flex-col gap-4">
      {!!headerParams.length && (
        <section>
          <h3 className="font-bold mb-2">Header Parameters</h3>
          <div className="flex flex-col gap-2">
            {headerParams.map((p, i) => (
              <Controller
                key={p}
                name={`headerVariable.${i}`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder={`Header Param ${p}`}
                    className="border px-2 py-1 rounded text-sm"
                  />
                )}
              />
            ))}
          </div>
        </section>
      )}

      {!!bodyParams.length && (
        <section>
          <h3 className="font-bold mb-2">Body Parameters</h3>
          <div className="flex flex-col gap-2">
            {bodyParams.map((p, i) => (
              <Controller
                key={p}
                name={`bodyVariable.${i}`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder={`Body Param ${p}`}
                    className="border px-2 py-1 rounded text-sm"
                  />
                )}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
