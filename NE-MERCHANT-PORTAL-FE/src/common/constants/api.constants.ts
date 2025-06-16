export const APIVersion = "/v1";

export const PublicRoutes = {
  baseURL:
    import.meta.env.MODE == "development"
      ? import.meta.env.VITE_LOCAL_SERVER
      : import.meta.env.VITE_PUBLIC_SERVER,
  // Authentication
  resendOtp: `/apim/ne/notification/otp/resend`,
  verifyToken: `/apim/ne/sec/session/verify`,
  //authenticateUser: `/apim/ne/sec/appUsr/authenticate`,
  authenticateUser: `/core/authenticate`,
  verifyOtp: `/mfa/otp/verify`,
  changePassword: `/apim/ne/sec/appUsr/changePassword`,
  logout: `/apim/ne/sec/appUsr/logout`,
  refershToken: `/apim/ne/sec/appUsr/refreshToken`,
  // End authentication
  notificationEvents: `/core/notification-events`,
  notificationParameters: `/core/notification-parameters`,
  notificationChannels: `/core/notification-channels`,
  createNotification: `/web/requests`,
  initResetPassword: `/users/init-reset-password`,
  messages: `/ods/messages`,
  getEventGroups: `/core/event-groups`,
  messagesStatusLogs: `/ods/messages/status-logs`,
  createSystem: `/core/app-types`,
  eventGroup: `/core/event-groups`,
  tenants: `/core/tenants`,
  customers: `/core/customers`,
  events: `/core/merchant/events`,
  whatsapp: `/core/whatsapp/templates`,
  senders: `/core/tenants/senders`,
};
const LocalRoutes = {
  baseURL: "",
  // Authentication
  resendOtp: `/apim/ne/notification/otp/resend`,
  verifyToken: `/apim/ne/sec/session/validateToken`,
  authenticateUser: `${APIVersion}/authenticate`,
  verifyOtp: `/mfa/otp/verify`,
  changePassword: `/apim/ne/sec/appUsr/changePassword`,
  logout: `/apim/ne/sec/appUsr/logout`,
  refershToken: `/apim/ne/sec/appUsr/refreshToken`,
  // End authentication
  notificationEvents: `${APIVersion}/notification-events`,
  notificationParameters: `${APIVersion}/notification-parameters`,
  notificationChannels: `${APIVersion}/notification-channels`,
  createNotification: `${APIVersion}/requests`,
  getEventGroups: `${APIVersion}/event-groups`,
  messages: `${APIVersion}/messages`,
  messagesStatusLogs: `${APIVersion}/messages/status-logs`,
  createSystem: `${APIVersion}/app-types`,
  eventGroup: `${APIVersion}/event-groups`,
  tenants: `${APIVersion}/tenants`,
  customers: `${APIVersion}/customers`,
  events: `${APIVersion}/merchant/events`,
  whatsapp: `${APIVersion}/whatsapp/templates`,
  senders: `${APIVersion}/tenants/senders`,
};

export const API =
  import.meta.env.MODE == "development" ? LocalRoutes : PublicRoutes;
