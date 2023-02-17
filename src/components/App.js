import React from 'react'
import '../styles/App.css';
import Navbar from './Navbar';
import Post from './Post';
const App = () => {


  return (
    <>
      <Navbar />
      <div className="container">
        <Post />
      </div>
    </>
  )
}


export default App;
