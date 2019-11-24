import React, { Component } from 'react';
import Modal from './Modal'

// most of the code for the modal component comes from: https://daveceddia.com/open-modal-in-react/

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  camelCaseString(arr) {
    const array = arr.split(" ");
    array[0] = array[0].toLowerCase();
    array.forEach((el, index) => {
      if (index > 0) {
        const first = el.substr(0, 1).toUpperCase();
        const rest = el.substr(1).toLowerCase();
        array[index] = first + rest;
      }
    });
    return array.join("");
  }
  toggleModal = () => {    
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    const book = this.props.book;
    const bookAuthors = book.authors ? book.authors.join(", ") : "";

    const bookThumbnail =
      book.imageLinks && book.imageLinks.thumbnail
        ? `url(${book.imageLinks.thumbnail})`
        : "";
    const categories = ["Currently Reading", "Want to Read", "Read", "None"];
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            onClick={this.toggleModal}
            style={{
              width: 128,
              height: 193,
              backgroundImage: `${bookThumbnail}`
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              defaultValue={`${book.shelf}`}
              onChange={event =>
                this.props.onShelfChange(book, event.target.value)
              }
            >
              <option value="move" disabled>
                Move to...
              </option>
              {categories.map((category, index) => {
                const categoryValue = this.camelCaseString(category);
                return (
                  <option key={index} value={`${categoryValue}`}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="book-title" onClick={this.toggleModal}>
          {book.title}
        </div>
        <div className="book-authors">{bookAuthors}</div>
        <Modal
          book={book}
          show={this.state.isOpen}
          onClose={this.toggleModal}
        />
      </div>
    );
  }
}

export default Book;