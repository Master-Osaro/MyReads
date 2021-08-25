import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchPg from './components/SearchPg'
import MainPg from './components/MainPg'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books:[]
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: false
  }
  
  componentDidMount(){
  	BooksAPI.getAll().then((books) => {
    	this.setState({books: books})
    })
    
  }
  
  //Function to move book to correct shelf
  moveToShelf = (book,shelf) => {
  	BooksAPI.update(book, shelf);
    
    BooksAPI.getAll().then((books) => {
    	this.setState({books: books})
    })
  }

  render() {
    //console.log(this.state.books);
    return (
      <div className="app">
      
      <Route exact path="/" render={()=>(
      	<MainPg 
      	books={this.state.books}
  		moveToShelf={this.moveToShelf}
        />
       )}/>

	  <Route path="/search" render={()=>(
      	<SearchPg 
        moveToShelf={this.moveToShelf} 
		books={this.state.books}
		/>
       )}/> 
      
      </div>
    )
  }
}

export default BooksApp
