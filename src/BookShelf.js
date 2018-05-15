import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI.js'

class BookShelf extends Component {
	static propTypes = {
		currentlyReading: PropTypes.array.isRequired,
		wantToRead: PropTypes.array.isRequired,
		read: PropTypes.array.isRequired,
		onUpdateShelf: PropTypes.func.isRequired
	}

	handleChange = (book, e) => {
		console.log(book)

		if(this.props.onUpdateShelf) {
			this.props.onUpdateShelf.call(this, [book, e.target.value])
		}
	}

	render() {
		const { currentlyReading, wantToRead,  read, onUpdateShelf} = this.props
		return (
			 <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      	{
                      		currentlyReading.map((book) => (
								<li key={book.id}>
									<div className="book">
										<div className="book-top">
											<div className="book-cover" style={{ 
												width: 128, height: 188, 
												backgroundImage: 'url("'+book.imageLinks.thumbnail+'")' }}></div>
											<div className="book-shelf-changer">
												<select value="currentlyReading" onChange={(e) =>this.handleChange(book, e)}>
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                      		wantToRead.map((book) => (
								<li key={book.id}>
									<div className="book">
										<div className="book-top">
											<div className="book-cover" style={{ 
												width: 128, height: 188, 
												backgroundImage: 'url("'+book.imageLinks.thumbnail+'")' }}></div>
											<div className="book-shelf-changer">
												<select value="currentlyReading" onChange={(e) =>this.handleChange(book, e)}>
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                       {
                      		read.map((book) => (
								<li key={book.id}>
									<div className="book">
										<div className="book-top">
											<div className="book-cover" style={{ 
												width: 128, height: 188, 
												backgroundImage: 'url("'+book.imageLinks.thumbnail+'")' }}></div>
											<div className="book-shelf-changer">
												<select value="currentlyReading" onChange={(e) =>this.handleChange(book, e)}>
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