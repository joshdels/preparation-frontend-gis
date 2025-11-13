import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts")
      const data: Post[] = await res.json();
      setPosts(data)
      }

      fetchPosts();
    }, []);


  return (
    <div>
      <h2>Posts</h2>
      {posts.slice(0,5).map(p => (
        <p key = {p.id}>
          <strong>{p.title}</strong>
          {p.body}
        </p>
      ))}
    </div>
  )
} 