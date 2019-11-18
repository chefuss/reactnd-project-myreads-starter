import React, { Component } from 'react';

class Book extends Component {

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

  render() {
    const book = this.props.book;    
    const categories = ["Currently Reading", "Want to Read", "Read", "None"];
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              defaultValue={`${book.shelf}`}
              onChange={event => this.props.onChangeBook(book, event)}
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
        <div className="book-title">{book.title}</div>
        {book.authors.map((author, index) => {
          return (
            <div key={index} className="book-authors">
              {author}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Book;