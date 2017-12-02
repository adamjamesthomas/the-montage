import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import serializeForm from 'form-serialize';
import * as ReadableAPI from './utils/ReadableAPI.js'
import { addPost } from './actions/index.js'
import { connect } from 'react-redux'
import {receivePostDetails} from './actions/index.js'


class CreatePost extends Component {

  state = {
    post: {author: "",
           title: "",
           body: "",
           category: ""},
    redirect: false,
    newID: null,
    isEdit: false
  }
  componentDidMount() {
    if(this.props.match.params.postid) {
      
      ReadableAPI.getPostDetails(this.props.match.params.postid).then((post) => {    
        this.props.dispatch(receivePostDetails({ 
            post 
          }))
          this.setState({
            isEdit: true,
            post: post
          })
      })
    }
}
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { has: true})
    if(this.state.isEdit){
      const {post} = this.state     
      ReadableAPI.editPost(post).then(post => {
       
        this.setState({
          redirect: true,
          newID: post.id
        })
      })
      
    } 
    else {
      values.timestamp = Date.now();
      values.id = Math.random().toString(36).substr(-8);
      ReadableAPI.submitPost(values).then(values => {
        this.props.dispatch(addPost({
          values
        }))
      })
      this.setState({
        redirect: true,
        newID: values.id
      })
    }
}
handleChange = (e) => {
  switch(e.target.name){
    case "author":
      this.setState({post: {...this.state.post, author: e.target.value}})
      break;
    case "title":
      this.setState({post: {...this.state.post, title: e.target.value}})
      break;
    case "body":
      this.setState({post: {...this.state.post, body: e.target.value}})
      break;   
    case "category":
      this.setState({post: {...this.state.post, category: e.target.value}})
      break;  
    default:
    
  }
}
    render() {
    
      if (this.state.redirect)
        {
          return <Redirect push to={"/post/" + this.state.newID} />
        }
        
        return (
          <div>
            <form onSubmit={this.handleSubmit} className="create-post-form">
              <div className="create-post-details">
                <div className="create-post-detail">
                  Upload your favorite video game highlight along with a title. <br/><br/>
                Username <input type="text" name="author" placeholder="Name" value={this.state.post.author} onChange={this.handleChange}/> <br/>
                </div>
                <div className="create-post-detail">
                Title <input type="text" name="title" placeholder="Title" value={this.state.post.title} onChange={this.handleChange}/> <br/>
                </div>
                <div className="create-post-detail">
                Category <input type="text" name="category" placeholder="Category" value={this.state.post.category} onChange={this.handleChange}/> <br/>
                </div>
                <div className="create-post-detail">
                YouTube Code (The letters/numbers after "v=" in the YouTube URL) <input type="text" name="body" placeholder="URL" value={this.state.post.body} onChange={this.handleChange}/> <br/>
                </div>
                <button>Submit Post</button>
              </div>
            </form>
          </div>
        );
      }
}
function mapStateToProps (state) {
  return {
      post: state.postDetails
  }
}
export default withRouter(
  connect(mapStateToProps)(CreatePost)
);