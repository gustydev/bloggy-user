import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import CommentForm from "./CommentForm";
import PostDetails from "./PostDetails";
import styles from './post.module.css'
import { createResource } from "../../utils/crudOperations";
import { apiRequest } from "../../utils/api";
import { API_URL } from "../../utils/config";

export default function Post() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [commentError, setCommentError] = useState([]);
    const { postId } = useParams();
    const [commentData, setCommentData] = useState({
        author: '',
        content: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommentData((prevCommentData) => ({
          ...prevCommentData,
          [name]: value,
        }));
    };

    async function postComment(e) {
        e.preventDefault();
        try {
            await createResource(`posts/${postId}/comment`, commentData);
            location.reload(); // page refresh
        } catch (error) {
            setCommentError(error);
        }
    }

    useEffect(() => {
        let ignore = false;

        async function fetchPost() {
            setLoading(true);
            try {
                const post = await apiRequest(`${API_URL}/v1/posts/${postId}`);
                setPost(post);
            } catch (error) {
                console.error(error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        if (!ignore) {
            fetchPost();
        }

        return () => {
            ignore = true;
        }
    }, [postId])

    if (loading) {
        return 'loading...'
    }

    if (error) {
        return 'a network error has occured'
    }

    return (
        <div className={styles.main}>
            {post.published ? (
                <>
                <PostDetails post={post}></PostDetails>
                <div className="commentContainer">
                    <CommentSection comments={post.comments}></CommentSection>
                    {commentError.length > 0 && <p style={{marginBottom: '0'}}><strong>{commentError}</strong>. Please try again.</p>}
                    <CommentForm commentData={commentData} handleInputChange={handleInputChange} postComment={postComment}></CommentForm>
                </div>
                </>
            ) : <p><strong>Error</strong>: this post is not published. Check again later.</p>}
        </div>
    )
}