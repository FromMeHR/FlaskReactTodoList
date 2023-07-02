import React, { useState } from 'react';
import { formatDate } from '../App';
import APIService from './APIService';
import Form from './Form';
import { BsCheck } from 'react-icons/bs';
function PostList(props) {
    const[selectedPostId, setSelectedPostId] = useState(null)
    const editPost = (PostId) => {
        setSelectedPostId(PostId) 
    }

    const deletePost = (Post) => { 
        APIService.DeletePost(Post.id)
            .then(() => props.deletePost(Post))
            .catch(error => console.log(error))
    }

    const completePost = (Post) => {
        APIService.UpdateCompleted(Post.id)
            .then(resp => props.updatedData(resp))
            .catch(error => console.log(error))
    }

    const cancelForm = () => {
        setSelectedPostId(null)
    }

    return (
      <div>
          {props.Posts && props.Posts.map(Post => {
              return (
              <div key={Post.id}>
                  <h2 className={`${Post.completed ? 'completed' : ''}  post-text`}>{Post.title}
                      <button
                          className={`btn btn-outline-success ${Post.completed ? 'active' : ''} rounded-circle circle`}
                          onClick={() => completePost(Post)}
                          style={{ marginLeft: '10px', backgroundColor: Post.completed ? 'white' : 'transparent',
                          borderColor: 'white', color: Post.completed ? 'black' : 'white', padding: 0 }}>
                          {Post.completed ? (
                          <BsCheck size={20} className="text-black"/>
                          ) : (
                          <BsCheck size={20} className="text-white"/>
                          )}
                      </button>
                  </h2>
                  <p className={Post.completed ? 'completed' : ''}>{formatDate(Post.date)}</p>
                  <p className={`${Post.completed ? 'completed' : ''} post-text`}>{Post.body}</p><br/>
                  <div className="row justify-content-center">
                      <div className="col-md-6 text-center">
                          <button className="btn btn-primary" onClick={() => editPost(Post.id)}>Edit</button>
                          <button className="btn btn-danger" onClick={() => deletePost(Post)} style={{ marginLeft: '40px' }}>Delete</button>
                      </div>
                  </div><br/>
                  <hr className="hor-line"/>
                  {selectedPostId === Post.id && (
                  <Form Post={Post} updatedData={props.updatedData} addedPost={props.addedPost} cancelForm={cancelForm}/>
                  )}
                  <hr className="hor-line"/>
              </div>
              )
          })}
      </div>
    )
}

export default PostList;
