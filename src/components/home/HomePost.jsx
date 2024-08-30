import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import styles from './home.module.css'

function HomePost({ id, title, author, createdAt, content }) {
    if (content.length > 1000) {
        content = content.substring(0, 1000) + '(...)'
    }

    if (title.length > 100) {
        title = title.substring(0, 100) + '(...)'
    }
    
    return (
        <div className={styles.post}>
            <div className="title" style={{fontWeight: 'bold'}}>
                <Link to={`post/${id}`}>
                    {title}
                </Link>
            </div>
            <div className="info">
                {author.name}, {new Date(createdAt).toLocaleString()}
            </div>
            <div className="content">{content}</div>
        </div>
    )
}

HomePost.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.object,
    createdAt: PropTypes.string,
    content: PropTypes.string
}

export default HomePost;