import { createBrowserRouter } from "react-router-dom";
import React from "react";
import AuthInterface from "./components/AuthInterface";
import ProjectPageBoard from "./components/ProjectPageBoard";
import ProjectPageList from "./components/ProjectPageList";
import TaskDetail from "./components/TaskDetails/TaskDetail";
import ProjectsLayout from "./components/Projects/ProjectLayout";
import CreateTask from "./components/TaskDetail";
import CopyTaskDetail from "./components/TaskDetails/CopyTaskDetaill";

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthInterface />, // Trang đăng nhập/đăng ký mặc định
  },
  {
    path: "/login",
    element: <AuthInterface />,
  },
  {
    path: "/register",
    element: <AuthInterface />,
  },
  {
    path: "/project/board/:projectId",
    element: <ProjectPageBoard />,
  },
  {
    path: "/project/list/:projectId",
    element: <ProjectPageList />,
  },
  {
    path: "/project",
    element: <ProjectsLayout />,
  },
  {
    path: "/project/:projectId/task/:taskId",
    element: <TaskDetail />,
  },
  {
    path: "/task/add/:id",
    element: <CreateTask />,
  },
  {
    path: "/task/add",
    element: <CreateTask />,
  },
  {
    path: "/projects",
    element: <ProjectsLayout />,
  },
  {
    path: "/projects/:projectId/tasks/:taskId",
    element: <CopyTaskDetail />,
  },
]);

export default router;
