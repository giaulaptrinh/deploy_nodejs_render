// import { createBrowserRouter } from "react-router-dom";
// import AuthInterface from "./components/AuthInterface";
// import Sidebar from "./components/Sidebar";
// import TaskDetails from './components/TaskDetails/TaskDetail';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AuthInterface />,
//   },
//   {
//     path: "/sidebar",
//     element: <Sidebar />,
//   },
//   {
//     path: "/login",
//     element: <AuthInterface />,
//   },
//   {
//     path: "/register",
//     element: <AuthInterface />,
//   },
//   {
//     path: "/task/:id",
//     element: <TaskDetails/>,
//   },
// ]);

// export default router;

import { createBrowserRouter } from "react-router-dom";
import AuthInterface from "./components/AuthInterface";
import Sidebar from "./components/Sidebar";
import TaskDetails from './components/TaskDetails/TaskDetail';
import ProjectsLayout from './components/Projects/ProjectLayout';

const MainLayout = ({ children }) => (
  <div className="d-flex">
    <Sidebar />
    <div className="content-area flex-grow-1">
      {children}
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthInterface />,
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
    path: "/sidebar",
    element: <MainLayout>

    </MainLayout>,
  },
  {
    path: "/projects",
    element: <MainLayout>
      <ProjectsLayout />
    </MainLayout>,
  },
  {
    path: "/task/:id",
    element: <MainLayout>
      <TaskDetails />
    </MainLayout>,
  },
]);

export default router;
