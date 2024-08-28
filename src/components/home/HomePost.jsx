import { Link } from "react-router-dom"

export default function HomePost({ id, title, author, createdAt, content}) {
    return (
        <div className="post">
            <div className="title">
                <Link to={`post/${id}`}>
                    {title}
                </Link>
            </div>
            <div className="author">{author.name}</div>
            <div className="date">{new Date(createdAt).toLocaleString()}</div>
            <div className="content">{content}</div>
            {/* Later, truncate content */}
        </div>
    )
}