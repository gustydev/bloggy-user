import PropTypes from 'prop-types';
import styles from './post.module.css'

export default function Comment( { comment }) {
    return (
        <div className={styles.comment} key={comment.id}>
            <div className={styles.info}>
                {comment.author} ({new Date(comment.createdAt).toLocaleString()}):
            </div>
            <div className={styles.content}>{comment.content}</div>
            <div className={styles.tinyInfo}>
                {comment.updatedAt !== comment.createdAt && <div className={styles.commentUpdated}>{'updated ' + new Date(comment.updatedAt).toLocaleString()}</div>}
                <div className={styles.commentId}>#{comment.id}</div>
            </div>
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object
}