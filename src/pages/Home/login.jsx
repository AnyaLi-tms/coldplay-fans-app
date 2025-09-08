import React, { useState, useEffect } from "react";
import "../../styles/login.css";

function validatePassword(password) {
  // 至少一个大写、一个小写、一个特殊字符，长度8-16
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[A-Za-z\d\W]{8,16}$/;
  return regex.test(password);
}

export default function Login() {
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username) {
      setError("请输入用户名");
      return;
    }
    if (password !== confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }
    if (!validatePassword(password)) {
      setError("密码需8-16位，包含大小写字母和特殊字符");
      return;
    }
    setError("");
    // 这里发送注册数据到后端
    alert(`注册成功（模拟）：用户名=${username}`);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("请输入用户名和密码");
      return;
    }
    setError("");
    // 这里发送登录数据到后端
    alert(`登录成功（模拟）：用户名=${username}`);
  };

  return (
    <>
      {error && <div className="error-float-global-ref">{error}</div>}
      <div className="login-container-ref">
        <div className="login-tabs-labels-ref">
          <span
            className={mode === "login" ? "active" : ""}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setMode("login");
              setError("");
              setPassword("");
              setConfirmPassword("");
            }}
          >
            密码登录
          </span>
          <span
            className={mode === "register" ? "active" : ""}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setMode("register");
              setError("");
              setPassword("");
              setConfirmPassword("");
            }}
          >
            注册
          </span>
        </div>
        <div className="login-card-ref">
          {mode === "login" ? (
            <form onSubmit={handleLogin} className="login-form-ref">
              <div className="form-row-ref">
                <label>用户名</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="请输入用户名"
                  required
                />
              </div>
              <div className="form-row-ref">
                <label>密码</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  required
                />
              </div>
              <div className="btn-group-ref">
                <button type="submit" className="main-btn-ref">
                  登录
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="login-form-ref">
              <div className="form-row-ref">
                <label>用户名</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="请输入用户名"
                  required
                />
              </div>
              <div className="form-row-ref">
                <label>密码</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  required
                />
              </div>
              <div className="form-row-ref">
                <label>确认密码</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="请再次输入密码"
                  required
                />
              </div>
              <div className="btn-group-ref">
                <button type="submit" className="main-btn-ref">
                  注册
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
