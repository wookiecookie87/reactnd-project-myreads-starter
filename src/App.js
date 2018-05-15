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
        currentlyReading: [],  wantToRead: [], read: [],
    }

    componentWillMount() {
        BooksAPI.getAll()
        .then(books => {
            console.log("thisthis1111", this);
            this.setState(() => ({
                currentlyReading : books.filter(book => {
                    if(book.shelf === 'currentlyReading')
                        return book
                }),
                wantToRead : books.filter(book => {
                    if(book.shelf === 'wantToRead')
                        return book
                }),   
                read : books.filter(book => {
                    if(book.shelf === 'read')
                        return book
                })
                
            }))
        })
    }

    updateShelf(bookUpdateInfo) {
        const book = bookUpdateInfo[0]
        const shelf = bookUpdateInfo[1]
        console.log("thisthis", this);
        this.setState((currentState) => {
            console.log("current state", currentState);// this is null;
            console.log("state", this.state); //So this is null as well


            //this is just test code to see if the UI changes as the state changes;
            //but since currentState is null, I already get
            //TypeError: Cannot read property 'currentlyReading' of null 
            return {
                currentlyReading : currentState.currentlyReading.pop(),

                wantToRead : currentState.wantToRead.pop(),

                read : currentState.read.pop()
            }
            //and even if I try something like

            //  return {
            //     currentlyReading : []

            //     wantToRead : [],

            //     read : []
            // }

            // Nothing chnages.
            //I think the problem is the state is set on BooksApp class,
            //but the state I am trying to update is from BookShelf class.
            //Do I need to manage state at BookShelf class?
            //or is there anyway to work this out in current set up?

        })


        BooksAPI.update(book, shelf)
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BookList 
                    currentlyReading={this.state.currentlyReading} 
                    wantToRead={this.state.wantToRead} 
                    read={this.state.read} 
                    onUpdateShelf={this.updateShelf}/>
                )}/>
                
                <Route path="/search" render={() => (
                    <Search/>            
                )}/>   
            </div>
        )
    }
}

export default BooksApp
