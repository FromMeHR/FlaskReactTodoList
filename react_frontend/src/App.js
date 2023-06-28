import './App.css'
import { useState, useEffect } from 'react';
import PostList from './files/PostList';
import Form from './files/Form';

export function formatDate(dateString) {
  const options = { month: 'long', day: 'numeric', year: 'numeric' }
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', options)
} 
function App() {
  const[Posts, setPosts] = useState([])
  const[editedPost, setEditedPost] = useState(null)
  const[showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(resp => setPosts(resp))
      .catch(error => console.log(error))
  }, [])

  const editPost = (PostId) => {
    const selectedPost = Posts.find(Post => Post.id === PostId)
    setEditedPost(selectedPost)
    setShowForm(true)
  }

  const updatedData = (Post) => {
    const newPosts = Posts.map(myPost => {
      if (myPost.id === Post.id) {
        return Post
      } else {
        return myPost
      }
    })
    setPosts(newPosts)
    setShowForm(false)
  }

  const openForm = () => {
    setEditedPost({ title:'', body:''})
    setShowForm(true)
  }

  const addedPost = (Post) => {
    const newPosts = [...Posts, Post]
    setPosts(newPosts)
    setShowForm(false)
  }

  const deletePost = (Post) => {
    const newPosts = Posts.filter(myPost => myPost.id !== Post.id)
    setPosts(newPosts)
  }

  const cancelForm = () => {
    setEditedPost(null)
    setShowForm(false) 
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h1>Todo List <button className="btn btn-success" onClick={openForm} style={{ marginLeft: '10px' }}>Add Task</button></h1>
        </div>
      </div>
      <hr/>
      {showForm && editedPost ? (<Form Post={editedPost} updatedData={updatedData} addedPost={addedPost} cancelForm={cancelForm}/>):null}
      <PostList Posts={Posts} editPost={editPost} deletePost={deletePost} updatedData={updatedData} addedPost={addedPost} cancelForm={cancelForm}/>
    </div>
  );
}

export default App