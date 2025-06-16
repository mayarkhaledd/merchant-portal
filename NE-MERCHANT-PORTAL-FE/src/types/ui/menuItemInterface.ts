export interface MenuItem {
  pageTitle: string;
  text: string;
  icon?: string;
  url?: string;
  children?: MenuItem[];
}
