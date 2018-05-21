import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Search extends Component {
	state = {
		query : "",
		searchedBooks : []
	}
	
	handleChange = (book, e) => {
		if(this.props.onUpdateShelf) {
			this.props.onUpdateShelf.call(this.props.bookApp, [book, e.target.value])
		}
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
								<li key={book.id}>
									<div className="book">
										<div className="book-top">
											<div className="book-cover" style={{ 
												width: 128, height: 188, 
												backgroundImage: 'url("'+ (book.imageLinks ? book.imageLinks.thumbnail : "") +'")' }}></div>
											<div className="book-shelf-changer">
												<select value={book.shelf ? book.shelf : 'none'} onChange={(e) =>this.handleChange(book, e)}>
													<option value="none" disabled>Move to...</option>
													<option value="currentlyReading">Currently Reading</option>
													<option value="wantToRead">Want to Read</option>
													<option value="read">Read</option>
													<option value="none">None</option>
												</select>
											</div>
										</div>	
										<div className="book-title">{book.title}</div>
										<div className="book-authors">{book.authors ? book.authors : ''}</div>
									</div>
								</li>
							))
                      	}
	              </ol>
	            </div>
	          </div>
		)
	}

}

export default Search