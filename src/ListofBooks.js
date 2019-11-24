import React, {Component} from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

class ListOfBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  updateList = (book, event) => {
    let currentBooks = this.props.books;
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
              onShelfChange={this.props.onShelfChange}
              category={this.props.books.filter(
                book => book.shelf === "currentlyReading"
              )}
              categoryName="Currenty Reading"
            />
            <BookShelf
              onShelfChange={this.props.onShelfChange}
              category={this.props.books.filter(
                book => book.shelf === "wantToRead"
              )}
              categoryName="Want to Read"
            />
            <BookShelf
              onShelfChange={this.props.onShelfChange}
              category={this.props.books.filter(book => book.shelf === "read")}
              categoryName="Read"
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListOfBooks;
