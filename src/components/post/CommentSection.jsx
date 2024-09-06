import PropTypes from 'prop-types';
import styles from './post.module.css'
import Comment from './Comment';
import { useEffect, useRef } from 'react';

export default function CommentSection( { comments }) {
    const commentsRef = useRef(null);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash === '#comments') {
            commentsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div className={styles.comments} id='comments' ref={commentsRef}>
            <h2>comments</h2>
            {comments.map((comment) => <Comment key={comment.id} comment={comment}/>)}
        </div>
    )
}

CommentSection.propTypes = {
    comments: PropTypes.array
}