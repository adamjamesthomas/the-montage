import React, { Component } from 'react';
import film_reel from './icons/film_reel.svg';
import { Route, Link, withRouter } from 'react-router-dom'
import Post from './Post';
import PostList from './PostList';
import CreatePost from './CreatePost';
import './App.css';
import {fetchCategories} from './actions/index.js'
import { connect } from 'react-redux'

class App extends Component {
  state = {
    categories : [],
    posts: []
  }
  componentDidMount() {
      this.props.dispatch(fetchCategories(this.props.dispatch))
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
        <Route exact path = "/frontpage" render={() => (
          <PostList category="all"
           />
        )} />
        <Route exact path = "/rocketleague" render={() => (
          <PostList category="rocketleague"
          />
        )} />
        <Route exact path = "/pubg" render={() => (
          <PostList category="pubg"
          />
        )} />
        <Route exact path = "/hots" render={() => (
          <PostList category="hots"
          />
        )} />
        <Route exact path = "/:category/:postid" component={Post} 
         />
        <Route path = "/createpost/edit/:postid?" render={() => (
          <CreatePost  />
        )} />
        <Route exact path = "/createpost" render={() => (
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
