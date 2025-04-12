import React, { useState, useEffect } from "react";
import Navigation from "./Auth/Navigation";
import SocialButtons from "./Auth/SocialButtons";
import axios from "axios";
import "../assets/css/Auth.css";
import { useLocation, useNavigate } from "react-router-dom";

const AuthInterface = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isSignInRoute = location.pathname === "/login";
  const [isSignIn, setIsSignIn] = useState(isSignInRoute);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsSignIn(isSignInRoute);
    setErrors({});
    setPassword("");
    setConfirmPassword("");
  }, [isSignInRoute]);

  useEffect(() => {
    if (email) setErrors((prev) => ({ ...prev, email: "", server: "" }));
    if (password) setErrors((prev) => ({ ...prev, password: "", server: "" }));
    if (confirmPassword)
      setErrors((prev) => ({ ...prev, confirmPassword: "", server: "" }));
    if (firstName)
      setErrors((prev) => ({ ...prev, firstName: "", server: "" }));
    if (lastName) setErrors((prev) => ({ ...prev, lastName: "", server: "" }));
  }, [email, password, confirmPassword, firstName, lastName]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email không được để trống";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }

    if (!isSignIn) {
      if (!confirmPassword) {
        newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
      }

      if (!firstName) {
        newErrors.firstName = "Tên không được để trống";
      }

      if (!lastName) {
        newErrors.lastName = "Họ không được để trống";
      }

      if (!agreeToTerms) {
        newErrors.terms = "Bạn phải đồng ý với điều khoản dịch vụ";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    const payload = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8881/api/sign-up",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Sign-up API response:", response.data);
      alert("Đăng ký tài khoản thành công!");
      navigate("/login");
    } catch (error) {
      handleApiError(error, {
        400: (detail) => {
          if (detail === "User already exists") {
            setErrors((prev) => ({ ...prev, email: "Email đã được sử dụng" }));
          } else if (detail === "Password must be at least 8 characters") {
            setErrors((prev) => ({
              ...prev,
              password: "Mật khẩu phải có ít nhất 8 ký tự",
            }));
          } else {
            setErrors((prev) => ({
              ...prev,
              server: detail || "Đã xảy ra lỗi khi đăng ký",
            }));
          }
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    const payload = {
      email,
      password,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8881/api/sign-in",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Sign-in response:", response.data);

      const { access_token, token_type } = response.data;

      if (!access_token || !token_type) {
        throw new Error(
          "Không tìm thấy access_token hoặc token_type trong phản hồi API"
        );
      }

      const standardizedTokenType =
        token_type.toLowerCase() === "bearer" ? "Bearer" : token_type;

      if (rememberMe) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("token_type", standardizedTokenType);
        localStorage.setItem("isAuthenticated", "true");
        console.log("Stored in localStorage:", {
          access_token: localStorage.getItem("access_token"),
          token_type: localStorage.getItem("token_type"),
        });
      } else {
        sessionStorage.setItem("access_token", access_token);
        sessionStorage.setItem("token_type", standardizedTokenType);
        sessionStorage.setItem("isAuthenticated", "true");
        console.log("Stored in sessionStorage:", {
          access_token: sessionStorage.getItem("access_token"),
          token_type: sessionStorage.getItem("token_type"),
        });
      }

      const defaultProjectId = "4f3e3e53-4c9a-418f-b50b-5f57a60bd74f";
      navigate(`/project/board/${defaultProjectId}`);
    } catch (error) {
      handleApiError(error, {
        404: () =>
          setErrors((prev) => ({ ...prev, email: "Tài khoản không tồn tại" })),
        401: () =>
          setErrors((prev) => ({
            ...prev,
            password: "Mật khẩu không chính xác",
          })),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiError = (error, statusHandlers = {}) => {
    const status = error.response?.status;
    const detail = error.response?.data?.detail;

    if (status && statusHandlers[status]) {
      statusHandlers[status](detail);
    } else {
      setErrors((prev) => ({
        ...prev,
        server: "Đã xảy ra lỗi khi kết nối đến server",
      }));
    }
    console.error("API Error:", error.response?.data || error.message);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, server: "" }));

    if (!validateForm()) {
      return;
    }

    if (isSignIn) {
      handleSignIn();
    } else {
      handleSignUp();
    }
  };

  return (
    <div className="auth-container">
      <Navigation />

      <div className="auth-content">
        <div className="auth-form-container">
          <div className="card auth-card">
            <div className="card-body">
              <div className="auth-toggle-buttons">
                <button
                  className={`btn ${
                    !isSignIn ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
                <button
                  className={`btn ${
                    isSignIn ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
              </div>

              <p className="text-muted auth-message text-center">
                {isSignIn
                  ? "Welcome back to sign in. As a returning customer, you have access to your previously saved all information."
                  : "Let's create your account and Shop like a pro and save money."}
              </p>

              <SocialButtons />

              <div className="auth-divider">
                <hr className="text-muted" />
                <span className="auth-divider-text">Or Continue with</span>
              </div>

              {errors.server && (
                <div className="alert alert-danger">{errors.server}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                {!isSignIn && (
                  <>
                    <div className="mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.firstName ? "is-invalid" : ""
                        }`}
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      {errors.firstName && (
                        <div className="invalid-feedback">
                          {errors.firstName}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.lastName ? "is-invalid" : ""
                        }`}
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      {errors.lastName && (
                        <div className="invalid-feedback">
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                  </>
                )}

                <div className="mb-3" style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Password (8 characters minimum)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="btn btn-link password-toggle-btn"
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      padding: 0,
                    }}
                  >
                    <img
                      src={
                        showPassword
                          ? "/assets/icons/eye-off-icon.svg"
                          : "/assets/icons/eye-icon.svg"
                      }
                      alt={showPassword ? "Hide password" : "Show password"}
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  </button>
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                {!isSignIn && (
                  <div className="mb-3" style={{ position: "relative" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`form-control ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      placeholder="Password confirmation"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="btn btn-link password-toggle-btn"
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        padding: 0,
                      }}
                    >
                      <img
                        src={
                          showConfirmPassword
                            ? "/assets/icons/eye-off-icon.svg"
                            : "/assets/icons/eye-icon.svg"
                        }
                        alt={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        style={{
                          width: "24px",
                          height: "24px",
                        }}
                      />
                    </button>
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                )}

                {isSignIn ? (
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      className="text-primary text-decoration-none forgot-password-btn"
                      onClick={handleForgotPassword}
                    >
                      Forgot your password?
                    </button>
                  </div>
                ) : (
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className={`form-check-input ${
                        errors.terms ? "is-invalid" : ""
                      }`}
                      id="agreeTerms"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="agreeTerms">
                      I agree to the
                      <span className="text-primary"> Terms of Service</span>,
                      <span className="text-primary">
                        {" "}
                        General Terms and Conditions
                      </span>
                      , and
                      <span className="text-primary"> Privacy Policy</span>
                    </label>
                    {errors.terms && (
                      <div className="invalid-feedback">{errors.terms}</div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100 auth-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : null}
                  {isSignIn ? "Sign In" : "Sign Up"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="auth-image-container">
          <div className="auth-image-content">
            <img
              src="/assets/icons/Group.svg"
              alt="Illustration"
              className="auth-image"
            />
            <p className="auth-image-text">
              The best of luxury brand values, high quality products, and
              innovative services
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthInterface;
