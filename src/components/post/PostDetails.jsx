import PropTypes from 'prop-types';

export default function PostDetails( {post}) {
    return (
        <div className="post">
            <h2 className="title">{post.title}</h2>
            <h3 className='subtitle'>{post.subtitle}</h3>
            <div className="content">{post.content}</div>
            <div className="info">{post.author.name}, {new Date(post.createdAt).toLocaleString()}</div>
        </div>
    )   
}

PostDetails.propTypes = {
    post: PropTypes.object
}