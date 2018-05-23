import React, { Component } from 'react'
import Book from './Book.js'
import { Link } from 'react-router-dom'


class Search extends Component {
	state = {
		query : "",
		searchedBooks : []
	}

	updateQuery = (query) => {
		this.searchedBooks = []

		this.setState(()=>({
			query: query
		}), () => {
			this.props.onSearchBooks(query)
			.then(searchedBooks => {
				if(searchedBooks instanceof Array){
					searchedBooks.forEach(b => {
						b.shelf = 'none'
						this.props.books.forEach(book => {
							if(b.id === book.id){
								b.shelf = book.shelf
							}
						})
					})
				}else 
					searchedBooks = []
				console.log(searchedBooks)

				this.setState(()=>({
					searchedBooks
				}))
			})
		})


	}

	render() {
		const { query, searchedBooks } = this.state
		const { onUpdateShelf } = this.props
		
		return (
			<div className="search-books">
	            <div className="search-books-bar">
	              <Link className="close-search"  to="/">Close</Link>
	              <div className="search-books-input-wrapper">
	                {/*
	                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
	                  You can find these search terms here:
	                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

	                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
	                  you don't find a specific author or title. Every search is limited by search terms.
	                */}
					<form onSubmit={this.handleSumbit} >
	                	<input type="text" 
	                	placeholder="Search by title or author"
	                	value={query}
	                	onChange={(event)=>this.updateQuery(event.target.value)}
	                	/>
	                </form>	
					

	              </div>
	            </div>
	            <div className="search-books-results">
	              <ol className="books-grid">
					{
                      		searchedBooks.map((book) => (
                      			<Book key={book.id}
								book={book}
								shelf={book.shelf}
								onUpdateShelf={onUpdateShelf}
								/>
							))
                      	}
	              </ol>
	            </div>
	          </div>
		)
	}

}

export default Search