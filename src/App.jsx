import './App.css';
import Header from './layout/Header';
import Main from './layout/Main';
import { Layout } from 'antd';

function App() {
  return (
    <div className="App">
      <Layout>
        <Header />
        <Main />
      </Layout>
    </div>
  );
}

export default App;
