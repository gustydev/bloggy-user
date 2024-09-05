import { Link } from "react-router-dom"

export default function TopBar() {
    return (
        <div className="topBar">
        <h1>bloggy</h1>
        <ul>
          <li>
            <Link to='/'>home</Link>
          </li>
          <li>
            |&nbsp;
            <a href="/admin">admin</a>
            {/* later replace link with admin website */}
          </li>
        </ul>
      </div>
    )
}