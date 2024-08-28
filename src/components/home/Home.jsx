import { useEffect, useState } from "react";
import HomePost from "./HomePost.jsx";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([])
    const [error, setError] = useState(null)
    const [loadingPosts, setLoadingPosts] = useState(true)
    const [loadingComments, setLoadingComments] = useState(true);
    const [page, setPage] = useState(1)
    const limit = 5;

    useEffect(() => {
        let ignore = false;

        async function fetchPosts() {
            setLoadingPosts(true)
            try {
                const response = await fetch(`https://cors-anywhere.herokuapp.com/https://bloggy.adaptable.app/api/v1/posts?page=${page}&limit=${limit}`);
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
    }, [page])

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

    console.log(posts)
    
    if (error) {
        return 'A network error has occured.'
    }

    return (
        <>
        <div className="left">
            <div className="posts">
                <h2>posts</h2>
                {loadingPosts ? 'loading posts...' : (
                    posts.map((post) => {
                        return <HomePost key={post.id} {...post}></HomePost>
                    })
                )}
            </div>
            <div className="pageNavigation">
                {page > 1 ? <button onClick={() => {setPage(page - 1)}}>load newer posts</button> : ''}
                {posts.length < limit ? '' : <button onClick={() => {setPage(page + 1)}}>load older posts</button>}
            </div>
        </div>
        <div className="right">
            <div className="recentComments">
                <h2>recent comments</h2>
                {loadingComments ? 'loading recent comments...' : (
                    comments.map((comment) => {
                        return <div key={comment.id}>{comment.content}</div>
                        // Use a HomeComment component
                    })
                )}
            </div>
        </div>
        </>
    )
}