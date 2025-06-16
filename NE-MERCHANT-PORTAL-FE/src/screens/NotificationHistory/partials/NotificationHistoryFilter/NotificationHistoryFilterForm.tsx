import { Button, PhoneInputField } from "eds-react";
import { NotificationHistoryFormProps } from "../../NotificationHistory.types";
import { Status } from "./NotificationHistoryFiilterItems/StatusFilter";
import useNotificationHistoryForm from "./useNotificationHistoryForm";
import { useTranslation } from "react-i18next";
import { EventCode } from "./NotificationHistoryFiilterItems/InputFieldItems/EventCode";
import { RelationValue } from "./NotificationHistoryFiilterItems/InputFieldItems/RelationValue";
import { MessageID } from "./NotificationHistoryFiilterItems/InputFieldItems/MessageID";
import { RequestID } from "./NotificationHistoryFiilterItems/InputFieldItems/RequestID";
import { ExternalRequestID } from "./NotificationHistoryFiilterItems/InputFieldItems/ExternalRequestID";
import { EmailContact } from "./NotificationHistoryFiilterItems/InputFieldItems/EmailContact";
import { NotificationHistoryValidationSchema } from "./NotificationHistoryValidationSchema";
import { SourceSystem } from "./NotificationHistoryFiilterItems/AccordingItems/SourceSystem";
import { NotificationChannel } from "./NotificationHistoryFiilterItems/AccordingItems/NotificationChannel";
import { RelationType } from "./NotificationHistoryFiilterItems/AccordingItems/RelationType";
import { AttachmentContentType } from "./NotificationHistoryFiilterItems/AccordingItems/AttachmentContentType";
import { MessageLanguage } from "./NotificationHistoryFiilterItems/AccordingItems/MessageLanguage";
import { EventPriority } from "./NotificationHistoryFiilterItems/AccordingItems/EventPriority";
import i18n from "@ejada/common/locals/i18n";
import { Controller } from "react-hook-form";

export const NotificationHistoryForm = ({
  closeDrawer,
  setSearchQuery,
  activeSearchCriteria,
  setActiveSearchCriteria,
}: NotificationHistoryFormProps) => {
  const { t } = useTranslation();

  const {
    formState,
    isApplyButtonDisabled,
    handleSubmit,
    onSubmit,
    watch,
    handleCancel,
    handleClear,
    //clearDynamicLabels,
    control,
    isClearAllButtonDisabled,
    setIsSent,
    setIsFailed,
    isFailed,
    isSent,
    selectSearchKey,
    sourceSystemsMenu,
    channelsMenu,
  } = useNotificationHistoryForm({
    closeDrawer,
    setSearchQuery,
    activeSearchCriteria,
    setActiveSearchCriteria,
  });
  const isRtl = i18n.language === "ar";
  return (
    <div>
      <div className={`absolute ${isRtl ? "left-8" : "right-8"} top-[37.5px] `}>
        <button
          type="button"
          className="text-primary-blue font-readexProMedium500 text-sm -mt-7 disabled:text-neutrals/N4"
          onClick={handleClear}
          disabled={isClearAllButtonDisabled}
        >
          {t("notificationHistory.filterMenu.clear_all")}
        </button>
      </div>
      <form className="relative h-full mr-4">
        <div className="overflow-y-auto ">
          <div className="mr-4">
            <SourceSystem
              control={control}
              formState={formState}
              selectSearchKey={selectSearchKey}
              sourceSystemMenu={sourceSystemsMenu ? sourceSystemsMenu : []}
            />
          </div>
          <div className="mb-6"></div>
          <EventCode control={control} formState={formState} t={t} />
          <div className="mb-6"></div>
          <div className="mr-4">
            <NotificationChannel
              control={control}
              formState={formState}
              selectSearchKey={selectSearchKey}
              channelMenu={channelsMenu ? channelsMenu : []}
            />
          </div>
          <div className="mb-6"></div>
          <div className="mr-4">
            <RelationType
              control={control}
              formState={formState}
              selectSearchKey={selectSearchKey}
            />
          </div>
          <div className="mb-6"></div>
          <RelationValue control={control} formState={formState} t={t} />
          <div className="mb-6"></div>
          <Status
            control={control}
            watch={watch}
            //clearDynamicLabels={clearDynamicLabels}
            isSent={isSent}
            setIsSent={setIsSent}
            isFailed={isFailed}
            setIsFailed={setIsFailed}
          />

          <div className="mb-6"></div>
          <div className="mr-4">
            <EventPriority
              control={control}
              formState={formState}
              selectSearchKey={selectSearchKey}
            />
          </div>
          <div className="mr-4">
            <MessageLanguage
              control={control}
              formState={formState}
              selectSearchKey={selectSearchKey}
            />
          </div>
          <div className="mb-6"></div>
          <MessageID control={control} formState={formState} t={t} />
          <div className="mb-6"></div>
          <RequestID control={control} formState={formState} t={t} />
          <div className="mb-6"></div>
          <ExternalRequestID control={control} formState={formState} t={t} />
          <div className="mb-6"></div>
          <EmailContact control={control} formState={formState} t={t} />
          <div className="mb-6"></div>
          <div dir={"ltr"}>
            <Controller
              name="mobileContact"
              control={control}
              defaultValue=""
              rules={NotificationHistoryValidationSchema.mobile}
              render={({ field }) => (
                <PhoneInputField
                  className=""
                  color="gray"
                  label={t("notificationHistory.phone")}
                  error={formState.errors?.mobileContact}
                  placeholder={
                    t("notificationHistory.mobile_placeholder") as string
                  }
                  setIsValidPhone={() => {}}
                  size="sm"
                  style={{}}
                  {...field}
                  value={field.value || ""}
                />
              )}
            />
          </div>
          <div className="mb-6"></div>
          <div className="mr-4">
            <AttachmentContentType
              control={control}
              formState={formState}
              selectSearchKey={selectSearchKey}
            />
          </div>
          <div className="mb-3"></div>
          <div className="flex justify-end p-2 mb-4 mt-4 gap-4">
            <Button
              state="default"
              type="default"
              size="small"
              buttonVariant="outlined"
              onClick={handleCancel}
              label={t("notificationHistory.cancel")}
            />
            <Button
              label={t("notificationHistory.apply")}
              size="small"
              state={isApplyButtonDisabled ? "disabled" : "default"}
              type="default"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
