import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from './Book'
import { Link } from "react-router-dom";


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: props.books,
      query: ""
    };
    this.updateQuery.bind(this);
    this.updateData.bind(this);
  }
 
  /* 
    If the book has no shelf, set it to none
    else set it to the correct shelf
  */
  updateData = books => {
    const currentBooks = books.map(queryBook => {
      queryBook.shelf = "none";
      this.props.books.forEach(book => {
        if (queryBook.id === book.id) {
          queryBook.shelf = book.shelf;
        }
      });
      return queryBook;
    });

    this.setState({
      books: currentBooks
    });
  };

  updateQuery = query => {
    this.setState({ query });
    if (query) {
      BooksAPI.search(query, 20)
        .then(books => {
          books.length > 0
            ? this.updateData(books)
            : this.setState({ books: [] });            
        })
        .catch(e => {
          console.error(`The API responded with an error: ${e}`);
        });
    } else {
      this.setState({ books: [] });
    } 
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book => (
              <li key={book.id}>
                <Book book={book} onShelfChange={this.props.onShelfChange}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default Search;