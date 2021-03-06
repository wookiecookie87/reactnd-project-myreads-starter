import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
	handleChange = (book, e) => {
		if(this.props.onUpdateShelf) {
			this.props.onUpdateShelf(book, e.target.value)
		}
	}


	render(){
		const { book, shelf, onUpdateShelf } = this.props
		return (
			<li >
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{ 
							width: 128, height: 188, 
							backgroundImage: 'url("'+book.imageLinks.thumbnail+'")' }}></div>
						<div className="book-shelf-changer">
							<select value={shelf} onChange={(e) =>this.handleChange(book, e)}>
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
		)
	}



}

export default Book