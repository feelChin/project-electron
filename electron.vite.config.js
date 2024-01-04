import {
  defineConfig,
  bytecodePlugin,
  externalizeDepsPlugin,
} from "electron-vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
  },
  renderer: {
    root: "src/renderer",
    resolve: {
      alias: {
        "@page": resolve("src/renderer/page/"),
        "@img": resolve("src/renderer/img/"),
        "@style": resolve("src/renderer/style/"),
        "@router": resolve("src/renderer/router/"),
        "@util": resolve("src/renderer/util/"),
        "@http": resolve("src/renderer/http/"),
        "@hook": resolve("src/renderer/hook/"),
        "@component": resolve("src/renderer/component/"),
      },
    },
    plugins: [
      react({
        babel: {
          plugins: ["@babel/plugin-transform-react-jsx"],
        },
      }),
    ],
  },
});
