import PropTypes from 'prop-types';
import styles from './post.module.css'
import Comment from './Comment';

export default function CommentSection( { comments }) {
    return (
        <div className={styles.comments}>
            <h2>comments</h2>
            {comments.map((comment) => <Comment key={comment.id} comment={comment}/>)}
        </div>
    )
}

CommentSection.propTypes = {
    comments: PropTypes.array
}