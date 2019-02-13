import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

class Shelves extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }
  render() {
    const { books, onChangeShelf } = this.props
    const currently_reading_books = books.filter( book => book.shelf === 'currentlyReading' );
    const want_to_read_books = books.filter( book => book.shelf === 'wantToRead' );
    const read_books = books.filter( book => book.shelf === 'read' );

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <Shelf
                  books={currently_reading_books}
                  onChangeShelf={onChangeShelf}
                />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <Shelf
                  books={want_to_read_books}
                  onChangeShelf={onChangeShelf}
                />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <Shelf
                  books={read_books}
                  onChangeShelf={onChangeShelf}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
          ><button>Add a book</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Shelves