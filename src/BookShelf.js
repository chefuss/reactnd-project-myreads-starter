import React, {Component} from 'react';
import Book from "./Book";

class BookShelf extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const booksList = this.props.category;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.categoryName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/*por cada libro que haya en la lista se debe llamar al componente book, pasando los datos de name, autor, y shelf.*/}
            {booksList.map((book) => (
              <li key={book.id}>
                <Book book={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;