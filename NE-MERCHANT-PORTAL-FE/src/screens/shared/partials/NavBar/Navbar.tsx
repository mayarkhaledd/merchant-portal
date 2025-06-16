import { IconChevronDown, IconWorld } from "@tabler/icons-react";
import { Button } from "eds-react";
import { useNavbar } from "./useNavbar";
import { NavbarProps } from "./Navbar.types";
import i18n from "@ejada/common/locals/i18n";

export const Navbar = ({
  title = "",
  icon,
  showAppTypeDropDown = true,
  showUser = true,
}: NavbarProps) => {
  const {
    navbarRef,
    userDropdownRef,
    toggleLanguageDropdown,
    changeLanguage,
    selectedUserName,
    showAppTypeDropdown,
    toggleAppTypeDropdown,
    appTypeDropdownRef,
    selectedOption,
    languageDropdownRef,
    showLanguageDropdown,
    handleLogOutClick,
    appTypeMenu,
    handleSelectedOption,
    currentLanguage,
    t,
  } = useNavbar();

  return (
    <div
      ref={navbarRef}
      className="flex justify-between items-center p-2.5 px-10 bg-white shadow-md relative gap-x-6" // Added gap-x-6 here for spacing
    >
      {/* Title on the left */}
      <div className="text-lg font-semibold text-primary-blue">{title}</div>

      {/* Elements on the right aligned and spaced */}
      <div className="flex items-center gap-x-6">
        {" "}
        {/* Additional gap-x-6 to manage spacing between elements */}
        {/* Tenant Dropdown */}
        {showUser && (
          <div className="relative">
            <div
              className="flex items-center cursor-not-allowed"
              ref={userDropdownRef}
            >
              <img
                src={icon}
                alt="User"
                className="rounded-full w-10 h-10 mr-2"
              />
              <div className="flex items-center font-medium text-base text-neutrals/N2">
                {selectedUserName && selectedUserName}
              </div>
            </div>
          </div>
        )}
        {/* App Type Dropdown */}
        {showAppTypeDropDown && (
          <div className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={toggleAppTypeDropdown}
              ref={appTypeDropdownRef}
            >
              <div className="flex items-center font-medium text-base text-neutrals/N2">
                {selectedOption}
                <IconChevronDown
                  stroke={2}
                  width={18}
                  height={18}
                  className="ml-1"
                />
              </div>
            </div>

            {/* App Type Dropdown Menu */}
            {showAppTypeDropdown && (
              <div className="absolute top-10 left-0 bg-white shadow-md rounded-md z-50 w-48">
                {appTypeMenu.map((appType) => (
                  <div
                    key={appType.id}
                    className={`p-2 cursor-pointer hover:bg-gray-200 ${appType.active ? "bg-gray-100 font-semibold" : ""}`}
                    onClick={() => handleSelectedOption(appType.id)}
                  >
                    {appType.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div
          className="relative cursor-pointer flex items-center mr-7.5"
          onClick={toggleLanguageDropdown}
          ref={languageDropdownRef}
        >
          <div className="flex items-center text-sm font-semibold text-primary-blue">
            <IconWorld stroke={2} width={18} height={18} className="mr-1" />{" "}
            {currentLanguage === "en" ? "English" : "العربية"}
          </div>
          <IconChevronDown stroke={2} width={18} height={18} />
          <div
            className={`absolute top-9  bg-white shadow-md rounded-md z-50 w-24 ${
              showLanguageDropdown ? "block" : "hidden"
            }`}
          >
            <div
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                changeLanguage("en");
              }}
            >
              {t("English")}
            </div>
            <div
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                changeLanguage("ar");
              }}
            >
              {t("Arabic")}
            </div>
          </div>
        </div>
        {/* Logout Button */}
        <Button
          label={i18n.t("logout")}
          onClick={handleLogOutClick}
          size="large"
          state="default"
          type="default"
          buttonVariant="link"
          className="mr-4"
        />
      </div>
    </div>
  );
};
