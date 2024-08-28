import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

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
      }
    }

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
      }
    }

    async function fetchData() {
      await Promise.all([fetchPosts(), fetchComments()]);
      setLoading(false)
    }
    
    if (!ignore) {
      fetchData();
    }

    return () => {
      ignore = true;
    }
  }, [])

  console.log(posts, comments)

  return (
    <>
      <div className="topBar">
        <h1>Bloggy</h1>
      </div>
      {loading ? <p>Loading...</p> : error ? <p>A network error has occured</p> : <Outlet context={[posts, comments]}></Outlet>}
    </>
  )
}

export default App
