import { Outlet } from 'react-router-dom'
import './App.css';
import './style/skin/dark.css'; // 直接引入，确保最早加载
import { SignalRProvider } from './context/signalRContext';
function App() {
  // 设置为暗黑主题
document.body.setAttribute('arco-theme', 'dark');
  // const custom='dark';
  // useEffect(() => {
  //   import(`./style/skin/${custom}.css`)
  //     .then(() => console.log('Loaded theme:', custom))
  //     .catch(error => console.error('Error loading theme:', error));
  // }, [custom]);
  return (
    <SignalRProvider hubUrl={`${import.meta.env.VITE_API_URL}/hub`}>
      <div>
        <div className="flex-1 flex flex-col">
          {/* Main Content */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </SignalRProvider>
  );
}

export default App
