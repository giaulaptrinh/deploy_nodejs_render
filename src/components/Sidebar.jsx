import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/Sidebar.css';
import TaskDetail from './TaskDetails/TaskDetail';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showMore, setShowMore] = useState(false);
    const [showTaskDetail, setShowTaskDetail] = useState(false);
    const [isProjectActive, setIsProjectActive] = useState(false);

    useEffect(() => {
        setIsProjectActive(location.pathname === '/projects');
    }, [location.pathname]);

    const toggleMore = () => setShowMore(!showMore);
    const toggleTaskDetail = () => setShowTaskDetail(!showTaskDetail);

    const handleProjectsClick = () => {
        navigate('/projects');
    };

    const handleCloseProjects = (e) => {
        e.stopPropagation();
        navigate(-1);
    };

    const handleTasksClick = () => {
        navigate('/task/1');
    };

    const onlineMembers = [
        { name: 'Hieu Nguyen Minh', avatar: 'H' },
        { name: 'Nguyen Van A', avatar: 'A' },
        { name: 'Tran Thi B', avatar: 'B' }
    ];

    return (
        <div className={`sidebar ${showTaskDetail ? 'blurred' : ''}`}>
            <div className="sidebar-content">
                <div className="logo">
                    <img src="/assets/images/logo.png" alt="Crate Logo" className="icon" /> crate
                </div>
                <ul className="menu">
                    <li className="menu-item" onClick={() => navigate('/')}>
                        <img src="/assets/icons/home_icon.svg" alt="Home" className="icon" /> Home
                    </li>
                    <li className="menu-item">
                        <img src="/assets/icons/message_icon.svg" alt="Messages" className="icon" /> Messages
                    </li>
                    <li className="menu-item" onClick={handleTasksClick}>
                        <img src="/assets/icons/task_icon.svg" alt="Tasks" className="icon" /> Tasks
                    </li>
                    <li className="menu-item">
                        <img src="/assets/icons/member_icon.svg" alt="Members" className="icon" /> Members
                    </li>
                    <li className="menu-item">
                        <img src="/assets/icons/setting_icon.svg" alt="Settings" className="icon" /> Settings
                    </li>
                    <li className="menu-item more" onClick={toggleMore}>
                        <img src="/assets/icons/more_icon.svg" alt="More" className="icon" /> More
                    </li>
                </ul>
                
                <div className="additional-menu">
                    <div className="text-only-menu">
                        <div className="text-only-item project-item" onClick={handleProjectsClick}>
                            Projects
                            {isProjectActive && (
                                <span className="close-icon" onClick={handleCloseProjects}>
                                    ✕
                                </span>
                            )}
                        </div>
                        <div className="text-only-item">Dashboard</div>
                    </div>
                    <div className="new-tab-menu">
                        <div className="text-only-item">New Tab</div>
                    </div>
                </div>
                
                {showMore && (
                    <div className="more-popup">
                        <ul>
                            <li className="more-item">
                                <span className="more-text">
                                    <img src="/assets/icons/Myproject_icon.svg" alt="My Projects" className="icon" /> My Projects
                                </span>
                                <img src="/assets/icons/icon_ghim.svg" alt="Arrow" className="more-icon" />
                            </li>
                            <li className="more-item">
                                <span className="more-text">
                                    <img src="/assets/icons/Doc_icon.svg" alt="Docs" className="icon" /> Docs
                                </span>
                                <img src="/assets/icons/icon_ghim.svg" alt="Arrow" className="more-icon" />
                            </li>
                            <li className="more-item">
                                <span className="more-text">
                                    <img src="/assets/icons/Doc_icon.svg" alt="Dashboards" className="icon" /> Dashboards
                                </span>
                                <img src="/assets/icons/icon_ghim.svg" alt="Arrow" className="more-icon" />
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="online-members">
                {onlineMembers.map((member, index) => (
                    <div key={index} className="member">
                        <span className="member-avatar">{member.avatar}</span>
                        <span className="member-name">{member.name}</span>
                        <span className="member-status">🟢 Online</span>
                    </div>
                ))}
            </div>
            {showTaskDetail && <TaskDetail onClose={toggleTaskDetail} />}
        </div>
    );
};

export default Sidebar;
