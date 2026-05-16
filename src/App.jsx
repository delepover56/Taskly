import { Outlet } from 'react-router'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'

const App = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex-col">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App

