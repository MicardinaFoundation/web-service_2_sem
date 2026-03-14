import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/callbackSend", component: "callbackSend" },
    { path: "/studentsList", component: "studentsList" },
  ],
  npmClient: 'npm',
});
