import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "../../assets/css/TaskDetails/TaskInfoToCreateTask.css";

// API base URL từ biến môi trường
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8881/api";

// Hàm tạo màu ngẫu nhiên dựa trên tên
const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEEAD",
    "#D4A5A5",
    "#9B59B6",
    "#3498DB",
    "#E74C3C",
    "#2ECC71",
  ];
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const TaskInfo = ({ onTitleChange, projectId, initialStatus }) => {
  const navigate = useNavigate();
  const [copySuccess, setCopySuccess] = useState(false);
  const [title, setTitle] = useState("Untitled");
  const [taskShort, setTaskShort] = useState("");
  const [description, setDescription] = useState("Add description here.");
  const [status, setStatus] = useState(initialStatus || "To do");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [priority, setPriority] = useState("Low");
  const [position, setPosition] = useState("None");
  const [attachments, setAttachments] = useState([]);
  const [modules, setModules] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [isEditing, setIsEditing] = useState({
    title: false,
    taskShort: false,
    description: false,
    status: false,
    dates: false,
    priority: false,
    position: false,
    phone: false,
    link: false,
    module: false,
    sprint: false,
  });
  const [error, setError] = useState(null);

  const statusOptions = ["To do", "In Progress", "Done", "Backlog"];
  const priorityOptions = ["High", "Mid", "Low", "Critical"];

  // Tạo instance axios với cấu hình
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      accept: "application/json",
    },
    withCredentials: true,
  });

  // Lấy token từ storage
  const getAuthToken = () => {
    return (
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token")
    );
  };

  // Fetch dữ liệu: modules và sprints
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          navigate("/login");
          return;
        }

        const config = {
          headers: {
            authentication: token,
            accept: "application/json",
          },
        };

        // Fetch modules
        // const modulesResponse = await api.get(
        //   `/projects/${projectId}/modules/0/10`,
        //   config
        // );
        // setModules(modulesResponse.data.modules || []);

        // Fetch sprints
        // const sprintsResponse = await api.get(
        //   `/projects/${projectId}/sprints/0/10`,
        //   config
        // );
        // setSprints(sprintsResponse.data.sprints || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError("Authentication error. Please log in again.");
          navigate("/login");
        } else {
          setError(`Failed to load data: ${err.message}`);
        }
      }
    };

    if (projectId) {
      fetchData();
    }
  }, [projectId, navigate]);

  const onDrop = useCallback((acceptedFiles) => {
    setAttachments((prev) => [
      ...prev,
      ...acceptedFiles.map((file) => ({
        name: file.name,
        type: file.type.split("/")[0],
        path: URL.createObjectURL(file),
        size: file.size,
      })),
    ]);
  }, []);

  const handleFileClick = (filePath) => {
    window.open(filePath, "_blank");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  });

  const formatDisplayDate = (date) => {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    return "Tomorrow";
  };

  const createTask = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No access token found");
      }

      const config = {
        headers: {
          authentication: token,
          accept: "application/json",
        },
      };

      const statusMap = {
        "To do": "TODO",
        "In Progress": "IN_PROGRESS",
        Done: "DONE",
        Backlog: "BACKLOG",
      };

      const priorityMap = {
        High: "HIGH",
        Mid: "MID",
        Low: "LOW",
        Critical: "CRITICAL",
      };

      console.log("Priority before mapping:", priority);
      const mappedPriority = priorityMap[priority] || "LOW";
      console.log("Mapped priority:", mappedPriority);

      const taskData = {
        task_name: title,
        task_short: taskShort || "TASK-" + Date.now().toString().slice(-5),
        description: description,
        task_status: statusMap[status] || "TODO",
        task_priority: mappedPriority,
        start_date: startDate.toISOString().split("T")[0],
        end_date: endDate.toISOString().split("T")[0],
        module_id: selectedModule || null,
        sprint_id: selectedSprint || null,
      };
      console.log("Task data being sent to API:", taskData);
      const response = await api.post(
        `/projects/${projectId}/tasks/create`,
        taskData,
        config
      );

      navigate(`/project/board/${projectId}?refresh=true`);
    } catch (err) {
      console.error("Error creating task:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError("Authentication error. Please log in again.");
        navigate("/login");
      } else {
        setError(`Failed to create task: ${err.message}`);
      }
    }
  };

  return (
    <div className="task-info">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {isEditing.title ? (
        <input
          type="text"
          className="task-title-input"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            onTitleChange(e.target.value);
          }}
          onBlur={() => setIsEditing({ ...isEditing, title: false })}
          autoFocus
        />
      ) : (
        <h3
          className="task-title-create-task"
          onClick={() => setIsEditing({ ...isEditing, title: true })}
        >
          {title}
        </h3>
      )}

      {isEditing.description ? (
        <textarea
          className="task-description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => setIsEditing({ ...isEditing, description: false })}
          rows="3"
          autoFocus
        />
      ) : (
        <p
          className="task-description"
          onClick={() => setIsEditing({ ...isEditing, description: true })}
        >
          {description}
        </p>
      )}

      <div className="task-info-grid">
        <div className="field">
          <label>Status</label>
          {isEditing.status ? (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              onBlur={() => setIsEditing({ ...isEditing, status: false })}
              autoFocus
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <span
              className={`status-badge ${status
                .toLowerCase()
                .replace(" ", "-")}`}
              onClick={() => setIsEditing({ ...isEditing, status: true })}
            >
              {status}
            </span>
          )}
        </div>

        <div className="field dates-field">
          <label>Dates:</label>
          {isEditing.dates ? (
            <div className="date-picker-container">
              <div className="date-row">
                <div className="input-with-icon">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect={false}
                    dateFormat="MM/dd/yyyy"
                    className="date-input-small-create-task"
                  />
                  <img
                    src="/assets/icons/calendar_icon.svg"
                    alt="Calendar"
                    className="input-icon-create-task"
                  />
                </div>
              </div>
              <div className="date-row">
                <div className="input-with-icon">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate}
                    showTimeSelect={false}
                    dateFormat="MM/dd/yyyy"
                    className="date-input-small-create-task"
                  />
                  <img
                    src="/assets/icons/calendar_icon.svg"
                    alt="Calendar"
                    className="input-icon-create-task"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="date-view-container">
              <div className="date-view-row">
                <div
                  className="date-time-section"
                  onClick={() =>
                    setIsEditing({
                      ...isEditing,
                      dates: true,
                      editingEnd: false,
                    })
                  }
                >
                  <img
                    src="/assets/icons/calendar_icon.svg"
                    alt="Calendar"
                    className="date-view-icon"
                  />
                  <span className="date-text">
                    {formatDisplayDate(startDate)}
                  </span>
                </div>
              </div>
              <div className="date-view-row">
                <div
                  className="date-time-section"
                  onClick={() =>
                    setIsEditing({
                      ...isEditing,
                      dates: true,
                      editingEnd: true,
                    })
                  }
                >
                  <img
                    src="/assets/icons/calendar_icon.svg"
                    alt="Calendar"
                    className="date-view-icon"
                  />
                  <span className="date-text">
                    {formatDisplayDate(endDate)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="field">
          <label>Priority:</label>
          {isEditing.priority ? (
            <select
              value={priority}
              onChange={(e) => {
                const newPriority = e.target.value;
                console.log("Priority before change:", priority);
                console.log("New priority selected:", newPriority);
                setPriority(newPriority);
              }}
              onBlur={() => setIsEditing({ ...isEditing, priority: false })}
              autoFocus
            >
              {priorityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <span
              className={`task-priority ${priority.toLowerCase()}`}
              onClick={() => setIsEditing({ ...isEditing, priority: true })}
            >
              {priority}
            </span>
          )}
        </div>
      </div>

      <div className="attachments-section">
        <h4>Attachments</h4>
        <div
          {...getRootProps()}
          className={`drop-zone ${isDragActive ? "active" : ""}`}
        >
          <input {...getInputProps()} />
          <p>
            {isDragActive
              ? "Drop files here"
              : "Drag & drop files, or click to select"}
          </p>
        </div>
        <div className="attachment-list">
          {attachments.map((file, index) => (
            <div
              key={index}
              className={`attachment ${file.type}`}
              onClick={() => handleFileClick(file.path)}
            >
              {file.type === "image" ? (
                <img src="/assets/icons/image_icon.svg" alt="Images" />
              ) : (
                <img src="/assets/icons/pdf_icon.svg" alt="PDF" />
              )}
              <span>{file.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="create-task-button-container mt-3">
        <button className="btn btn-primary" onClick={createTask}>
          Create Task
        </button>
      </div>
    </div>
  );
};

export default TaskInfo;
