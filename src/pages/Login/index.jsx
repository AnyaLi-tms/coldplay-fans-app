import { useEffect } from 'react';
import { useLoginStore } from '../../store/loginStore.jsx';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
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

  const switchToRegister = async (e) => {
    setMode('register');
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  const switchToLogin = async (e) => {
    setMode('login');
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

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
    console.log(res);
    if (res) {
      // 注册成功，切换到登录模式并自动填入用户名和密码，触发登录
      setMode('login');
      setError('');
      setTimeout(async () => {
        setUsername(username);
        setPassword(password);
      }, 100);
    } else {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('请输入用户名和密码');
      return;
    }
    setError('');
    // 调用登录API
    const res = await loginUser(username, password);
    console.log(res);
    if (!res) {
      return;
    }
    // 登录成功，返回上一页
    setError('');
    navigate(-1);
  };

  return (
    <>
      {error && <div className={styles['error-float-global-ref']}>{error}</div>}
      <div className={styles['login-container-ref']}>
        <div className={styles['login-tabs-labels-ref']}>
          <span
            className={mode === 'login' ? styles['active'] : ''}
            style={{ cursor: 'pointer' }}
            onClick={switchToLogin}
          >
            密码登录
          </span>
          <span
            className={mode === 'register' ? styles['active'] : ''}
            style={{ cursor: 'pointer' }}
            onClick={switchToRegister}
          >
            注册
          </span>
        </div>
        <div className={styles['login-card-ref']}>
          {mode === 'login' ? (
            <form onSubmit={handleLogin} className={styles['login-form-ref']}>
              <div className={styles['form-row-ref']}>
                <label>用户名</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="请输入用户名"
                  required
                />
              </div>
              <div className={styles['form-row-ref']}>
                <label>密码</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  required
                />
              </div>
              <div className={styles['btn-group-ref']}>
                <button type="submit" className={styles['main-btn-ref']}>
                  登录
                </button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleRegister}
              className={styles['login-form-ref']}
            >
              <div className={styles['form-row-ref']}>
                <label>用户名</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="请输入用户名"
                  required
                />
              </div>
              <div className={styles['form-row-ref']}>
                <label>密码</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  required
                />
              </div>
              <div className={styles['form-row-ref']}>
                <label>确认密码</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="请再次输入密码"
                  required
                />
              </div>
              <div className={styles['btn-group-ref']}>
                <button type="submit" className={styles['main-btn-ref']}>
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
