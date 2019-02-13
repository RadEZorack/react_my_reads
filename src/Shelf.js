import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }
  render() {
    const { books, onChangeShelf } = this.props

    return (
      <ol className="books-grid">
        {books && books.map((book) => (
          <li key={book.id}>
            <Book
              book={book}
              onChangeShelf={onChangeShelf}
            />
          </li>
        ))}
      </ol>
    )
  }
}

export default Shelf