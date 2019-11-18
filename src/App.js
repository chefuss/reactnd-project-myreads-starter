import React from 'react'
import './App.css'
import Search from './Search'
import ListOfBooks from './ListofBooks'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
 
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={ListOfBooks} />
        <Route exact path="/Search" component={Search} />
      </div>
    );
  }
}

export default BooksApp
