import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './Shelves'
import Search from './Search'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
        // console.log(books)
      })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((ids) => {
        // console.log(ids)
        // Im not sure how to use the ids so im doing another api call
        // This appears slow...
        BooksAPI.getAll()
          .then((books) => {
            this.setState(() => ({
              books
            }))
            // console.log(books)
          })
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Shelves
            books={this.state.books}
            onChangeShelf={this.changeShelf}
          />
        )} />
        <Route path='/search' render={() => (
          <Search
            books={this.state.books}
            onChangeShelf={this.changeShelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
