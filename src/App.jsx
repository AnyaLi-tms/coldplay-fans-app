import './App.css';
import Tabbar from './layout/Tabbar';
import Main from './layout/Main';
import Login from './pages/Home/Login.jsx';
import { Route,Routes } from 'react-router-dom';
function App() {
  return (
    <>
      <Tabbar />
      <Main />
      <Routes>
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </>
  );
}

export default App;
