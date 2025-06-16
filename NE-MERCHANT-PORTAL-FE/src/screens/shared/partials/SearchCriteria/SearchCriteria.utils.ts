import { PagesName } from "@ejada/common/utils";
import { SearchFormData } from "@ejada/screens/shared";

export const handleSearch = (
  data: SearchFormData,
  onSubmit: (state: {
    [key: string]: string | string[] | number | number[] | Date;
  }) => void,
  currentPageName: string,
) => {
  if (!onSubmit) return;
  if (data && onSubmit) {
    switch (currentPageName) {
      case PagesName.EventsManagementPage:
        onSubmit({
          // Case: English letters mixed with numbers, special characters
          ...(data.searchInputField &&
            /^(?=.*[A-Za-z])[A-Za-z0-9_@!#$%^&*()\-=+,./<>?;:"'`~[\]{}\\|]+$/.test(
              data.searchInputField,
            ) && {
              eventCode: data.searchInputField,
            }),
        });
        break;
      case PagesName.BulkNotificationsPage:
        onSubmit({
          // Case: English letters mixed with numbers, special characters
          ...(data.searchInputField &&
            /^(?=.*[A-Za-z])[A-Za-z0-9_@!#$%^&*()\-=+,./<>?;:"'`~[\]{}\\|]+$/.test(
              data.searchInputField,
            ) && {
              eventCode: data.searchInputField,
            }),
        });
        break;
      case PagesName.RecipientManagementPage:
        onSubmit({
          // Case: English letters mixed with numbers, special characters
          ...(data.searchInputField &&
            /^(?=.*[A-Za-z])[A-Za-z0-9_@!#$%^&*()\-=+,./<>?;:"'`~[\]{}\\|]+$/.test(
              data.searchInputField,
            ) && {
              eventCode: data.searchInputField,
            }),
        });
        break;

      case PagesName.EventGroupManagement:
        onSubmit({
          // Case: English letters mixed with numbers, special characters
          ...(data.searchInputField &&
            /^(?=.*[A-Za-z])[A-Za-z0-9_@!#$%^&*()\-=+,./<>?;:"'`~[\]{}\\|]+$/.test(
              data.searchInputField,
            ) && {
              eventGroupId: data.searchInputField,
            }),
        });
        break;
      case PagesName.CustomerPage:
        onSubmit({
          // Case: Pure numbers
          ...(data.searchInputField &&
            /^[0-9]+$/.test(data.searchInputField) && {
              relationValue: data.searchInputField, // Pure numbers
            }),
        });
        break;
      case PagesName.Whatsapp:
        onSubmit({
          // Case: English letters mixed with numbers, special characters
          ...(data.searchInputField &&
            /^(?=.*[A-Za-z])[A-Za-z0-9_@!#$%^&*()\-=+,./<>?;:"'`~[\]{}\\|]+$/.test(
              data.searchInputField,
            ) && {
              templateName: data.searchInputField,
            }),
        });
        break;
      case PagesName.NotificationHistory:
        onSubmit({
          // Case: English letters mixed with numbers, special characters
          ...(data.searchInputField &&
            /^(?=.*[A-Za-z])[A-Za-z0-9_@!#$%^&*()\-=+,./<>?;:"'`~[\]{}\\|]+$/.test(
              data.searchInputField,
            ) && {
              eventCode: data.searchInputField,
            }),
        });
        break;
      default:
        onSubmit({
          ...data,
        });
        break;
    }
  }
};
