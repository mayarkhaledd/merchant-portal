import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "@ejada/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@ejada/common/sheets/index.css";
import "@ejada/common/locals/i18n";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-phone-number-input/style.css";
import "../node_modules/eds-react/src/common/components/PhoneInputField/PhoneInput.module.css";
import "../node_modules/eds-react/src/common/components/PhoneInputField/PhoneInput.css";
import "../node_modules/eds-react/src/common/components/PhoneInputField/Components/CustomCountrySelect/CustomCountrySelect.css";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback, AppLayoutWrapper } from "@ejada/common/wrappers";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppLayoutWrapper>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <RouterProvider router={AppRouter} />
          <ToastContainer />
        </ErrorBoundary>
      </AppLayoutWrapper>
    </QueryClientProvider>
  </React.StrictMode>,
);
