import {
    RECEIVE_POSTS,
    RECEIVE_POST_DETAILS,
    CHANGE_POST_SORT,
    RECEIVE_CATEGORIES,
    ADD_POST,
    VOTE_POST,
    RECEIVE_COMMENTS,
    ADD_COMMENT,
    DELETE_COMMENT,
    DELETE_POST,
    VOTE_COMMENT,
    EDIT_COMMENT,
    CHANGE_COMMENT_SORT,
    START_LOAD
} from '../actions/types.js'

const initialPostsState = {
    loading: [],
    categories: [],
    posts: [],
    comments: [],
    postSort: "top",
    commentSort: "top",
    postDetails: null,
    commentDetails: null
}

function posts (state = initialPostsState, action) {
    var updatedComments;
    var updatedPosts;
    switch (action.type) {
        case START_LOAD :
        return {
            ...state,
            loading: state.loading.concat(action.loadType)
        }
        case RECEIVE_POSTS :
        return {
            ...state, 
            posts: action.posts
        }
        case ADD_POST :
        return {
            ...state, 
            posts: state.posts.concat([ action.post.values ]),
            postDetails: action.post.values

        }
        case VOTE_POST :
            updatedPosts = state.posts.slice()
            updatedPosts.forEach(function(post) {
                if (post.id === action.postid) {
                    post.voteScore += action.increment
                }
            })
        return {
            ...state, 
            posts: updatedPosts
        }
        case VOTE_COMMENT :
        updatedComments = state.comments.slice()
        updatedComments.forEach(function(comment) {
            if (comment.id === action.commentid) {
                comment.voteScore += action.increment
            }
        })
        return {
            ...state, 
            comments: updatedComments
        }
        case DELETE_COMMENT :
        updatedComments = state.comments.slice()
        for(var i = updatedComments.length - 1; i >= 0; i--) {
            if(updatedComments[i].id === action.commentid) {
                updatedComments.splice(i, 1);
            }
        }
        return {
            ...state, 
            comments: updatedComments
        }
        case DELETE_POST :
        updatedPosts = state.posts.slice()
        for(i = updatedPosts.length - 1; i >= 0; i--) {
            if(updatedPosts[i].id === action.postid) {
                updatedPosts.splice(i, 1);
            }
        }
        return {
            ...state, 
            posts: updatedPosts,
            postDetails: {}
        }
        case EDIT_COMMENT :
        updatedComments = state.comments.slice()
        updatedComments.forEach(function(comment) {
            if (comment.id === action.comment.id) {
                comment.body = action.comment.body
            }
        })
        return {
            ...state, 
            comments: updatedComments
        }
        case RECEIVE_POST_DETAILS :
        var index = state.loading.indexOf("POST_DETAILS")
        var newLoad = state.loading.slice();
        if (index > -1) {
            newLoad.splice(index, 1)
        }
        return {
            ...state, 
            postDetails: action.postDetails,
            loading: newLoad
        }
        case RECEIVE_CATEGORIES :
        return {
            ...state, 
            categories: action.categories
        }
        case CHANGE_POST_SORT :
        return {
            ...state, 
            postSort: action.newSort
        }
        case RECEIVE_COMMENTS :
        index = state.loading.indexOf("COMMENTS")
        newLoad = state.loading.slice();
        if (index > -1) {
            newLoad.splice(index, 1)
        }
        return {
            ...state, 
            comments: action.comments,
            loading: newLoad
        }
        case ADD_COMMENT :
        return {
            ...state, 
            comments: state.comments.concat([ action.comment.comment ])
        }
        case CHANGE_COMMENT_SORT :
        return {
            ...state, 
            commentSort: action.newSort
        }
        default :
        return state
    }
}

export default posts