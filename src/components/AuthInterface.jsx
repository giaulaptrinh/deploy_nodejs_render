import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import SocialButtons from "./SocialButtons";
import "../assets/css/Auth.css";
import { useLocation, useNavigate } from "react-router-dom";

const AuthInterface = () => {
  const location = useLocation();
  // Xác định chế độ dựa trên URL
  const isSignInRoute = location.pathname === "/login";
  const [isSignIn, setIsSignIn] = useState(isSignInRoute);

  useEffect(() => {
    setIsSignIn(isSignInRoute);
  }, [isSignInRoute]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Xóa lỗi khi người dùng thay đổi dữ liệu nhập vào
  useEffect(() => {
    if (email) setErrors((prev) => ({ ...prev, email: "" }));
    if (password) setErrors((prev) => ({ ...prev, password: "" }));
    if (confirmPassword)
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
  }, [email, password, confirmPassword]);

  // Hàm kiểm tra định dạng email
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Hàm xác thực biểu mẫu
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
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
      }

      if (!agreeToTerms) {
        newErrors.terms = "Bạn phải đồng ý với điều khoản dịch vụ";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Xử lý đăng kí
  const handleSignUp = async () => {};

  // Xử lý đăng nhập - Cập nhật theo API
  const handleSignIn = async () => {};

  // Xử lý quên mật khẩu
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
                  // onClick={() => {
                  //   setIsSignIn(false);
                  //   setErrors({});
                  // }}
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
                <button
                  className={`btn ${
                    isSignIn ? "btn-primary" : "btn-outline-primary"
                  }`}
                  // onClick={() => {
                  //   setIsSignIn(true);
                  //   setErrors({});
                  // }}
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
              </div>

              <p className="text-muted auth-message text-center">
                {isSignIn
                  ? "Welcome back to sign in. As a returning customer, you have access to your previously saved all imformation."
                  : "Let's create your account and Shop like a pro and save money."}
              </p>

              <SocialButtons />

              <div className="auth-divider">
                <hr className="text-muted" />
                <span className="auth-divider-text">Or Continute with</span>
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

                <div className="mb-3" style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Password (6 characters minimum)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <img
                    src={
                      showPassword
                        ? "/assets/icons/eye-off-icon.svg"
                        : "/assets/icons/eye-icon.svg"
                    }
                    alt={showPassword ? "Hide password" : "Show password"}
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      width: "24px",
                      height: "24px",
                    }}
                  />
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
                    <img
                      src={
                        showConfirmPassword
                          ? "/assets/icons/eye-off-icon.svg"
                          : "/assets/icons/eye-icon.svg"
                      }
                      alt={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                      onClick={toggleConfirmPasswordVisibility}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        width: "24px",
                        height: "24px",
                      }}
                    />
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
                      <span style={{ color: "blue" }}> Terms of Service</span>,
                      <span style={{ color: "blue" }}>
                        General Terms and Conditions
                      </span>
                      , and
                      <span style={{ color: "blue" }}> Privacy Policy</span>
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
