import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
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
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://bloggy.adaptable.app/api/v1/posts/${postId}/comment`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "author": commentData.author || 'Anonymous',
                    "content": commentData.content
                })
            })
            await response.json();            
        } catch (error) {
            console.error(error)
        } finally {
            location.reload() // Refresh page
        }
    }

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

    return (
        <>
        <div className="post">
            <h2 className="title">{post.title}</h2>
            <h3 className='subtitle'>{post.subtitle}</h3>
            <div className="info">{post.author.name}, {new Date(post.createdAt).toLocaleString()}</div>
            <div className="content">{post.content}</div>
        </div>
        <div className="comments">
            <h2>comments</h2>
            {post.comments.map((comment) => {
                return (
                    <div className="comment" key={comment.id}>
                        <div className="info">
                            {comment.author} ({new Date(comment.createdAt).toLocaleString()}):
                        </div>
                        <div className="commentContent">{comment.content}</div>
                    </div>
                    // later add form to post a comment
                )
            })}
        </div>
        <form onSubmit={(e) => { postComment(e) }}>
            <label htmlFor="author"></label>
            <input type="text" id='author' name='author' placeholder='author (optional)' onChange={handleInputChange}/>
            <textarea name="content" id="content" placeholder="your comment goes here" onChange={handleInputChange}></textarea>
            <input type="submit" value="Submit" />
        </form>
        </>
    )
}