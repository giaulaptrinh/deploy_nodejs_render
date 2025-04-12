import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import TaskPageHeader from "./ProjectPage/TaskPageHeader";
import ProjectTaskList from "./ProjectPage/ProjectTaskList";
import TaskInfo from "./TaskDetails/TaskInfo";
import "../assets/css/ProjectPage/ProjectPage.css";
import { useParams } from "react-router-dom";

const ProjectPageList = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [viewMode, setViewMode] = useState("");
  const { projectId } = useParams();

  // Handle task selection
  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  // Handle task update
  const handleTaskUpdate = (updatedTask) => {
    setSelectedTask(updatedTask);
  };

  // Toggle between kanban and list views
  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <Sidebar />
      <div className="main-content d-flex flex-column flex-grow-1">
        <Header />
        <div className="scrollable-content-1 d-flex flex-grow-1">
          <div className="calendar-container flex-grow-1">
            <TaskPageHeader
              onViewModeChange={toggleViewMode}
              activeView={viewMode}
            />

            <ProjectTaskList
              projectId={projectId}
              onTaskSelect={handleTaskSelect}
              onTaskUpdate={handleTaskUpdate}
            />
          </div>

          <div className="task-info-sidebar">
            {selectedTask ? (
              <TaskInfo
                selectedTask={selectedTask}
                onTaskUpdate={handleTaskUpdate}
                projectId={projectId}
              />
            ) : (
              <div className="no-task-selected">
                <h2>No Task Selected</h2>
                <p>Please select a task to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPageList;
