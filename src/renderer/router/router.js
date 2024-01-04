export const mainRouter = [
  {
    path: "/",
    name: "首页",
    element: () => import("@page/home"),
  },
  {
    path: "/example",
    name: "例子",
    element: () => import("@page/example"),
  },
];

const routes = [
  {
    path: "/",
    element: () => import("@page"),
    children: mainRouter,
  },
  {
    path: "/loadingPage",
    name: "启动加载",
    element: () => import("@page/loadingPage"),
  },
  {
    path: "/updatePage",
    name: "更新程序窗口",
    element: () => import("@page/updatePage"),
  },
  {
    path: "*",
    name: "更新程序窗口",
    element: () => import("@page/home"),
  },
];

export default routes;
