import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Dropdown } from 'react-bootstrap';
import '../../assets/css/ProjectLayout.css';

const ProjectsLayout = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('All');
  const [viewMode, setViewMode] = useState('list'); // 'list' hoặc 'box'

  // Dữ liệu project
  const projects = [
    {
      id: 'project-1',
      name: 'Mobile App',
      description: "Hieu's Team - Retail Application For Anything User Want To Sell, Have A Strong Security System And Millions Of Users",
      members: [
        { name: 'Chloe Mendoza', role: 'Scrum Master', avatar: 'C', avatarImg: '/assets/images/avatar.jpg' },
        { name: 'Nathan Long', role: 'Product Owner', avatar: 'N', avatarImg: '/assets/images/avatar.jpg' },
        { name: 'Brian McCann', role: 'Dev Member', avatar: 'B', avatarImg: '/assets/images/avatar.jpg' },
        { name: 'Thaddeus Silva', role: 'Dev Member', avatar: 'T', avatarImg: '/assets/images/avatar.jpg' },
        { name: 'Kylian Mbappé', role: 'Dev Member', avatar: 'K', avatarImg: '/assets/images/avatar.jpg' }
      ],
      createdBy: 'Nguyen Minh Hieu',
      createdAt: 'Feb 10, 2024',
      epicsCompleted: '2/5',
      sprintsCompleted: 3,
      epics: [
        { name: 'Epic 3', progress: 50, color: '#f44336' },
        { name: 'User Story 3.2', progress: 75, color: '#ff9800' }
      ]
    },
    {
      id: 'project-2',
      name: 'E-Commerce Platform',
      description: "My Friend Passed Away In A Car Crash Three Months Ago, And His Wrecked Car Was Playing This Song On Repeat. He Loved It So Much T...",
      members: [
        { name: 'Chloe Mendoza', role: 'Scrum Master', avatar: 'C', avatarImg: '/assets/images/avatar.jpg' },
        { name: 'Brian McCann', role: 'Dev Member', avatar: 'B', avatarImg: '/assets/images/avatar.jpg' },
        { name: 'Thaddeus Silva', role: 'Dev Member', avatar: 'T', avatarImg: '/assets/images/avatar.jpg' }
      ],
      createdBy: 'Nguyen Minh Hieu',
      createdAt: 'Feb 10, 2024',
      epicsCompleted: '3/4',
      sprintsCompleted: 5,
      epics: [
        { name: 'Epic 2', progress: 80, color: '#4caf50' },
        { name: 'User Story 2.1', progress: 60, color: '#2196f3' }
      ]
    },
    {
      id: 'project-3',
      name: 'CRM System',
      description: "Hieu's Team - Retail Application For Anything User Want To Sell, Have A Strong Security System And Millions Of Users",
      members: [
        { name: 'Nathan Long', role: 'Product Owner', avatar: 'N', avatarImg: '/assets/images/avatar.jpg' },
        { name: 'Brian McCann', role: 'Dev Member', avatar: 'B', avatarImg: '/assets/images/avatar.jpg' },
        { name: 'Kylian Mbappé', role: 'Dev Member', avatar: 'K', avatarImg: '/assets/images/avatar.jpg' }
      ],
      createdBy: 'Nguyen Minh Hieu',
      createdAt: 'Feb 10, 2024',
      epicsCompleted: '1/3',
      sprintsCompleted: 2,
      epics: [
        { name: 'Epic 1', progress: 30, color: '#f44336' },
        { name: 'User Story 1.4', progress: 45, color: '#ff9800' }
      ]
    },
    {
      id: 'project-4',
      name: 'Mobile Game',
      description: "My Friend Passed Away In A Car Crash Three Months Ago, And His Wrecked Car Was Playing This Song On Repeat. He Loved It So Much T...",
      members: [
        { name: 'Chloe Mendoza', role: 'Scrum Master', avatar: 'C', avatarImg: '/assets/images/avatar.jpg' },
        { name: 'Thaddeus Silva', role: 'Dev Member', avatar: 'T', avatarImg: '/assets/images/avatar.jpg' },
        { name: 'Kylian Mbappé', role: 'Dev Member', avatar: 'K', avatarImg: '/assets/images/avatar.jpg' }
      ],
      createdBy: 'Nguyen Minh Hieu',
      createdAt: 'Feb 10, 2024',
      epicsCompleted: '0/2',
      sprintsCompleted: 1,
      epics: [
        { name: 'Epic 4', progress: 10, color: '#9c27b0' },
        { name: 'User Story 4.1', progress: 25, color: '#e91e63' }
      ]
    },
    {
      id: 'project-5',
      name: 'HR Portal',
      description: "Hieu's Team - Retail Application For Anything User Want To Sell, Have A Strong Security System And Millions Of Users",
      members: [
        { name: 'Nathan Long', role: 'Product Owner', avatar: 'N', avatarImg: '/assets/images/avatar.jpg' },
        { name: 'Brian McCann', role: 'Dev Member', avatar: 'B', avatarImg: '/assets/images/avatar.jpg' },
        { name: 'Thaddeus Silva', role: 'Dev Member', avatar: 'T', avatarImg: '/assets/images/avatar.jpg' }
      ],
      createdBy: 'Nguyen Minh Hieu',
      createdAt: 'Feb 10, 2024',
      epicsCompleted: '4/5',
      sprintsCompleted: 7,
      epics: [
        { name: 'Epic 5', progress: 90, color: '#2196f3' },
        { name: 'User Story 5.3', progress: 85, color: '#4caf50' }
      ]
    },
    {
      id: 'project-6',
      name: 'Finance App',
      description: "My Friend Passed Away In A Car Crash Three Months Ago, And His Wrecked Car Was Playing This Song On Repeat. He Loved It So Much T...",
      members: [
        { name: 'Chloe Mendoza', role: 'Scrum Master', avatar: 'C', avatarImg: '/assets/images/avatar.jpg' },
        { name: 'Nathan Long', role: 'Product Owner', avatar: 'N', avatarImg: '/assets/images/avatar.jpg' },
        { name: 'Kylian Mbappé', role: 'Dev Member', avatar: 'K', avatarImg: '/assets/images/avatar.jpg' }
      ],
      createdBy: 'Nguyen Minh Hieu',
      createdAt: 'Feb 10, 2024',
      epicsCompleted: '2/4',
      sprintsCompleted: 4,
      epics: [
        { name: 'Epic 6', progress: 60, color: '#ff5722' },
        { name: 'User Story 6.2', progress: 40, color: '#795548' }
      ]
    }
  ];

  // Xử lý khi click vào tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  // Lấy project đang được chọn
  const selectedProject = projects[selectedProjectIndex];

  // Xử lý khi click vào project
  const handleProjectClick = (index) => {
    setSelectedProjectIndex(index);
  };

  return (
    <Container fluid className="project-container">
      <Row className="project-header align-items-center">
        <Col>
          <h1>Projects</h1>
        </Col>
        <Col xs="auto">
          <Button variant="danger" className="create-project-btn">
            <span className="plus-icon">+</span> Create Project
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={9}>
          <div className="project-tabs">
            <span 
              className={`tab ${activeTab === 'All' ? 'active' : ''}`}
              onClick={() => handleTabClick('All')}
            >
              All
            </span>
            <span 
              className={`tab ${activeTab === 'Started' ? 'active' : ''}`}
              onClick={() => handleTabClick('Started')}
            >
              Started
            </span>
            <span 
              className={`tab ${activeTab === 'Approval' ? 'active' : ''}`}
              onClick={() => handleTabClick('Approval')}
            >
              Approval
            </span>
            <span 
              className={`tab ${activeTab === 'Completed' ? 'active' : ''}`}
              onClick={() => handleTabClick('Completed')}
            >
              Completed
            </span>
            <div className="view-toggle">
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-view" className="view-toggle-btn">
                  <i className={`fa fa-${viewMode === 'list' ? 'bars' : 'th-large'}`}></i> View
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setViewMode('list')}>
                    <i className="fa fa-bars"></i> List
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setViewMode('box')}>
                    <i className="fa fa-th-large"></i> Box
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className={`view-container ${viewMode}`}>
            {viewMode === 'list' ? (
              // List View
              <div className="project-table animated-items">
                <div className="table-header">
                  <div className="header-cell checkbox-cell"></div>
                  <div className="header-cell name-cell">Name</div>
                  <div className="header-cell members-cell">Members</div>
                  <div className="header-cell created-by-cell">Created By</div>
                  <div className="header-cell created-at-cell">Created At</div>
                </div>

                {projects.map((project, index) => (
                  <div 
                    key={project.id} 
                    className={`table-row animated-item item-${index} ${selectedProjectIndex === index ? 'selected' : ''}`}
                    onClick={() => handleProjectClick(index)}
                  >
                    <div className="cell checkbox-cell">
                      <Form.Check type="checkbox" />
                    </div>
                    <div className="cell name-cell">{project.name}</div>
                    <div className="cell members-cell">
                      <div className="avatar-group">
                        {project.members.slice(0, 3).map((member, i) => (
                          <span key={i} className="avatar" style={{zIndex: 10-i}}>
                            {member.avatarImg ? (
                              <img src={member.avatarImg} alt={member.name} className="avatar-img" />
                            ) : (
                              member.avatar
                            )}
                          </span>
                        ))}
                        {project.members.length > 3 && (
                          <span className="avatar more-avatar">+{project.members.length - 3}</span>
                        )}
                      </div>
                    </div>
                    <div className="cell created-by-cell">{project.createdBy}</div>
                    <div className="cell created-at-cell">{project.createdAt}</div>
                  </div>
                ))}
              </div>
            ) : (
              // Box View
              <div className="project-grid animated-items">
                <Row>
                  {projects.map((project, index) => (
                    <Col md={4} lg={4} key={project.id} className={`animated-item item-box-${index}`}>
                      <div 
                        className={`project-card ${selectedProjectIndex === index ? 'selected' : ''}`}
                        onClick={() => handleProjectClick(index)}
                      >
                        <div className="card-header">
                          <div className="project-card-icon">
                            <img 
                              src="/assets/icons/project_icon.svg" 
                              alt="Project" 
                            />
                          </div>
                          <div className="header-content">
                            <div className="project-card-title">{project.name}</div>
                            <div className="avatar-group">
                              {project.members.slice(0, 3).map((member, i) => (
                                <span key={i} className="avatar" style={{zIndex: 10-i}}>
                                  {member.avatarImg ? (
                                    <img src={member.avatarImg} alt={member.name} className="avatar-img" />
                                  ) : (
                                    member.avatar
                                  )}
                                </span>
                              ))}
                              {project.members.length > 3 && (
                                <span className="avatar more-avatar">+{project.members.length - 3}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="card-description">
                          {project.description}
                        </div>
                        <div className="card-footer">
                          <div className="creator-info">
                            <div className="creator-avatar">
                              {project.createdBy.charAt(0)}
                            </div>
                            <div className="creator-name">{project.createdBy}</div>
                          </div>
                          <div className="creation-date">{project.createdAt}</div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </div>
        </Col>

        <Col md={3}>
          <div className="project-detail-panel">
            <div className="project-title">
              <div className="project-card-icon">
                <img 
                  src="/assets/icons/project_icon.svg" 
                  alt="Project" 
                />
              </div>
              <h3>{selectedProject.name}</h3>
            </div>

            <div className="project-description">
              {selectedProject.description}
            </div>

            <div className="members-section">
              <h5>Members</h5>
              {selectedProject.members.map((member, index) => (
                <div key={index} className="member-item">
                  <span className="member-avatar">
                    {member.avatarImg ? (
                      <img src={member.avatarImg} alt={member.name} className="avatar-img" />
                    ) : (
                      member.avatar
                    )}
                  </span>
                  <div className="member-info">
                    <div className="member-name">{member.name}</div>
                    <div className="member-role">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-section">
              <div className="summary-header">
                <h5>Summary</h5>
                <Button variant="warning" size="sm" className="detail-btn">Go to Detail</Button>
              </div>
              
              <div className="summary-item d-flex justify-content-between">
                <div className="summary-label">Epic Completed</div>
                <div className="summary-value">{selectedProject.epicsCompleted}</div>
              </div>
              <div className="summary-item d-flex justify-content-between">
                <div className="summary-label">Sprints Completed</div>
                <div className="summary-value">{selectedProject.sprintsCompleted}</div>
              </div>

              <div className="progress-section">
                {selectedProject.epics.map((epic, index) => (
                  <div key={index} className="progress-item">
                    <div className="d-flex justify-content-between">
                      <div className="progress-label">{epic.name}</div>
                      <div className="progress-value">{epic.progress}%</div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${epic.progress}%`, backgroundColor: epic.color}}></div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="danger" className="go-to-project-btn">Go To Project</Button>
              
              <div className="create-ai-container">
                <Button variant="outline-warning" className="create-ai-btn">
                  <i className="fa fa-robot"></i> Create AI
                </Button>
                <div className="ai-icon-circle">
                  <img src="/assets/icons/ai_icon.svg" alt="AI Icon" className="ai-icon" />
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectsLayout;
