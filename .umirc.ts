import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/callbackSend", component: "callbackSend" },
    { path: "/studentsList", component: "studentsList" },
    { path: "/join", component: "join" },
  ],
  access:{},
  request: {},
  initialState: {},
  model: {},
  proxy: {
    '/api/': {
      target: 'http://localhost:10280',
      changeOrigin: true,
    },
  },
  npmClient: 'npm',
});
