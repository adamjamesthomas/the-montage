import * as ReadableAPI from '../utils/ReadableAPI.js'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST_DETAILS = 'RECEIVE_POST_DETAILS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const CHANGE_COMMENT_SORT = 'CHANGE_COMMENT_SORT'
export const CHANGE_POST_SORT = 'CHANGE_POST_SORT'
export const ADD_POST = 'ADD_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const START_LOAD = 'START_LOAD'

export function startLoad (loadType) {
    return {
        type: START_LOAD,
        loadType
    }
}
export const fetchPosts  = () => dispatch => {
    ReadableAPI.getAllPosts()
    .then(posts => dispatch(receivePosts(posts)))  
}
export const fetchCategoryPosts = (category) => dispatch => {
    ReadableAPI.getCategoryPosts(category)
    .then(posts => dispatch(receivePosts(posts)))  
}
export function receivePosts (posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

export function addPost (post) {
    return {
        type: ADD_POST,
        post
    }
}

export function votePost (postid, increment) {
    return {
        type: VOTE_POST,
        postid,
        increment
    }
}
export function voteComment (commentid, increment) {
    return {
        type: VOTE_COMMENT,
        commentid,
        increment
    }
}
export function editComment (comment) {
    return {
        type: EDIT_COMMENT,
        comment
    }
}
export function deleteComment (commentid) {
    return {
        type: DELETE_COMMENT,
        commentid
    }
}
export function deletePost (postid) {
    return {
        type: DELETE_POST,
        postid
    }
}
export const fetchPostDetails  = (postid) => dispatch => {
    ReadableAPI.getPostDetails(postid)
    .then(post => dispatch(receivePostDetails(post)))  
}
export function receivePostDetails (postDetails) {
    return {
        type: RECEIVE_POST_DETAILS,
        postDetails
    }
}

export const fetchCategories = () => dispatch => {
    ReadableAPI.getCategories()
    .then(categories => dispatch(receiveCategories(categories)))  
};
export function receiveCategories (categories) {
    return {
        type: RECEIVE_CATEGORIES,
        categories
    }
}
export const fetchComments  = (postid) => dispatch => {
    ReadableAPI.getComments(postid)
    .then(comments =>   
    dispatch(receiveComments(comments)))
}
export function receiveComments (comments) {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

export function addComment (comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export function changeCommentSort (newSort) {
    return {
        type: CHANGE_COMMENT_SORT,
        newSort
    }
}

export function changePostSort (newSort) {
    return {
        type: CHANGE_POST_SORT,
        newSort
    }
}