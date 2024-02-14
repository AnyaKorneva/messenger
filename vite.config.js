import handlebars from "vite-plugin-handlebars";
import {resolve} from "path";
import {defineConfig} from "vite";
import previewsMocks from "./src/mocks/previews";
import messagesMocks from "./src/mocks/messages";
import profileMocks from "./src/mocks/profile";

const pageData = {
  "/pages/chat/chat.html": {
    chatPreviews: previewsMocks,
    messages: messagesMocks,
  },
  "/pages/profile/profile.html": {
    profileInfo: profileMocks,
  },
};

export default defineConfig({
  publicDir: resolve(__dirname, "public"),
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/components"),
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
  ],
  root: resolve(__dirname, "src"),
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        index: resolve(__dirname, "/index.html"),
        chat: resolve(__dirname, "/pages/chat/chat.html"),
        login: resolve(__dirname, "/pages/auth/login.html"),
        register: resolve(__dirname, "/pages/auth/register.html"),
        commonSettings: resolve(__dirname, "/pages/profile/commonSettings.html"),
        passwordSettings: resolve(__dirname, "/pages/profile/passwordSettings.html"),
        profile: resolve(__dirname, "/pages/profile/profile.html"),
        404: resolve(__dirname, "/pages/error/404.html"),
        500: resolve(__dirname, "/pages/error/500.html"),
      },
    },
  },
});
