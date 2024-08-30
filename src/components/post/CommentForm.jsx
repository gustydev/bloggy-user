import PropTypes from 'prop-types';

export default function CommentForm( {commentData, handleInputChange, postComment }) {
    return (
        <form onSubmit={(e) => { postComment(e) }}>
            <label htmlFor="author"></label>
            <input type="text" id='author' name='author' placeholder='author (optional)' value={commentData.author} onChange={handleInputChange}/>
            <textarea name="content" id="content" placeholder="your comment goes here" value={commentData.content} onChange={handleInputChange}></textarea>
            <input type="submit" value="Submit" />
    </form>
    )   
}

CommentForm.propTypes = {
    commentData: PropTypes.object,
    handleInputChange: PropTypes.func,
    postComment: PropTypes.func
}