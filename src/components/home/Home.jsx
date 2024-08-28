import { useOutletContext } from "react-router-dom"

export default function Home() {
    const [posts, comments] = useOutletContext();

    return (
        <>
        <div className="posts">
            {posts.map((post) => {
                return <div key={post.id}>{post.title}</div> 
                // use a HomePost component
            })}
        </div>
        <div className="recentComments">
            {comments.map((comment) => {
                return <div key={comment.id}>{comment.content}</div>
                // Use a HomeComment component
            })}
        </div>
        </>
    )
}