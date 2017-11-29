import {
    GET_POSTS,
    GET_POST_DETAILS,
    GET_CATEGORY_POSTS,
    CHANGE_POST_SORT,
    GET_CATEGORIES,
    ADD_POST,
    VOTE_POST,
    GET_COMMENTS,
    ADD_COMMENT,
    DELETE_COMMENT,
    DELETE_POST,
    VOTE_COMMENT,
    EDIT_COMMENT,
    CHANGE_COMMENT_SORT,
    GET_COMMENT_COUNT
} from '../actions'

const initialPostsState = {
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
        case GET_POSTS :
        return {
            ...state, 
            posts: action.posts.posts
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
        case GET_POST_DETAILS :
        return {
            ...state, 
            postDetails: action.postDetails.post
        }
        case GET_COMMENT_COUNT :
        updatedPosts = state.posts.slice()
        updatedPosts.forEach(function(post) {
            if (post.id === action.postid) {
                post.commentCount = action.commentCount
            }
        })
        return {
            ...state, 
            posts: updatedPosts
        }
        case GET_CATEGORY_POSTS :
        return {}
        case GET_CATEGORIES :
        return {
            ...state, 
            categories: action.categories.categories
        }
        case CHANGE_POST_SORT :
        return {
            ...state, 
            postSort: action.newSort
        }
        case GET_COMMENTS :
        return {
            ...state, 
            comments: action.comments.comments
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