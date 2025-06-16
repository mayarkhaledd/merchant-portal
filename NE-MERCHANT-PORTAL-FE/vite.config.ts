import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: mode === "production" ? "/esharat/" : "/", //
    resolve: {
      alias: {
        "@ejada": path.join(__dirname, "src/"),
        "@ejadaPackage": path.join(__dirname, "package.json"),
      },
    },
    server: {
      proxy:
        mode === "development"
          ? {
              "/v1/customers": {
                target: "http://localhost:8087/",
                changeOrigin: true,
                secure: false,
              },
              "/v1/messages": {
                target: "http://localhost:8091/",
                changeOrigin: true,
                secure: false,
              },
              "/v1/messages/status-logs": {
                target: "http://localhost:8091/",
                changeOrigin: true,
                secure: false,
              },

              "/v1/event-groups": {
                target: "http://localhost:8087/",
                changeOrigin: true,
                secure: false,
              },

              "/v1/notification-events": {
                target: "http://localhost:8087/",
                changeOrigin: true,
                secure: false,
              },

              "/v1/requests": {
                target: "http://localhost:8090/",
                changeOrigin: true,
                secure: false,
              },
              "/v1/notification-channels": {
                target: "http://localhost:8087/",
                changeOrigin: true,
                secure: false,
              },
            }
          : undefined,
    },
  };
});
