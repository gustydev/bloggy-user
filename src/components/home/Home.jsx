import { useEffect, useState } from "react";
import HomePost from "./HomePost.jsx";
import HomeComment from "./HomeComment.jsx";
import styles from './home.module.css'
import { apiRequest } from "../../utils/api.js";
import { API_URL } from "../../utils/config"
import Pagination from "./Pagination.jsx";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([])
    const [error, setError] = useState(null)
    const [loadingPosts, setLoadingPosts] = useState(true)
    const [loadingComments, setLoadingComments] = useState(true);
    const [page, setPage] = useState(1)
    const limit = 4;

    const handlePostPageChange = (increment) => {
        setPage((prev) => prev + increment);
    };
    
    useEffect(() => {
        let ignore = false;

        async function fetchPosts() {
            setLoadingPosts(true)
            try {
                const posts = await apiRequest(`${API_URL}/posts?page=${page}&limit=${limit}&published=true`);
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
                const comments = await apiRequest(`${API_URL}/comments?limit=5&sort=desc`);
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
                        return <HomePost key={post.id} {...post}/>
                    })
                )}
            </div>
            <div className={styles.pageNav}>
                <Pagination currentPage={page} totalItems={posts.length} limit={limit} onPageChange={handlePostPageChange}/>
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