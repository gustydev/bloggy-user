export default function HomePost({ title, author, createdAt, content}) {
    return (
        <div className="post">
            <div className="title">{title}</div>
            <div className="author">{author.name}</div>
            <div className="date">{new Date(createdAt).toLocaleString()}</div>
            <div className="content">{content}</div>
            {/* Later, truncate content */}
        </div>
    )
}