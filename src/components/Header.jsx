import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Dropdown,
  Badge,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/Header.css";

const API_BASE_URL = "http://localhost:8881/api";

const Header = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const notificationCount = 2;

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      accept: "application/json",
    },
    withCredentials: true,
  });

  const getAccessToken = () => {
    return (
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token")
    );
  };

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        throw new Error("No access token found in storage");
      }

      const config = {
        headers: {
          authentication: accessToken,
        },
      };

      const response = await api.get("/users/my-profile", config);
      const { user_first_name, user_last_name, user_email } = response.data;
      const fullName = `${user_first_name || "User"} ${
        user_last_name || ""
      }`.trim();
      setUserName(fullName);
      setUserEmail(user_email || "");
    } catch (error) {
      console.error("Error fetching user profile:", error);
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
      localStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("token_type");
      sessionStorage.removeItem("isAuthenticated");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [navigate]);

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      const accessToken = getAccessToken();
      if (accessToken) {
        await api.post(
          "/sign-out",
          {},
          {
            headers: {
              authentication: accessToken,
            },
          }
        );
      }

      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
      localStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("token_type");
      sessionStorage.removeItem("isAuthenticated");

      navigate("/login");
    } catch (error) {
      console.error("Error during sign-out:", error);
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
      localStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("token_type");
      sessionStorage.removeItem("isAuthenticated");
      navigate("/login");
    }
  };

  // Handle username update
  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        throw new Error("No access token found in storage");
      }

      const config = {
        headers: {
          authentication: accessToken,
          "Content-Type": "application/json",
        },
      };

      const payload = {
        user_first_name: firstName,
        user_last_name: lastName,
      };

      await api.put("/users/my-profile/update", payload, config);
      setShowModal(false);
      setFirstName("");
      setLastName("");
      await fetchUserProfile();
    } catch (error) {
      console.error("Error updating username:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        localStorage.removeItem("isAuthenticated");
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("token_type");
        sessionStorage.removeItem("isAuthenticated");
        navigate("/login");
      }
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="header">
        <Nav className="me-auto">
          <Nav.Link
            href="/dashboard"
            className={
              window.location.pathname === "/dashboard" ? "active" : ""
            }
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            href="/projects"
            className={window.location.pathname === "/projects" ? "active" : ""}
          >
            Projects
          </Nav.Link>
          <Nav.Link
            href="/reports"
            className={window.location.pathname === "/reports" ? "active" : ""}
          >
            Reports
          </Nav.Link>
        </Nav>

        <div className="d-flex align-items-center">
          <div className="position-relative me-3">
            <FaBell className="header-icon" />
            {notificationCount > 0 && (
              <Badge bg="danger" className="notification-badge">
                {notificationCount}
              </Badge>
            )}
          </div>
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-user"
              className="d-flex align-items-center border-0"
            >
              <span className="me-2">{userName}</span>
              <div className="user-avatar">{getInitials(userName)}</div>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <div className="d-flex align-items-center p-2">
                <div className="user-avatar-large me-2">
                  {getInitials(userName)}
                </div>
                <div>
                  <div className="fw-bold">{userName}</div>
                  <div className="text-muted small">{userEmail}</div>
                  <a
                    href="/profile"
                    className="text-primary small"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/profile");
                    }}
                  >
                    Manage Account
                  </a>
                </div>
              </div>
              <Dropdown.Divider />
              {/* <Dropdown.ItemText className="text-muted small">
                Confluence
              </Dropdown.ItemText>
              <Dropdown.Item onClick={() => navigate("/personal-space")}>
                Personal Space
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/profile")}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/tasks")}>
                Tasks
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/settings")}>
                Personal settings
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/theme")}>
                Theme
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/slack")}>
                Slack
              </Dropdown.Item> */}
              <Dropdown.Item onClick={() => setShowModal(true)}>
                Change Username
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar>

      {/* Modal for changing username */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateUsername}>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const getInitials = (name) => {
  if (!name) return "UN";
  const words = name.split(" ");
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return words
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};

export default Header;
