import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf.js'
import { Link } from 'react-router-dom'

class BookList extends Component {
	
	static propTypes = {
		books : PropTypes.array.isRequired,
		onUpdateShelf: PropTypes.func.isRequired
	}



	render() {
		const { books } = this.props;

		const currentlyReading = books.filter(book => {
                    if(book.shelf === 'currentlyReading')
                        return book
                })
        const wantToRead = books.filter(book => {
                    if(book.shelf === 'wantToRead')
                        return book
                })   
        const read = books.filter(book => {
                    if(book.shelf === 'read')
                        return book
                })

		return (
			<div className="list-books">
	            <div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>
	           	<BookShelf  
	           	shelf="Currently Reading"
				books={currentlyReading}
	           	onUpdateShelf={this.props.onUpdateShelf}
	           	bookApp={this.props.bookApp}/>
	           	<BookShelf 
	           	shelf="Want to Read" 
				books={wantToRead} 
	           	onUpdateShelf={this.props.onUpdateShelf}
	           	bookApp={this.props.bookApp}/>
	           	<BookShelf  
	           	shelf="Read"
				books={read} 
	           	onUpdateShelf={this.props.onUpdateShelf}
	           	bookApp={this.props.bookApp}/>
	            <div className="open-search">
	              <Link to="/search">Add a book</Link>
	            </div>
			</div>
		)
	}
}

export default BookList;