import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

function HomeComment({ author, content, createdAt, post, postId }) {
    return (
        <div className="comment">
            <div className="info">
                {author} @ <Link to={`/post/${postId}`}>{post.title}</Link> ({new Date(createdAt).toLocaleString()}):
            </div>
            <div className="content">{content}</div>
        </div>
    )
}

HomeComment.propTypes = {
    id: PropTypes.string,
    author: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    post: PropTypes.object,
    postId: PropTypes.number
}

export default HomeComment;