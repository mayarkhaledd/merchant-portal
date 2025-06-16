import { Controller, FormState } from "react-hook-form";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SelectSearch } from "eds-react";
import { SENT_ATTACHMENT } from "../../../../NotificationHistory.types";
import { NotificationHistoryFilterMenuValues } from "../../NotificationHistoryFilter.types";

interface Props {
  control: Control<NotificationHistoryFilterMenuValues>;
  formState: FormState<NotificationHistoryFilterMenuValues>;
  selectSearchKey: boolean | undefined;
}

export const AttachmentContentType = ({ control, formState }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="-mr-4">
      <Controller
        name="attachmentContentType"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <div className="w-full">
            <SelectSearch
              key={field.value}
              multiSelect={false}
              items={SENT_ATTACHMENT}
              displayKey={"id"}
              placeholder={t("SearchCriteria.searchPlaceHolder") as string}
              label={t("notificationHistory.sent_attachment") as string}
              title={t("notificationHistory.sent_attachment") as string}
              btnstyles="w-[30rem]"
              dropDownStyles="w-[30rem]"
              initialSelectedItems={[
                {
                  id: String(field.value),
                  label: "",
                },
              ]}
              fullWidth={true}
              onChange={(selectedOption) => {
                field.onChange(selectedOption[0]);
              }}
              inputError={formState.errors.attachmentContentType?.message}
            />
          </div>
        )}
      />
    </div>
  );
};
