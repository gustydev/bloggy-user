import PropTypes from 'prop-types';
import styles from './post.module.css';

export default function PostDetails( {post}) {
    return (
        <div className={styles.post}>
            <h2 className={styles.title}>{post.title}</h2>
            {post.subtitle ? (
                <h3 className={styles.subtitle}>{post.subtitle}</h3>
            ) : ''}
            <div className={styles.content}>{post.content}</div>
            <div className={styles.info}>
                <div className={styles.authorAndCreationDate}>
                    posted by <strong>{post.author.name}</strong> on {new Date(post.createdAt).toLocaleString()}
                </div>
                {post.updatedAt !== post.createdAt ? (
                <div className={styles.updatedAt}>
                    updated {new Date(post.updatedAt).toLocaleString()}
                </div>
                ) : ''}
            </div>
            
        </div>
    )   
}

PostDetails.propTypes = {
    post: PropTypes.object
}