import './App.css';
import Header from './layout/Header';
import Main from './layout/Main';
import Login from './pages/Login';
import { useLocation } from 'react-router-dom';
function App() {
  const location = useLocation();
  if (location.pathname === '/login') {
    return <Login />;
  }
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
