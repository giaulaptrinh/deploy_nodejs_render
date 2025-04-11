import React, { useState } from 'react';
import TaskInfo from './TaskInfo';
import CommentSection from './CommentSection';
import SidebarRight from './SidebarRight';
import '../../assets/css/TaskDetail.css';

const commentsData = [
  { author: 'Nguyen Minh Hieu', text: 'Comfort & Concentration' },
  { author: 'U ba kis tan', text: 'hello mn, cho mình hỏi là lúc điền form mình có điền sai tên của mình ấy ạ, thì có cách nào sửa không ạ' }
];

const TaskDetail = ({ onClose }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="task-detail-popup">
      <div className="task-detail-content">
        <div className="task-detail-header">
          <h4 className="task-detail-title">Task Detail</h4>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <span aria-hidden>✕</span>
          </button>
        </div>

        <div className="task-main-body">
          <div className="task-info-container">
            <TaskInfo />
          </div>

          <div className="sidebar-right-container">
            <SidebarRight showComments={showComments} setShowComments={setShowComments} comments={commentsData} />
          </div>

          {/* <div className="task-detail-panel">
            {!showComments && <CommentSection />}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
