import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../../assets/css/TaskInfo.css';

const TaskInfo = () => {
  const [attachments, setAttachments] = useState([
    { name: 'Research Findings.pdf', type: 'pdf' },
    { name: 'Wireframe.png', type: 'image' }
  ]);

  const onDrop = useCallback(acceptedFiles => {
    setAttachments(prev => [
      ...prev,
      ...acceptedFiles.map(file => ({
        name: file.name,
        type: file.type.split('/')[0]
      }))
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="task-info">
      <h2 className="task-title">Research</h2>
      <p className="task-description">
        User research helps you to create an optimal product for users.
      </p>

      <div className="task-info-grid">
        <div className="task-field" style={{ textAlign: 'left', border: 'none' }}>
          <label>Status:</label>
          <span className="task-status pill to-do">To do</span>
        </div>
        <div className="task-field" style={{ textAlign: 'left', border: 'none' }}>
          <label>Assignees:</label>
          <div className="assignee-badges">
            <span className="assignee">N</span>
            <span className="assignee">H</span>
          </div>
        </div>
        <div className="task-field" style={{ textAlign: 'left', border: 'none' }}>
          <label>Dates:</label>
          <span className="task-dates">Today, 8am → Tomorrow, 9am</span>
        </div>
        <div className="task-field" style={{ textAlign: 'left', border: 'none' }}>
          <label>Priority:</label>
          <span className="task-priority high">High</span>
        </div>
        <div className="task-field" style={{ textAlign: 'left', border: 'none' }}>
          <label>Position:</label>
          <span className="task-position">Dev team</span>
        </div>
        <div className="task-field" style={{ textAlign: 'left', border: 'none' }}>
          <label>Phone Number:</label>
          <span className="task-phonenumber">Empty</span>
        </div>
        <div className="task-field" style={{ textAlign: 'left', border: 'none' }}>
          <label>Email Address:</label>
          <span className="task-email">Empty</span>
        </div>
      </div>

      <div className="attachments-section">
        <h4>Attachments</h4>
        <div 
          {...getRootProps()}
          className={`drop-zone ${isDragActive ? 'active' : ''}`}
        >
          <input {...getInputProps()} />
          <p>{isDragActive ? 'Drop files here' : 'Drag & drop files, or click to select'}</p>
        </div>
        
        <div className="attachment-list">
          {attachments.map((file, index) => (
            <div key={index} className={`attachment ${file.type}`}>
              {file.type === 'pdf' ? '📄' : '🖼️'}
              <span>{file.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskInfo;
