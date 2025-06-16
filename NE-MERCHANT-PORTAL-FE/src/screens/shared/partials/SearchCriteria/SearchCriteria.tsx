import { Controller, useForm } from "react-hook-form";
import { SearchCriteriaProps, SearchFormData } from "./SearchCriteria.types";
import { Button, InputField } from "eds-react";
import { ColorValues, Sizes, Types } from "@ejada/common";
import SearchIcon from "@ejada/common/assets/SearchIcon.svg";
import { IconFilterFilled, IconRestore } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ExportButton, handleSearch } from "@ejada/screens";

export const SearchCriteria: React.FC<SearchCriteriaProps> = ({
  searchContainerStyle,
  setIsDrawerOpen,
  buttonStyle,
  placeHolder,
  onSubmit,
  currentPageName,
  hideFilter,
  exportData,
  fileName,
  exportRefetchData,
  isRefetchedDataError,
  errorMessage,
  isRefetchDataSuccess,
  exportSearchQuery,
  isEnglish,
  prefix,
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit, formState, reset } = useForm<SearchFormData>({
    mode: "onSubmit",
    defaultValues: {
      searchInputField: "",
    },
  });
  const onSearch = (data: SearchFormData) => {
    handleSearch(data, onSubmit, currentPageName as string);
  };
  const handleOpenDrawer = () => {
    setIsDrawerOpen && setIsDrawerOpen(true);
  };
  return (
    <form
      onSubmit={handleSubmit(onSearch)}
      className="flex items-center gap-2.5 py-2 w-full"
    >
      <div className={`${searchContainerStyle}`}>
        <Controller
          name="searchInputField"
          control={control}
          render={({ field }) => (
            <div className="relative">
              <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10">
                <img src={SearchIcon} alt="search-icon" />
              </i>
              <InputField
                className={`pl-10 pr-3 border  h-full !text-[14px] rounded-lg leading-4 w-full font-readexProRegular text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-dark focus:border-primary-dark ${formState.errors.searchInputField ? "border-red-400" : "border-[#A3A3A8]"}`}
                noStar
                type={Types.EmailType}
                placeHolder={placeHolder}
                color={ColorValues.Gray}
                size={Sizes.Large}
                style={{ width: "100%" }}
                isRequired={true}
                {...field}
              />
            </div>
          )}
        />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          type="default"
          className={`${buttonStyle}`}
          onClick={handleSubmit(onSearch)}
          label={t("SearchCriteria.searchLabel") as string}
          size="small"
          state={"default"}
        />
        <ExportButton
          data={exportData}
          fileName={fileName}
          refetchData={exportRefetchData}
          isRefetchedDataError={isRefetchedDataError}
          errorMessage={errorMessage}
          isRefetchDataSuccess={isRefetchDataSuccess}
          exportSearchQuery={exportSearchQuery}
          isEnglish={isEnglish}
          prefix={prefix}
        />
        {!hideFilter && (
          <Button
            onClick={() => {
              handleOpenDrawer();
            }}
            type="withIcon"
            iconPadding={false}
            size="small"
            icon={<IconFilterFilled />}
            state="default"
            label=""
          />
        )}
        <Button
          onClick={(e) => {
            e.preventDefault();
            onSearch({
              searchInputField: "",
            });
            reset();
          }}
          size="small"
          label=""
          buttonVariant="outlined"
          type="withIcon"
          state="default"
          icon={<IconRestore />}
        />
      </div>
    </form>
  );
};
