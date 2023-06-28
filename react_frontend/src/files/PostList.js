import React, { useState } from 'react';
import { formatDate } from '../App';
import APIService from './APIService';
import Form from './Form';
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

    const cancelForm = () => {
        setSelectedPostId(null)
    }

    return (
      <div>
          {props.Posts && props.Posts.map(Post => {
              return (
              <div key={Post.id}>
                  <h2>{Post.title}</h2>
                  <p>{formatDate(Post.date)}</p>
                  <p style={{ wordWrap: 'break-word', maxWidth: '1020px', margin: 'auto' }}>{Post.body}</p><br/>
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
