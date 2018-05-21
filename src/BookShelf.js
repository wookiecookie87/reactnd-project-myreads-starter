import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI.js'

class BookShelf extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		shelf: PropTypes.string.isRequired,
		onUpdateShelf: PropTypes.func.isRequired
	}

	handleChange = (book, e) => {
		if(this.props.onUpdateShelf) {
			this.props.onUpdateShelf.call(this.props.bookApp, [book, e.target.value])
		}
	}

	render() {
		const { books, shelf} = this.props
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
								<li key={book.id}>
									<div className="book">
										<div className="book-top">
											<div className="book-cover" style={{ 
												width: 128, height: 188, 
												backgroundImage: 'url("'+book.imageLinks.thumbnail+'")' }}></div>
											<div className="book-shelf-changer">
												<select value={shelfOptions} onChange={(e) =>this.handleChange(book, e)}>
													<option value="none" disabled>Move to...</option>
													<option value="currentlyReading">Currently Reading</option>
													<option value="wantToRead">Want to Read</option>
													<option value="read">Read</option>
													<option value="none">None</option>
												</select>
											</div>
										</div>	
										<div className="book-title">{book.title}</div>
										<div className="book-authors">{book.authors}</div>
									</div>
								</li>
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