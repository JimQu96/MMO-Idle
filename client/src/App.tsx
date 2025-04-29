import { useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import LeftMenu from './components/LeftMenu/LeftMenu'
import './App.css';

function App() {
  const custom='dark';
  useEffect(() => {
    import(`./style/skin/${custom}.css`)
      .then(() => console.log('Loaded theme:', custom))
      .catch(error => console.error('Error loading theme:', error));
  }, [custom]);
  return (
    <div className={custom}>
      <Navbar />
      <LeftMenu />
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
