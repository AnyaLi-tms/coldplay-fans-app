import { useEffect } from 'react';
import { useLoginStore } from '../../store/loginStore.jsx';
import '../../styles/login.css';
export default function Login() {
  const {
    validatePassword,
    mode,
    setMode,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    setError,
    registerUser,
    loginUser,
  } = useLoginStore();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username) {
      setError('请输入用户名');
      return;
    }
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    if (!validatePassword(password)) {
      setError('密码需8-16位，包含大小写字母和特殊字符');
      console.log(password);
      return;
    }
    setError('');
    // 调用注册API
    const res = await registerUser(username, password);
    if (res) {
      // 注册成功，切换到登录模式并自动填入用户名和密码，触发登录
      setMode('login');
      setError('');
      setTimeout(async () => {
        setUsername(username);
        setPassword(password);
      }, 100);
    } else {
      setError(error || '注册失败');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('请输入用户名和密码');
      return;
    }
    setError('');
    // 调用登录API
    const res = await loginUser(username, password);
    if (!res) {
      setError(error || '登录失败');
      return;
    }
  };

  return (
    <>
      {error && <div className="error-float-global-ref">{error}</div>}
      <div className="login-container-ref">
        <div className="login-tabs-labels-ref">
          <span
            className={mode === 'login' ? 'active' : ''}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setMode('login');
              setError('');
              setPassword('');
              setConfirmPassword('');
            }}
          >
            密码登录
          </span>
          <span
            className={mode === 'register' ? 'active' : ''}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setMode('register');
              setError('');
              setPassword('');
              setConfirmPassword('');
            }}
          >
            注册
          </span>
        </div>
        <div className="login-card-ref">
          {mode === 'login' ? (
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
