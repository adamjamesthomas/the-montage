import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ReadableAPI from './utils/ReadableAPI.js'
import serializeForm from 'form-serialize';
import {getPostDetails, getComments, addComment, changeCommentSort, voteComment, votePost} from './actions/index.js'
import { connect } from 'react-redux'

class Comment extends Component {

    state = {
        post: {},
        redirect: false,
        newID: null,
        isEdit: false
      }
    componentDidMount() {
        ReadableAPI.getPostDetails(this.props.match.params.postid).then((post) => {    
          this.props.dispatch(getPostDetails({ 
              post 
            }))
        })
        ReadableAPI.getComments(this.props.match.params.postid).then((comments) => {    
            this.props.dispatch(getComments({ 
                comments 
              }))
          })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, { has: true})
        values.id = Math.random().toString(36).substr(-8);
        values.timestamp = Date.now();
        values.parentId = this.props.post.id;
        ReadableAPI.submitComment(values).then(comment => {
            this.props.dispatch(addComment({
                comment
            })
             )
        })
    }
    sortTop = () => {
        this.props.dispatch(changeCommentSort("top"));
    }

    sortNew = () => {
        this.props.dispatch(changeCommentSort("new"));
    }
    handleVoteComment = (commentid, option) =>  {
        var increment = (option == "upVote") ? 1 : -1
        ReadableAPI.voteComment(commentid, option).then (() => {
            this.props.dispatch(voteComment(commentid, increment))
        })
    }

    handleVotePost = (postid, option) =>  {
        var increment = (option == "upVote") ? 1 : -1
        ReadableAPI.votePost(postid, option).then (() => {
            this.props.dispatch(votePost(postid, increment))
        })
    }

    render() {
        const {post, comments, commentSort} = this.props;
       
        var t = null; 
        if(post) {
            t = new Date(post.timestamp);
        return (
                <div className='post-comment'>
                    <div className='post-comment-list-vote'> 
                        <button onClick={() => this.handleVoteComment(comment.id, "upVote")}> Up </button>
                        <button onClick={() => this.handleVoteComment(comment.id, "downVote")}> Down </button>
                    </div>
                    <p>{comment.body}</p>
                    <p className="post-comment-author">{comment.author}</p>
                    <p>{comment.timestamp}</p>
                    <p> Score: {comment.voteScore} </p>
                    
                </div>
        )} else { 
            return (
                <div className="Loader"> 
                    Loading
                    </div>
            )
        }
    }
}
function mapStateToProps (state) {
    
  }
export default withRouter(
    connect()(Comment)
  );