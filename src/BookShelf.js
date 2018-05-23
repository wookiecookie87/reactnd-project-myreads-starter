import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'
import * as BooksAPI from './BooksAPI.js'

class BookShelf extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		shelf: PropTypes.string.isRequired,
		onUpdateShelf: PropTypes.func.isRequired
	}

	render() {
		const { books, shelf, onUpdateShelf} = this.props
		const shelfOptions = shelf === "Currently Reading" ? 'currentlyReading' : 
							 (shelf === "Want to Read" ? "wantToRead" :
							 (shelf === "Read" ? "read" : 'none'))
							
		return (
			 <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{shelf}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      	{
                      		books.map((book) => (
								<Book key={book.id}
								book={book}
								shelf={shelfOptions}
								onUpdateShelf = {onUpdateShelf}
								/>
							))
                      	}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
		)
	}
}

export default BookShelf