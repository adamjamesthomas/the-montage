const api = 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}
//Categories
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getCategoryPosts = (category) =>
fetch(`${api}/${category}/posts`, { headers })
  .then(res => res.json())

//Posts
export const getAllPosts = () =>
fetch(`${api}/posts`, { headers })
  .then(res => res.json())

export const getPostDetails = (postid) =>
fetch(`${api}/posts/${postid}`, { headers })
  .then(res => res.json())
  
export const submitPost = (body) => 
  fetch(`${api}/posts`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
}).then(res => res.json())

export const editPost = (body) => 
fetch(`${api}/posts/${body.id}`, {
method: 'PUT',
headers: {
  ...headers,
  'Content-Type': 'application/json'
},
body: JSON.stringify(body)
}).then(res => res.json())

export const deletePost = (postid) => 
fetch(`${api}/posts/${postid}`, {
method: 'DELETE',
headers: {
  ...headers,
  'Content-Type': 'application/json'
}
}).then(res => res.json())

//Comments

export const getComments = (postid) =>
fetch(`${api}/posts/${postid}/comments`, { headers })
  .then(res => res.json())

export const submitComment = (body) => 
fetch(`${api}/comments`, {
method: 'POST',
headers: {
  ...headers,
  'Content-Type': 'application/json'
},
body: JSON.stringify(body)
}).then(res => res.json())

export const editComment = (body) => 
fetch(`${api}/comments/${body.id}`, {
method: 'PUT',
headers: {
  ...headers,
  'Content-Type': 'application/json'
},
body: JSON.stringify(body)
}).then(res => res.json())

export const deleteComment = (commentid) => 
fetch(`${api}/comments/${commentid}`, {
method: 'DELETE',
headers: {
  ...headers,
  'Content-Type': 'application/json'
}
}).then(res => res.json())

//Voting

export const votePost = (postid, option) => 
fetch(`${api}/posts/${postid}`, {
method: 'POST',
headers: {
  ...headers,
  'Content-Type': 'application/json'
},
body: `{"option":"${option}"}`
}).then(res => res.json())



export const voteComment = (commentid, option) => 
fetch(`${api}/comments/${commentid}`, {
method: 'POST',
headers: {
  ...headers,
  'Content-Type': 'application/json'
},
body: `{"option":"${option}"}`
}).then(res => res.json())