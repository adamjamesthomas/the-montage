export const GET_POSTS = 'GET_POSTS'
export const GET_POST_DETAILS = 'GET_POST_DETAILS'
export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const GET_COMMENT_COUNT = 'GET_COMMENT_COUNT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const CHANGE_COMMENT_SORT = 'CHANGE_COMMENT_SORT'
export const CHANGE_POST_SORT = 'CHANGE_POST_SORT'
export const ADD_POST = 'ADD_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'

export function getPosts (posts) {
    return {
        type: GET_POSTS,
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

export function getPostDetails (postDetails) {
    return {
        type: GET_POST_DETAILS,
        postDetails
    }
}

export function getCommentCount (postid, commentCount) {
    return {
        type: GET_COMMENT_COUNT,
        postid,
        commentCount
    }
}

export function getCategoryPosts (category) {
    return {
        type: GET_CATEGORY_POSTS,
        category
    }
}

export function getCategories (categories) {
    return {
        type: GET_CATEGORIES,
        categories
    }
}

export function getComments (comments) {
    return {
        type: GET_COMMENTS,
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