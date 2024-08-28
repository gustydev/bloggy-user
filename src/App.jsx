import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="topBar">
        <h1>bloggy</h1>
      </div>
      <Outlet></Outlet>
    </>
  )
}

export default App
