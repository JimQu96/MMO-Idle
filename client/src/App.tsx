import { Outlet } from 'react-router-dom'
import './App.css';
import './style/skin/dark.css'; // 直接引入，确保最早加载
function App() {
  // const custom='dark';
  // useEffect(() => {
  //   import(`./style/skin/${custom}.css`)
  //     .then(() => console.log('Loaded theme:', custom))
  //     .catch(error => console.error('Error loading theme:', error));
  // }, [custom]);
  return (
    <div>
      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
