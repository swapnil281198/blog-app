import React, {useState, useEffect} from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [posts,setPosts] = useState([]);
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");

  const loadPosts = async() => {
    const res = await axios.get("http://localhost:5000/posts");
    setPosts(res.data);
  };

  useEffect(()=>{
    loadPosts();
  },[]);

  const submitPost = async() =>{

    await axios.post(
      "http://localhost:5000/posts",
      {
        title,
        content
      }
    );

    setTitle("");
    setContent("");

    loadPosts();
  };

  return (
    <div className="container">

      <h1>DevOps Blog Platform</h1>

      <div className="card">

        <input
          placeholder="Blog Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write Blog..."
          value={content}
          onChange={(e)=>setContent(e.target.value)}
        />

        <button onClick={submitPost}>
          Publish
        </button>

      </div>

      <div className="posts">

      {
        posts.map(post => (
          <div className="post-card" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      }

      </div>

    </div>
  );
}

export default App;
