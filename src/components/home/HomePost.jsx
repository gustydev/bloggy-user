import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import styles from './home.module.css'

function HomePost({ id, title, subtitle, author, createdAt, content, _count }) {
    const maxContentLength = 2500;
    const truncatedTitle = title.length > 100 ? title.substring(0, 100) + '(...)' : title;
    const truncatedContent = content.length > maxContentLength ? content.substring(0, 2500) + '(...)': content;
    const commentCount = _count.comments;
    
    return (
        <div className={styles.post}>
            <div className={styles.info}>
                <h2 className={styles.title} style={{fontWeight: 'bold'}}>
                    <Link to={`post/${id}`}>
                        {truncatedTitle}
                    </Link>
                </h2>
                <h3 className={styles.subtitle}>
                    {subtitle}
                </h3>
            </div>
            <div className={styles.content}>
                {content.length > maxContentLength ? (
                    <>
                    {truncatedContent}
                    <Link to={`/post/${id}`}>&nbsp;(read more)</Link>
                    </>
                ) : truncatedContent}
                </div>
            <div className={styles.bottomInfo}>
                    <strong>{author.name}</strong> 
                    <div>
                        {new Date(createdAt).toLocaleString()}
                    </div>
                    <div>
                        <Link to={`/post/${id}#comments`}>
                            {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
                        </Link>
                    </div>
            </div>
        </div>
    )
}

HomePost.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    author: PropTypes.object,
    createdAt: PropTypes.string,
    content: PropTypes.string,
    _count: PropTypes.object
}

export default HomePost;