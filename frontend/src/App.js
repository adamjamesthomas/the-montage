import React, { Component } from 'react';
import film_reel from './icons/film_reel.svg';
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './Post';
import PostList from './PostList';
import CreatePost from './CreatePost';
import * as ReadableAPI from './utils/ReadableAPI.js'
import './App.css';
import {getCategories} from './actions/index.js'
import { connect } from 'react-redux'

class App extends Component {
  state = {
    categories : [],
    posts: []
  }
  componentDidMount() {
    ReadableAPI.getCategories().then((categories) => {    
      this.props.dispatch(getCategories({
        categories
      }))
    })
  }
  submitComment(comment) {
    ReadableAPI.submitPost(comment).then(comment => {
      this.setState(state => ({
        comments: state.comments.concat([ comment ])
      }))
    })
  }
   
  render() {
    const {categories} = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={film_reel} className="App-logo" alt="logo" />
          <h1 className="App-title">The Montage</h1>
          <Route path = "/:category?" render={() => (
            <div>
            <ol className='category-list'>

            <li><Link to="/frontpage" className='category-button'>Frontpage</Link></li>
            {categories && categories.map((category) => (
                    <li key={category.name} className='category-list-item'>
                   <Link to = {"/" + category.path} className='category-button'>{category.name}</Link>
                    </li>
                ))}
            </ol>
          <br/>
            </div>
            
            )} />
            <Link to="/createpost" className='link-button'>New Post</Link>
            
        </header>
        <Route exact path = "/" render={() => (
          <PostList category="all"
           />
        )} />
        <Route path = "/frontpage" render={() => (
          <PostList category="all"
           />
        )} />
        <Route path = "/rocketleague" render={() => (
          <PostList category="rocketleague"
          />
        )} />
        <Route path = "/pubg" render={() => (
          <PostList category="pubg"
          />
        )} />
        <Route path = "/hots" render={() => (
          <PostList category="hots"
          />
        )} />
        <Route path = "/post/:postid" component={Post} 
         />
        <Route path = "/createpost/:postid?" render={() => (
          <CreatePost  />
        )} />
      </div>
    );
  } 
}

function mapStateToProps (state) {
  return {
      categories: state.categories
  }
}

export default withRouter(
  connect(mapStateToProps)(App)
);
