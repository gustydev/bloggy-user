import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="topBar">
        <h1>Bloggy</h1>
      </div>
      <div className="main">
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
