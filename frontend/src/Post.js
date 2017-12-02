import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import * as ReadableAPI from './utils/ReadableAPI.js'
import serializeForm from 'form-serialize';
import {
    fetchPostDetails, fetchComments, addComment, changeCommentSort, 
    voteComment, votePost, editComment, deletePost, deleteComment,
    startLoad} from './actions/index.js'
import { connect } from 'react-redux'

class Post extends Component {

    state = {
        editComment: {},
        redirect: false
      }
    componentDidMount() {
        this.props.dispatch(startLoad("POST_DETAILS"))
        this.props.dispatch(startLoad("COMMENTS"))
        
        this.props.dispatch(fetchPostDetails(this.props.match.params.postid, this.props.dispatch))
        this.props.dispatch(fetchComments(this.props.match.params.postid, this.props.dispatch)) 

   
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
    handleChange = (e) => {
        this.setState({editComment: {...this.state.editComment, body: e.target.value}})
    }
    sortTop = () => {
        this.props.dispatch(changeCommentSort("top"));
    }

    sortNew = () => {
        this.props.dispatch(changeCommentSort("new"));
    }
    handleVoteComment = (commentid, option) =>  {
        var increment = (option === "upVote") ? 1 : -1
        ReadableAPI.voteComment(commentid, option).then (() => {
            this.props.dispatch(voteComment(commentid, increment))
        })
    }
    handleDelete = (id, type) =>  {
        if(type === "post"){
            ReadableAPI.deletePost(id).then (() => {
                this.props.dispatch(deletePost(id))
                this.setState({redirect: true})
            })
        } else {
            ReadableAPI.deleteComment(id).then (() => {
                this.props.dispatch(deleteComment(id))
            })
        }
    }

    handleCommentEdit = (comment) =>  {
        if(this.state.editComment.id){
            //make api call to update comment
            ReadableAPI.editComment(this.state.editComment).then (() => {
                this.props.dispatch(editComment(this.state.editComment))
                this.setState({editComment: {}});
        })
           
        } else {
             //set editCommentID to the comment that was clicked
             this.setState({editComment: comment});
        }
    }

    handleVotePost = (postid, option) =>  {
        var increment = (option === "upVote") ? 1 : -1
        ReadableAPI.votePost(postid, option).then (() => {
            this.props.dispatch(votePost(postid, increment))
        })
    }

    timeStampToDateString = (timestamp) => {
        var t = new Date(timestamp);
        return JSON.stringify(t);
    }

    render() {
        const {post, comments, loading} = this.props;    
        if (this.state.redirect)
            {
              return <Redirect push to={"/frontpage"} />
            }
        if(loading.length === 0 && post) {
            if(post.id === undefined){
                    return <div className='error'> Sorry, the post you're trying to access has been removed. </div>
                }
        return (
          <div className="post">
              <div className = "post-score">
                  <div className='post-list-item-vote-buttons' >
                    <button className='post-list-item-upvote' onClick={() => this.handleVotePost(post.id, "upVote")}> Up </button>
                    <button className='post-list-item-downvote' onClick={() => this.handleVotePost(post.id, "downVote")}> Down </button>
                  </div>
                  <div className='post-list-item-score'> {post.voteScore} </div>
              </div>
            <div className = "post-title">
                {post.title}
            </div>
            <div className = "post-author">
                {post.author}
            </div>
            <div className = "post-body">
            <iframe width="560" height="315" title="vidPlayer"
            src={"https://www.youtube.com/embed/"+post.body+"?rel=0&autoplay=1" }
            frameBorder="0" allowFullScreen></iframe>
            </div>
            <div className = "post-timestamp">
                {this.timeStampToDateString(post.timestamp)}
            </div>
            <div className = "post-alter">
            <Link to={"/createpost/" + post.id } className='link-button'>Edit</Link>
            <button onClick={() => this.handleDelete(post.id, "post")}> Delete </button>
            </div>
            <div className = "post-comments">
            {this.props.comments.length} comments
            <hr/>
            <div className='post-comment-list-choose-sort'>
                Sort by: 
                <button onClick={this.sortTop}> Top </button>
                <button onClick={this.sortNew}> New </button>
            </div>
            <form onSubmit={this.handleSubmit} className="create-comment-form">
                
              <div className="create-comment-details">
                <input type="text" name="author" placeholder="Name" /> <br/>
                <textarea type="text" name="body" placeholder="Comment" className='create-comment-details-body' /> <br/>
                <button>Submit Comment</button>
              </div>
            </form>
            <ol className='post-comment-list'>
                {comments && comments.map((comment) => (
                    <li key={comment.id} className='post-comment-list-item'>
                            <div className='post-comment-list-left'>
                                <div className='post-comment-list-vote'> 
                                    <button onClick={() => this.handleVoteComment(comment.id, "upVote")} className='post-list-comment-upvote'> Up </button>
                                    <button onClick={() => this.handleVoteComment(comment.id, "downVote")} className='post-list-comment-downvote'> Up> Down </button>
                                </div>
                                <p className='post-comment-list-score'> {comment.voteScore} </p>
                            </div>
                    <p>
                        { this.state.editComment.id === comment.id ? ( 
                            <input type="text" name="body" placeholder="Body" value={this.state.editComment.body} onChange={this.handleChange}/>
                        ) : (
                            comment.body
                        )
                        }
                    </p>
                    <p className="post-comment-author">{comment.author}</p>
                    <p className='post-comment-timestamp'>{this.timeStampToDateString(comment.timestamp)}</p>
                    
                    { this.state.editComment.id === comment.id ? ( 
                            <button onClick={() => this.handleCommentEdit(comment)}> Submit </button>
                        ) : (
                            <button onClick={() => this.handleCommentEdit(comment)}> Edit </button>
                        )
                    }
                    <button onClick={() => this.handleDelete(comment.id, "comment")}> Delete </button>
                    </li>
                ))}
                </ol>
            </div>
          </div>
        );
        } else { 
            return (
                <div className="Loader"> 
                    Loading
                    </div>
            )
        }
    }
}
function mapStateToProps (state) {
    var sortedComments = null;
    if(state.comments){
            sortedComments = state.comments
            if (state.commentSort === "top") {
                sortedComments.sort(function(a,b){
                    if(a.voteScore === b.voteScore) return 0;
                    return a.voteScore < b.voteScore ? 1 : -1;
                })
                
            }
            else {
                sortedComments.sort(function(a,b){
                    if(a.timestamp === b.timestamp) return 0;
                    return a.timestamp < b.timestamp ? 1 : -1;
                })
            }
        }
    return {
        loading: state.loading,
        post: state.postDetails,
        comments: sortedComments,
        commentSort: state.commentSort
    }
  }
export default withRouter(
    connect(mapStateToProps)(Post)
  );