import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import TaskInfo from "./TaskInfo";
import SidebarRight from "./SidebarRight";
import "../../assets/css/TaskDetails/TaskDetail.css";

// API base URL
const API_BASE_URL = "http://localhost:8881/api";

// Sample comments data (can be fetched from API if needed)
const commentsData = [];

const TaskDetail = ({ onClose, onTaskUpdate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { task, projectId } = location.state || {};
  const selectedTask = task;

  // State declarations
  const [showComments, setShowComments] = useState(false);
  const [projectName, setProjectName] = useState("Untitled Project");
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(selectedTask);

  // Axios instance with cancellation support
  const sourceRef = useRef(null);

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      accept: "application/json",
    },
    withCredentials: true,
  });

  // Helper function to get access token
  const getAccessToken = () => {
    const accessToken =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    console.log("Retrieved access token from storage:", accessToken);
    return accessToken;
  };

  // Fetch project name based on projectId
  const fetchProjectName = useCallback(async () => {
    if (!projectId || isFetching) return;
    setIsFetching(true);
    setError(null);

    if (sourceRef.current) {
      sourceRef.current.cancel("Operation canceled due to new request.");
    }
    sourceRef.current = axios.CancelToken.source();

    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        throw new Error("No access token found in storage");
      }

      const config = {
        headers: {
          authentication: accessToken,
          accept: "application/json",
        },
        cancelToken: sourceRef.current.token,
      };

      const response = await api.get(`/projects/${projectId}`, config);
      setProjectName(response.data.project_name || "Untitled Project");
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled:", err.message);
        return;
      }
      console.error("Error fetching project name:", err);
      setError("Failed to fetch project name");
      setProjectName("Untitled Project");
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setIsFetching(false);
    }
  }, [projectId, navigate, isFetching]);

  // Fetch project name on mount
  useEffect(() => {
    if (projectId) {
      fetchProjectName();
    }

    // Cleanup on unmount
    return () => {
      if (sourceRef.current) {
        sourceRef.current.cancel("Component unmounted.");
      }
    };
  }, [projectId, fetchProjectName]);

  // Sync updatedTask with selectedTask
  useEffect(() => {
    if (selectedTask) {
      setUpdatedTask(selectedTask);
    }
  }, [selectedTask]);

  // Handle closing the task detail view
  const handleClose = () => {
    navigate(`/project/board/${projectId}`);
    if (onClose) {
      onClose();
    }
  };

  // Handle task updates from TaskInfo
  const handleTaskUpdate = (newTask) => {
    setUpdatedTask(newTask);
    if (onTaskUpdate) {
      onTaskUpdate(newTask);
    }
  };

  // Redirect if no task is provided
  if (!selectedTask || !projectId) {
    navigate(`/project/board/${projectId || ""}`);
    return null;
  }

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
            {`${projectName}${
              updatedTask?.title ? ` / ${updatedTask.title}` : ""
            }`}
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
            <TaskInfo
              selectedTask={updatedTask}
              onTaskUpdate={handleTaskUpdate}
              isTaskDetail={true}
              projectId={projectId}
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

export default TaskDetail;
