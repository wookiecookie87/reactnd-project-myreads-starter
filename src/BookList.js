import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf.js'
import { Link } from 'react-router-dom'

class BookList extends Component {
	
	static propTypes = {
		currentlyReading: PropTypes.array.isRequired,
		wantToRead: PropTypes.array.isRequired,
		read: PropTypes.array.isRequired,
		onUpdateShelf: PropTypes.func.isRequired
	}



	render() {
		return (
			<div className="list-books">
	            <div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>
	           	<BookShelf  
	           	shelf="Currently Reading"
				books={this.props.currentlyReading}
	           	onUpdateShelf={this.props.onUpdateShelf}/>
	           	<BookShelf 
	           	shelf="Want to Read" 
				books={this.props.wantToRead} 
	           	onUpdateShelf={this.props.onUpdateShelf}/>
	           	<BookShelf  
	           	shelf="Read"
				books={this.props.read} 
	           	onUpdateShelf={this.props.onUpdateShelf}/>
	            <div className="open-search">
	              <Link to="/search">Add a book</Link>
	            </div>
			</div>
		)
	}
}

export default BookList;