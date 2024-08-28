import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { postId } = useParams();

    useEffect(() => {
        let ignore = false;

        async function fetchPost() {
            setLoading(true);
            try {
                const response = await fetch(`https://cors-anywhere.herokuapp.com/https://bloggy.adaptable.app/api/v1/posts/${postId}`);
                const post = await response.json();

                if (!response.ok) {
                    throw new Error("Error fetching post. Status: ", response.status)
                }

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

    console.log(post)

    return (
        <>
        <div className="post">
            <h2 className="title">{post.title}</h2>
            <h3 className='subtitle'>{post.subtitle}</h3>
            <div className="content">{post.content}</div>
            <div className="info">{post.author.name}, {new Date(post.createdAt).toLocaleString()}</div>
        </div>
        <div className="comments">
            <h2>comments</h2>
            {post.comments.map((comment) => {
                return (
                    <div className="comment" key={comment.id}>
                        <div className="commentAuthor">{comment.author}</div>
                        <div className="commentDate">{new Date(comment.createdAt).toLocaleString()}</div>
                        <div className="commentContent">{comment.content}</div>
                    </div>
                    // later add form to post a comment
                )
            })}
        </div>
        </>
    )
}