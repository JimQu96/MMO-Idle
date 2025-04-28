import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import LeftMenu from './components/LeftMenu'

function App() {
  return (
    <div className="h-screen">
      <Navbar />
      <LeftMenu />
      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
