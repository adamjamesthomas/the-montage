import * as ReadableAPI from '../utils/ReadableAPI.js'
import {
    RECEIVE_POSTS,
    RECEIVE_POST_DETAILS,
    RECEIVE_COMMENTS,
    ADD_COMMENT,
    DELETE_COMMENT,
    DELETE_POST,
    VOTE_COMMENT,
    EDIT_COMMENT,
    CHANGE_COMMENT_SORT,
    CHANGE_POST_SORT,
    ADD_POST,
    VOTE_POST,
    RECEIVE_CATEGORIES,
    START_LOAD
} from './types.js'


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