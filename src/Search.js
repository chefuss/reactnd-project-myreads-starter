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
  	Update the shelf for each book, 
  	none if the book is not on any shelf and 
  	if the id book founds on book shelf 
  	then set the current book shelf
  */
  updateData = books => {
    const cBooks = books.map(book => {
      //Check where is the book ?
      book.shelf = "none";
      this.props.books.forEach(book2 => {
        if (book.id === book2.id) {
          book.shelf = book2.shelf;
        }
      });
      return book;
    });
    this.setState({
      books: cBooks
    });
  };

  /* 
  	Read the query when the user types on and display 20 books by calling search method on BookAPI.js
  */
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
    } //With any errors
  };

  clearSearch = () => {
    this.setState({ books: [] });
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