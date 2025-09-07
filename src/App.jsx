import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {
  getBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
} from './services/requests';

import { useState } from 'react';

function App() {
  const [bannerId, setBannerId] = useState('');
  const [newBanner, setNewBanner] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [updateBannerVal, setUpdateBannerVal] = useState('');
  const [deleteId, setDeleteId] = useState('');

  // 获取所有 Banner
  const handleGetBanners = async () => {
    try {
      const res = await getBanners();
      console.log('getBanners:', res.data || res);
    } catch (err) {
      console.error('获取所有 Banner 失败:', err);
    }
  };

  // 根据ID获取 Banner
  const handleGetBannerById = async () => {
    if (!bannerId) return alert('请输入ID');
    try {
      const res = await getBannerById(bannerId);
      console.log('getBannerById:', res.data || res);
    } catch (err) {
      console.error('获取 Banner by ID 失败:', err);
    }
  };

  // 创建 Banner
  const handleCreateBanner = async () => {
    if (!newBanner) return alert('请输入Banner内容');
    try {
      const res = await createBanner({ title: newBanner });
      console.log('createBanner:', res.data || res);
    } catch (err) {
      console.error('创建 Banner 失败:', err);
    }
  };

  // 更新 Banner
  const handleUpdateBanner = async () => {
    if (!updateId || !updateBannerVal) return alert('请输入ID和内容');
    try {
      const res = await updateBanner(updateId, { title: updateBannerVal });
      console.log('updateBanner:', res.data || res);
    } catch (err) {
      console.error('更新 Banner 失败:', err);
    }
  };

  // 删除 Banner
  const handleDeleteBanner = async () => {
    if (!deleteId) return alert('请输入ID');
    try {
      const res = await deleteBanner(deleteId);
      console.log('deleteBanner:', res.data || res);
    } catch (err) {
      console.error('删除 Banner 失败:', err);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Banner API 测试</h1>
      <div
        className="card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'flex-start',
        }}
      >
        {/* 获取所有Banner */}
        <button onClick={handleGetBanners}>获取所有 Banner</button>

        {/* 根据ID获取Banner */}
        <div>
          <input
            type="text"
            placeholder="输入 Banner ID"
            value={bannerId}
            onChange={(e) => setBannerId(e.target.value)}
            style={{ marginRight: '8px' }}
          />
          <button onClick={handleGetBannerById}>获取指定 Banner</button>
        </div>

        {/* 创建Banner */}
        <div>
          <input
            type="text"
            placeholder="新 Banner 内容"
            value={newBanner}
            onChange={(e) => setNewBanner(e.target.value)}
            style={{ marginRight: '8px' }}
          />
          <button onClick={handleCreateBanner}>创建 Banner</button>
        </div>

        {/* 更新Banner */}
        <div>
          <input
            type="text"
            placeholder="Banner ID"
            value={updateId}
            onChange={(e) => setUpdateId(e.target.value)}
            style={{ marginRight: '8px' }}
          />
          <input
            type="text"
            placeholder="新内容"
            value={updateBannerVal}
            onChange={(e) => setUpdateBannerVal(e.target.value)}
            style={{ marginRight: '8px' }}
          />
          <button onClick={handleUpdateBanner}>更新 Banner</button>
        </div>

        {/* 删除Banner */}
        <div>
          <input
            type="text"
            placeholder="Banner ID"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            style={{ marginRight: '8px' }}
          />
          <button onClick={handleDeleteBanner}>删除 Banner</button>
        </div>
      </div>
      <p className="read-the-docs">F12 打开控制台查看接口返回结果</p>
    </>
  );
}

export default App;
