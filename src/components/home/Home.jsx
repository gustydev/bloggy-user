import { useEffect, useState } from "react";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([])
    const [error, setError] = useState(null)
    const [loadingPosts, setLoadingPosts] = useState(true)
    const [loadingComments, setLoadingComments] = useState(true);

    useEffect(() => {
        let ignore = false;

        async function fetchPosts() {
            try {
                const response = await fetch('https://cors-anywhere.herokuapp.com/https://bloggy.adaptable.app/api/v1/posts');
                const posts = await response.json();

                if (!response.ok) {
                    throw new Error("Error fetching posts. Status: ", response.status)
                }

                setPosts(posts);
            } catch (error) {
                setError(error)
                console.error(error)
            } finally {
                setLoadingPosts(false)
            }
        }

        if (!ignore) {
            fetchPosts();
        }

        return () => {
            ignore = true;
        }
    }, [])

    useEffect(() => {
        let ignore = false;

        async function fetchComments() {
            try {
                const response = await fetch('https://cors-anywhere.herokuapp.com/https://bloggy.adaptable.app/api/v1/comments?limit=3&sort=desc');
                const comments = await response.json();

                if (!response.ok) {
                    throw new Error("Error fetching comments. Status: ", response.status)
                }

                setComments(comments);
            } catch (error) {
                setError(error)
                console.error(error)
            } finally {
                setLoadingComments(false);
            }
        }

        if (!ignore) {
            fetchComments();
        }

        return () => {
            ignore = true;
        }
    }, [])

    console.log(posts, comments)
    
    if (error) {
        return 'A network error has occured.'
    }

    return (
        <>
        <div className="posts">
            {loadingPosts ? 'Loading posts...' : (
                posts.map((post) => {
                    return <div key={post.id}>{post.title}</div> 
                    // use a HomePost component
                })
            )}
        </div>
        <div className="recentComments">
            {loadingComments ? 'Loading recent comments...' : (
                comments.map((comment) => {
                    return <div key={comment.id}>{comment.content}</div>
                    // Use a HomeComment component
                })
            )}
        </div>
        </>
    )
}