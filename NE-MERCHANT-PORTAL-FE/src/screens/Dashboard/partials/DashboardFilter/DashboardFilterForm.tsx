import React from "react";
import { Controller } from "react-hook-form";
import { Button, DatePicker } from "eds-react";

import { useDashboardFilterForm } from "./useDashboardFilterForm";
import { formattingMonth } from "../../utils";
import { CardCustom } from "../ui/CardCustom";

export const DashboardFilterForm: React.FC = () => {
  const {
    control,
    formState,
    formValues,
    isApplyButtonDisabled,
    t,
    handleSubmit,
    onSubmit,
  } = useDashboardFilterForm();

  return (
    <div className="flex flex-col max-h-full mb-4 pr-5 pl-2">
      <CardCustom>
        <div className="flex items-center gap-[20px] mb-8">
          <div className="w-full">
            <Controller
              name="fromDate"
              control={control}
              defaultValue={formValues?.fromDate}
              render={({ field }) => (
                <DatePicker
                  value={field.value ? new Date(field.value) : undefined}
                  label={t("dashboard.start_date").toString()}
                  classes="border-grey"
                  onChange={(date) => {
                    if (date) {
                      field.onChange(formattingMonth(date));
                    } else {
                      field.onChange(undefined);
                    }
                  }}
                  isRequired
                  inputError={formState.errors.fromDate?.message as string}
                />
              )}
            />
          </div>
          <div className="relative w-[100%] flex items-center gap-6">
            <div className="w-full">
              <Controller
                name="toDate"
                control={control}
                defaultValue={formValues?.toDate}
                render={({ field }) => (
                  <DatePicker
                    value={field.value ? new Date(field.value) : undefined}
                    label={t("dashboard.end_date").toString()}
                    classes="border-grey"
                    onChange={(date) => {
                      if (date) {
                        field.onChange(formattingMonth(date));
                      } else {
                        field.onChange(undefined);
                      }
                    }}
                    isRequired
                    inputError={formState.errors.toDate?.message as string}
                  />
                )}
              />
            </div>
          </div>
          <div className="relative w-[100%] flex items-center pt-7 gap-6">
            <Button
              label={t("whatsapp.filter_menu.apply")}
              size="small"
              state={isApplyButtonDisabled ? "disabled" : "default"}
              type="default"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </CardCustom>
    </div>
  );
};
