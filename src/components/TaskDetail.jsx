// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import TaskInfoToCreateTask from "./TaskDetails/TaskInfoToCreateTask";
// import SidebarRight from "./TaskDetails/SidebarRight";
// import "../assets/css/TaskDetails/TaskDetail.css";

// const commentsData = [
//   // { author: "Nguyen Minh Hieu", text: "Comfort & Concentration" },
//   // {
//   //   author: "U ba kis tan",
//   //   text: "hello mn, cho mình hỏi là lúc điền form mình có điền sai tên của mình ấy ạ, thì có cách nào sửa không ạ",
//   // },
// ];

// const CreateTask = ({ onClose }) => {
//   const navigate = useNavigate();
//   const [showComments, setShowComments] = useState(false);
//   const [taskTitle, setTaskTitle] = useState("Untitled"); // State để lưu title

//   const handleClose = () => {
//     navigate("/project/board");
//   };

//   // Callback để nhận title từ TaskInfoToCreateTask
//   const handleTitleChange = (newTitle) => {
//     setTaskTitle(newTitle);
//   };

//   return (
//     <div className="task-detail-popup">
//       <div className="task-detail-content">
//         <div className="task-detail-header">
//           <h4 className="task-detail-title">
//             Mobile App{taskTitle ? `/${taskTitle}` : ""}
//           </h4>
//           <button
//             className="close-btn"
//             onClick={handleClose}
//             aria-label="Close"
//           >
//             <span aria-hidden>✕</span>
//           </button>
//         </div>

//         <div className="task-main-body">
//           <div className="task-info-container">
//             <TaskInfoToCreateTask onTitleChange={handleTitleChange} />
//           </div>

//           <div className="sidebar-right-container">
//             <SidebarRight
//               showComments={showComments}
//               setShowComments={setShowComments}
//               comments={commentsData}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateTask;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import TaskInfoToCreateTask from "./TaskDetails/TaskInfoToCreateTask";
import SidebarRight from "./TaskDetails/SidebarRight";
import axios from "axios";
import "../assets/css/TaskDetails/TaskDetail.css";

const commentsData = [];

const CreateTask = ({ onClose }) => {
  const navigate = useNavigate();
  const { id: initialStatus } = useParams(); // Get the column id (e.g., "todo", "process", "done")
  const location = useLocation();
  const { projectId } = location.state || {}; // Get projectId from navigation state
  const [showComments, setShowComments] = useState(false);
  const [taskTitle, setTaskTitle] = useState("Untitled");
  const [error, setError] = useState(null);
  const [projectName, setProjectName] = useState("Mobile App");

  // Map the column id to the status
  const statusMap = {
    todo: "To do",
    process: "In Progress",
    done: "Done",
  };
  const initialTaskStatus = statusMap[initialStatus] || "To do";

  const handleClose = () => {
    navigate(`/project/board/${projectId}`);
  };

  const handleTitleChange = (newTitle) => {
    setTaskTitle(newTitle);
  };

  // Fetch project name
  useEffect(() => {
    const fetchProjectName = async () => {
      try {
        const api = axios.create({
          baseURL: "http://localhost:8881/api",
          headers: {
            accept: "application/json",
          },
          withCredentials: true,
        });

        const accessToken =
          localStorage.getItem("access_token") ||
          sessionStorage.getItem("access_token");
        if (!accessToken) {
          throw new Error("No access token found in storage");
        }

        const config = {
          headers: {
            authentication: accessToken,
            accept: "application/json",
          },
        };

        const response = await api.get(`/projects/${projectId}`, config);
        setProjectName(response.data.project_name || "Mobile App");
      } catch (err) {
        console.error("Error fetching project name:", err);
        setError("Failed to fetch project name");
        setProjectName("Mobile App");
      }
    };

    if (projectId) {
      fetchProjectName();
    }
  }, [projectId]);

  return (
    <div className="task-detail-popup">
      <div className="task-detail-content">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="task-detail-header">
          <h4 className="task-detail-title">
            {projectName}
            {taskTitle ? ` / ${taskTitle}` : ""}
          </h4>
          <button
            className="close-btn"
            onClick={handleClose}
            aria-label="Close"
          >
            <span aria-hidden>✕</span>
          </button>
        </div>

        <div className="task-main-body">
          <div className="task-info-container">
            <TaskInfoToCreateTask
              onTitleChange={handleTitleChange}
              projectId={projectId}
              initialStatus={initialTaskStatus}
            />
          </div>

          <div className="sidebar-right-container">
            <SidebarRight
              showComments={showComments}
              setShowComments={setShowComments}
              comments={commentsData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
