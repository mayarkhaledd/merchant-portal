import { NavigationButton } from "eds-react";
import { useTranslation } from "react-i18next";

interface ITemplate {
  recipientType: "CUSTOMER" | "CONTACT" | string;
  isAdhoc?: boolean;
}

export const DownloadTemplateFile = ({ recipientType, isAdhoc }: ITemplate) => {
  const { t } = useTranslation();

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Define base templates without parameters
    const baseCustomerTemplate = "RelationType,RelationValue,TenantId,LangPref";
    const baseNonCustomerTemplate =
      "LangPref,NotificationMethod_1,Contact_1,EmailCC,EmailBCC,EmailReplyTo";

    // Add parameter columns for non-adhoc cases
    const paramColumns = isAdhoc ? "" : ",paramValue,paramCode";

    // Create the final CSV content based on recipient type and adhoc status
    const csvContent =
      recipientType === "CUSTOMER"
        ? `${baseCustomerTemplate}${paramColumns}`
        : `${baseNonCustomerTemplate}${paramColumns}`;
    try {
      // Create a Blob with the CSV content
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      // Create download link
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);

      // Add suffix to filename for adhoc cases
      const suffix = isAdhoc ? "_Adhoc" : "_Event";
      link.setAttribute(
        "download",
        recipientType === "CUSTOMER"
          ? `Customer_Template${suffix}.csv`
          : `NonCustomer_Template${suffix}.csv`,
      );

      document.body.appendChild(link);

      // Trigger download
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href); // Clean up the URL object
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="flex justify-between items-center font-readexProSemiBold600 my-7">
      <span>{t("bulk-notifications.do_not_have_template")}</span>
      <NavigationButton
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        size="small"
        onClick={handleDownload}
      >
        {t("bulk-notifications.download_template")}
      </NavigationButton>
    </div>
  );
};
