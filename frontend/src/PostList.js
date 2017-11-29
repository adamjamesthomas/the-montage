import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as ReadableAPI from './utils/ReadableAPI.js'
import {getPosts, changePostSort, votePost, getCommentCount} from './actions/index.js'
import { connect } from 'react-redux'

class ListContacts extends Component {

static propTypes = {
    category: PropTypes.string.isRequired
}
state = {
    posts: [],
}
componentDidMount() {
    if(this.props.category === "all"){
            ReadableAPI.getAllPosts().then((posts) => {    
                this.props.dispatch(getPosts({
                    posts
                  }))
                posts.forEach(function(post) {
                    ReadableAPI.getComments(post.id).then((comments) => {
                        this.props.dispatch(getCommentCount(post.id, comments.length))
                    })
                }, this)
              })
        }
        else{
            ReadableAPI.getCategoryPosts(this.props.category).then((posts) => {    
                this.props.dispatch(getPosts({
                    posts
                  }))
                  posts.forEach(function(post) {
                    ReadableAPI.getComments(post.id).then((comments) => {
                        this.props.dispatch(getCommentCount(post.id, comments.length))
                    })
                }, this)
              })
        }
}
sortTop = () => {
    this.props.dispatch(changePostSort("top"));
}

sortNew = () => {
    this.props.dispatch(changePostSort("new"));
}

handleVotePost = (postid, option) =>  {
    var increment = (option === "upVote") ? 1 : -1
    ReadableAPI.votePost(postid, option).then (() => {
        this.props.dispatch(votePost(postid, increment))
    })
}

render() {
    const {posts} = this.props
  return (
      <div className='list-posts'>
        <div className='list-post-choose-sort'>
        <button onClick={this.sortTop}> Top </button>
        <button onClick={this.sortNew}> New </button>
        </div>
        <ol className='post-list'>
                {posts && posts.map((post) => (
                    <li key={post.id} className='post-list-item'>
                        <div className='post-list-item-left'>
                            <div className='post-list-item-vote-buttons'>
                                <button className="post-list-item-upvote" onClick={() => this.handleVotePost(post.id, "upVote")}> Up </button>
                                <button className="post-list-item-downvote" onClick={() => this.handleVotePost(post.id, "downVote")}> Down </button>
                            </div>
                            <div className='post-list-item-score'> 
                                {post.voteScore}
                            </div>
                        </div>
                        <div className="post-list-item-right">
                            <Link className="post-list-item-view" to={"/post/" + post.id}>View</Link>
                        </div>
                    <div className='post-list-item-body'>
                        <p className="post-title">{post.title}</p>
                        <p className="post-author"> by {post.author}</p>
                    </div>
                    <div className="post-comment-count">{post.commentCount} Comments </div>
                    
                    </li>
                ))}
                </ol>
      </div>
    )
}
}

function mapStateToProps (state) {
    const sortedPosts = state.posts
    if (state.postSort === "top") {
        sortedPosts.sort(function(a,b){
            if(a.voteScore === b.voteScore) return 0;
            return a.voteScore < b.voteScore ? 1 : -1;
        })
        
    }
    else {
        sortedPosts.sort(function(a,b){
            if(a.timestamp === b.timestamp) return 0;
            return a.timestamp < b.timestamp ? 1 : -1;
        })
    }
    return {
        posts: state.posts,
        postSort: state.postSort
    }
  }

export default connect(mapStateToProps)(ListContacts)