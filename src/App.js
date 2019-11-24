import React from 'react'
import './App.css'
import Search from './Search'
import ListOfBooks from './ListofBooks'
import { Route } from 'react-router-dom'
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

  // I have checked the changeShelf function to make mine updateShelf, from:
  // https://github.com/sarah-maris/reactnd-project-myreads/blob/master/src/components/App.js

  updateShelf = (newBook, shelf) => {
    BooksAPI.update(newBook, shelf).then(response => {
      newBook.shelf = shelf;
      this.setState(currentState => ({
        books: currentState.books
          .filter(book => book.id !== newBook.id)
          .concat(newBook)
      }));
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListOfBooks
              books={this.state.books}
              onShelfChange={this.updateShelf}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <Search books={this.state.books} onShelfChange={this.updateShelf} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp
