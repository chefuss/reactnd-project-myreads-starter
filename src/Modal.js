import React, {Component} from 'react';

// most of the code for the modal component comes from: https://daveceddia.com/open-modal-in-react/

class Modal extends Component {
  render() {
    if (!this.props.show){
       document.querySelector('body').style.overflow = 'visible';
      return null;
    }
    if (this.props.show) {
      document.querySelector('body').style.overflow='hidden';
    } 
    const book = this.props.book;
    const state =
      this.props.book.shelf === 'currentlyReading'
        ? 'Currently Reading'
        : this.props.book.shelf === 'wantToRead'
        ? 'Want to read'
        : this.props.book.shelf === 'read' ? 'Read' : 'None';
    const bookAuthors = book.authors ? book.authors.join(', ') : '';
    const bookCategories = book.categories ? book.categories.join(', ') : '';
    return (
      <div id="modal" className="modal">
        <div className="modal-container">
          <div className="modal-close" onClick={this.props.onClose}>
            <span className="icon-close"></span>
          </div>
          <div className="modal-heading">
            <h1>{book.title}</h1>
            {book.subtitle && <h2>{book.subtitle}</h2>}
            <p>
              <span>State: </span> {state}
            </p>
            {bookCategories && (
              <p>
                <span>Categories:</span> {bookCategories}
              </p>
            )}
            {book.pageCount && (
              <p>
                <span>Pages:</span> {book.pageCount} p.
              </p>
            )}
            {bookAuthors && (
              <p>
                <span>Author/s:</span> {bookAuthors}
              </p>
            )}
            {book.publisher && (
              <p>
                <span>Publisher:</span> {book.publisher}
              </p>
            )}
          </div>
          <div className="modal-content">
            {book.description && (
              <p>
                <span>Description:</span> {book.description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;