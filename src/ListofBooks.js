import React, {Component} from "react";
import "./App.css";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

class ListOfBooks extends Component {
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
