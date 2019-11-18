import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./BookShelf";
import { Route, Link } from "react-router-dom";

class ListOfBooks extends React.Component {
  state = {
    books: []
  };
  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState(() => ({
        books: data
      }));
    });
  }

  updateList = (book, event) => {
    let currentBooks = this.state.books;
    let selectedBook = currentBooks.filter(currentBook => {
      return currentBook.id === book.id;
    });
    selectedBook = selectedBook[0];
    selectedBook.shelf = event.target.value;
    BooksAPI.update(selectedBook, event.target.value).then(response => {
      this.setState({
        books: currentBooks
      });
    });
  };
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              onBookChange={this.updateList}
              category={this.state.books.filter(
                book => book.shelf === "currentlyReading"
              )}
              categoryName="Currenty Reading"
            />
            <BookShelf
              onBookChange={this.updateList}
              category={this.state.books.filter(
                book => book.shelf === "wantToRead"
              )}
              categoryName="Want to Read"
            />
            <BookShelf
              onBookChange={this.updateList}
              category={this.state.books.filter(
                book => book.shelf === "read"
              )}
              categoryName="Read"
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/Search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListOfBooks;
