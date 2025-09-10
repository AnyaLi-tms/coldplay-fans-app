import LoginBox from './LoginBox';
import './index.module.css'; // 引入 CSS 文件

export default function Login() {
  return (
    <div style={styles.container}>
      <div>
        <LoginBox />
      </div>
    </div>
  );
}

// 样式对象
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center', // 水平居中
    alignItems: 'center', // 垂直居中
    height: '100vh', // 使容器高度为视口高度
    backgroundColor: '#0c0b0bff', // 背景色（可选）
  },
  loginBoxContainer: {
    width: '50%', // 设置宽度为 50%（可根据需要调整）
    maxWidth: '600px', // 最大宽度
    transform: 'scale(1.1)', // 等比放大
    transition: 'transform 0.3s ease', // 动画效果（可选）
  },
};
