import React, { useState, useEffect } from 'react';
import APIService from '../files/APIService';
function Form(props) {
    const[title, setTitle] = useState('')
    const[body, setBody] = useState('')

    useEffect(() => {
        setTitle(props.Post.title)
        setBody(props.Post.body)
    },[props.Post]) 

    const updatePost = () => {
        APIService.UpdatePost(props.Post.id, { title, body })
        .then(resp => {
            props.updatedData(resp) 
            props.cancelForm()
        })
        .catch(error => console.log(error))
    }

    const addPost = () => {
        APIService.AddPost({ title, body })
        .then(resp => {
          props.addedPost(resp)
          props.cancelForm()
        })
        .catch(error => console.log(error))
    }

    const cancelAction = () => {
      setTitle('')
      setBody('')
      props.cancelForm()
    }

    return ( 
      <div>
          {props.Post ? (
              <div className="mb-3">
                  <label htmlFor="title" className="form-label">New title</label>
                  <input style={{ width: '50%', margin: 'auto' }} type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter the new title"/>
                  <label htmlFor="body" className="form-label">New text</label>
                  <textarea style={{ width: '50%', margin: 'auto' }} className="form-control" rows="2" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Enter the new post"/>
                  {props.Post.id ? (
                  <><button className="btn btn-success mt-3" onClick={updatePost}>Save Changes</button>
                  <button className="btn btn-secondary mt-3" onClick={cancelAction} style={{ marginLeft: '40px' }}>Cancel</button></>
                  ) : (
                  <><button className="btn btn-success mt-3" onClick={addPost}>Add</button>
                  <button className="btn btn-secondary mt-3" onClick={cancelAction} style={{ marginLeft: '40px' }}>Cancel</button><br/><br/><hr className="hor-line"/></>
                  )}
              </div>
          ):null
          }
      </div>
    )
}

export default Form;
