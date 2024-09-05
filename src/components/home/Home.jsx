import { useEffect, useState } from "react";
import HomePost from "./HomePost.jsx";
import HomeComment from "./HomeComment.jsx";
import styles from './home.module.css'

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([])
    const [error, setError] = useState(null)
    const [loadingPosts, setLoadingPosts] = useState(true)
    const [loadingComments, setLoadingComments] = useState(true);
    const [page, setPage] = useState(1)
    const limit = 7;

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
                const response = await fetch('https://cors-anywhere.herokuapp.com/https://bloggy.adaptable.app/api/v1/comments?limit=5&sort=desc');
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
    
    if (error) {
        return 'A network error has occured.'
    }

    return (
        <div className={styles.home}>
          <div className={styles.left}>
            <div className={styles.posts}>
                {loadingPosts ? 'loading posts...' : (
                    posts.map((post) => {
                        return post.published && <HomePost key={post.id} {...post}/>
                    })
                )}
            </div>
            <div className={styles.pageNav}>
                {page > 1 ? <button className={styles.newer} onClick={() => {setPage(page - 1)}}>show newer posts</button> : ''}
                {posts.length < limit ? '' : <button className={styles.older} onClick={() => {setPage(page + 1)}}>show older posts</button>}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.recentComments}>
                <h2>recent comments</h2>
                {loadingComments ? 'loading recent comments...' : (
                    comments.map((comment) => {
                        return comment.post.published && <HomeComment key={comment.id} {...comment}></HomeComment>
                    })
                )}
            </div>
          </div>
        </div>
    )
}