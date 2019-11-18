import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
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
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp
