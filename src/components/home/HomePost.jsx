import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

function HomePost({ id, title, author, createdAt, content}) {
    return (
        <div className="post">
            <div className="title">
                <Link to={`post/${id}`}>
                    {title}
                </Link>
            </div>
            <div className="info">
                {author.name}, {new Date(createdAt).toLocaleString()}
            </div>
            <div className="content">{content}</div>
            {/* Later, truncate content */}
        </div>
    )
}

HomePost.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    createdAt: PropTypes.string,
    content: PropTypes.string
}

export default HomePost;