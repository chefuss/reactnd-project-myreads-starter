import React, {Component} from 'react';
import Book from './Book';

class BookShelf extends Component { 
  render() {
    const booksList = this.props.category; 
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.categoryName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksList.map(book => (
              <li key={book.id}>
                <Book onShelfChange={this.props.onShelfChange} book={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;