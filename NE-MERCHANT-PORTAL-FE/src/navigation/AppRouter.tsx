import {
  Dashboard,
  Error404,
  ForgotPassword,
  Login,
  SetNewPassword,
} from "@ejada/screens";
import { createBrowserRouter } from "react-router-dom";
import { LayoutWithSidebar, ProtectedRoute } from "@ejada/common/wrappers";
import { EventGroupManagement } from "@ejada/screens/EventGroupManagement";
import { EventsManagement } from "@ejada/screens";

import { AppRoutes } from "./AppRoutes";
import { BulkNotificationsManagement } from "@ejada/screens/BulkNotifications";
import { OTP } from "@ejada/screens/OTP/OTP";
import { RecipientNotifications } from "@ejada/screens/RecipientNotifications";
import { EventsMessageTable } from "@ejada/screens/BulkNotifications/partials/EventMessageTable/EventMessageTable";
import { RecipientEventTable } from "@ejada/screens/RecipientNotifications/partials/CreateEventMessage/EventMessageTable/EventMessageTable";
import { NotificationHistory } from "@ejada/screens/NotificationHistory";
import { SideBarNavigation } from "./SideBarNavigation";
import { MyProfile } from "@ejada/screens/MyProfile";
import { Settings } from "@ejada/screens/Settings";
import { CustomerManagement } from "@ejada/screens/CustomerManagement";
import {
  Whatsapp,
  WhatsappRedirect,
  WhatsappSignupCallback,
} from "@ejada/screens/Whatsapp";
import {
  WhatsappTemplateForm,
  WhatsAppSetupWizard,
} from "@ejada/screens/Whatsapp";
export const AppRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <ProtectedRoute component={Dashboard} />,
      children: [
        {
          path: AppRoutes.eventManagement,
          element: <EventsManagement />,
        },
        {
          path: AppRoutes.eventGroupManagement,
          element: <EventGroupManagement />,
        },
        {
          path: AppRoutes.notificationManagement,
          element: <BulkNotificationsManagement />,
          children: [
            {
              path: AppRoutes.eventMessage,
              element: <EventsMessageTable />,
            },
          ],
        },

        {
          path: AppRoutes.recipientNotifications,
          element: <RecipientNotifications />,
          children: [
            {
              path: AppRoutes.recipientEvent,
              element: <RecipientEventTable />,
            },
          ],
        },
        {
          path: AppRoutes.notificationHistory,
          element: <NotificationHistory />,
        },
        {
          path: AppRoutes.myProfile,
          element: <MyProfile />,
        },
        {
          path: AppRoutes.dashboard,
          element: <MyProfile />,
        },
        {
          path: AppRoutes.settings,
          element: <Settings />,
        },
        {
          path: AppRoutes.whatsapp,
          element: <WhatsappRedirect />,
        },
        {
          path: AppRoutes.templates,
          element: <Whatsapp />,
          children: [
            {
              path: AppRoutes.createWhatsappTemplate,
              element: <WhatsappTemplateForm drawerMode="add" />,
            },
            {
              path: AppRoutes.editWhatsappTemplateId,
              element: <WhatsappTemplateForm drawerMode="edit" />,
            },
            {
              path: AppRoutes.viewWhatsappTemplateId,
              element: <WhatsappTemplateForm drawerMode="view" />,
            },
          ],
        },
        {
          path: AppRoutes.whatsappSignUp,
          element: <WhatsAppSetupWizard />,
        },
        {
          path: AppRoutes.whatsappSignupCallback,
          element: <WhatsappSignupCallback />,
        },
        {
          path: AppRoutes.customerManagement,
          element: <CustomerManagement />,
        },
      ],
    },

    {
      path: AppRoutes.login,
      element: <ProtectedRoute login component={Login} />,
    },
    {
      path: AppRoutes.otp,
      element: <ProtectedRoute isOtpPage component={OTP} />,
    },
    {
      path: AppRoutes.forgotPassword,
      element: <ForgotPassword />,
    },
    {
      path: AppRoutes.setNewPassword,
      element: <SetNewPassword />,
    },
    {
      path: "*",
      element: (
        <LayoutWithSidebar items={SideBarNavigation}>
          <ProtectedRoute
            component={() => (
              <LayoutWithSidebar items={SideBarNavigation}>
                <Error404 />
              </LayoutWithSidebar>
            )}
          />
        </LayoutWithSidebar>
      ),
    },
  ],
  {
    basename: import.meta.env.MODE === "production" ? "/esharat" : "/",
  },
);
