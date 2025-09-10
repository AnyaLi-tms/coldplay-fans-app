import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // 滚动 window
    window.scrollTo(0, 0);
    // 兼容 CSS module 的 main 容器滚动
    // 查找 className 包含 main 的 div
    const mainDiv = Array.from(document.querySelectorAll('div')).find(
      (div) => div.className && div.className.includes('main'),
    );
    if (mainDiv) {
      mainDiv.scrollTop = 0;
    }
  }, [pathname]);
  return null;
}
