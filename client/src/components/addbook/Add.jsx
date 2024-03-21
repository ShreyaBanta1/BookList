import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Add = () => {

  const books = {
    name:"",
    code:0,
    authName:"",
    pubName:"",
    price:0,
    link:""
  }

  const [book, setBook] = useState(books);
  const navigate = useNavigate();

  const inputHandler = (e) =>{
      const {name, value} = e.target;
      setBook({...book, [name]:value});
  }

  const submitForm = async(e) =>{
    e.preventDefault();
    await axios.post("http://localhost:8000/api/create", book)
    .then((response)=>{
       toast.success("Book added successfully", {position:"top-right"})
       navigate("/")
    })
    .catch(error => console.log(error))
  }


  return (
    <div className='addBook'>
        <Link to={"/"}>Back</Link>
        <h3>Add new Book</h3>
        <form className='addBookForm' onSubmit={submitForm}>
        <div className="inputGroup">
                <label htmlFor="name">Name</label>
                <input type="text" value={book.name} onChange={inputHandler} id="name" name="name" autoComplete='off' placeholder='Name of the book' />
            </div>
            <div className="inputGroup">
                <label htmlFor="code">Code</label>
                <input type="Number" value={book.code} onChange={inputHandler} id="code" name="code" autoComplete='off' placeholder='Book Code' />
            </div>
            <div className="inputGroup">
                <label htmlFor="authName">Author's Name</label>
                <input type="text" value={book.authName} onChange={inputHandler} id="authName" name="authName" autoComplete='off' placeholder='Author Name' />
            </div><div className="inputGroup">
                <label htmlFor="pubName">Publisher's Name</label>
                <input type="text" value={book.pubName} onChange={inputHandler} id="pubName" name="pubName" autoComplete='off' placeholder='Publisher Name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="price">Price (In Rs.)</label>
                <input type="Number" value={book.price} onChange={inputHandler} id="price" name="price" autoComplete='off' placeholder='Book Price' />
            </div>
            <div className="inputGroup">
                <label htmlFor="link">Link</label>
                <input type="text" value={book.link} onChange={inputHandler} id="link" name="link" autoComplete='off' placeholder='Link to Buy' />
            </div>
            <div className="inputGroup">
                <button type="submit">ADD BOOK</button>
            </div>
        </form>
    </div>
  )
}

export default Add