import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search.js'
import BookList from './BookList.js'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'

class BooksApp extends React.Component {
    state = {
    /**
    * TODO: Instead of using this state variable to keep track of which page
    * we're on, use the URL in the browser's address bar. This will ensure that
    * users can use the browser's back and forward buttons to navigate between
    * pages, as well as provide a good URL they can bookmark and share.
    */
        books : []
    }

    componentDidMount() {
        BooksAPI.getAll()
        .then(books => {
            this.setState(() => ({
                books
            }))
        })
    }

    updateShelf(book, shelf) {
        book.shelf = shelf
        BooksAPI.update(book, shelf)
        .then(()=>{
            this.setState((currentState) => ({
                books : currentState.books.filter((books) => {
                    return books.id !== book.id
                }).concat(book)
            }))
        })
    }

    searchBooks(query) {
        return BooksAPI.search(query)
        .then(result => {
            return result
        })
    }   

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BookList 
                    books={this.state.books}
                    onUpdateShelf={this.updateShelf.bind(this)}
                    />
                )}/>
                
                <Route path="/search" render={() => (
                    <Search onSearchBooks={this.searchBooks}
                    books={this.state.books}
                    onUpdateShelf={this.updateShelf.bind(this)}
                    />            
                )}/>   
            </div>
        )
    }
}

export default BooksApp
