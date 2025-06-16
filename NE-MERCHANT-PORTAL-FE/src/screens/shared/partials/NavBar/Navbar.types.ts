export interface NavbarProps {
  title?: string;
  tenantsMenu?: string[];
  icon?: string;
  showAppTypeDropDown?: boolean;
  showUser?: boolean;
  userName?: string;
  onLogout?: () => void;
  hasNotifications?: boolean;
  showAvatar?: boolean;
  actions?: {
    label: string;
    handle: () => void;
  }[];
  onLanguageClick?: () => void;
  hideArabic?: boolean;
}
