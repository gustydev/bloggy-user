import PropTypes from 'prop-types';

export default function CommentSection( { comments }) {
    return (
        <div className="comments">
            <h2>comments</h2>
            {comments.map((comment) => {
                return (
                    <div className="comment" key={comment.id}>
                        <div className="info">
                            {comment.author} ({new Date(comment.createdAt).toLocaleString()}):
                        </div>
                        <div className="commentContent">{comment.content}</div>
                    </div>
                )
            })}
        </div>
    )
}

CommentSection.propTypes = {
    comments: PropTypes.array
}