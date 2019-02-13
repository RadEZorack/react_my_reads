import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }
  state = {
    query: '',
    search_books: [],
  }
  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))
    if (query){
      BooksAPI.search(query)
        .then((data) => {
          // console.log(data)
          if (!(data) || data.error){
            this.setState(() => ({
              search_books: []
            }))
          }else{
            // Data does not have books on shelves, we need to map that
            let search_books = data.map(search_book =>{
              let shelf_book = this.props.books.filter(book => book.id === search_book.id)
              // console.log(shelf_book)
              if (shelf_book.length){
                search_book.shelf = shelf_book[0].shelf
              }else{
                search_book.shelf = "none"
              }
              return search_book
            })
            this.setState(() => ({
              search_books: search_books
            }))
          }
        })
    }else{
      this.setState(() => ({
        search_books: []
      }))
    }
  }

  render() {
    const { query, search_books } = this.state
    const onChangeShelf = this.props.onChangeShelf

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
          ><button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <Shelf
            books={search_books}
            onChangeShelf={onChangeShelf}
          />
        </div>
      </div>
    )
  }
}

export default Search