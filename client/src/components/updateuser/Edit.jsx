import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../addbook/add.css";
import toast from 'react-hot-toast';

const Edit = () => {

    const books = {
        name:"",
        code:0,
        authName:"",
        pubName:"",
        price:0,
        link:""
      }

 const {id} = useParams();
 const navigate = useNavigate();
 const [book, setBook] = useState(books);

 const inputChangeHandler = (e) =>{
    const {name, value} = e.target;
    setBook({...book, [name]:value});
    console.log(book);
 }

 useEffect(()=>{
    axios.get(`http://localhost:8000/api/getone/${id}`)
    .then((response)=>{
        setBook(response.data)
    })
    .catch((error)=>{
        console.log(error);
    })
 },[id])


 const submitForm = async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`, book)
    .then((response)=>{
       toast.success('Book updated successfully', {position:"top-right"})
       navigate("/")
    })
    .catch(error => console.log(error))
 }

  return (
    <div className='addBook'>
        <Link to={"/"}>Back</Link>
        <h3>Update Book</h3>
        <form className='addBookForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="name">Name</label>
                <input type="text" value={book.name} onChange={inputChangeHandler} id="name" name="name" autoComplete='off' placeholder='Name of the book' />
            </div>
            <div className="inputGroup">
                <label htmlFor="code">Code</label>
                <input type="Number" value={book.code} onChange={inputChangeHandler} id="code" name="code" autoComplete='off' placeholder='Book Code' />
            </div>
            <div className="inputGroup">
                <label htmlFor="authName">Author's Name</label>
                <input type="text" value={book.authName} onChange={inputChangeHandler} id="authName" name="authName" autoComplete='off' placeholder='Author Name' />
            </div><div className="inputGroup">
                <label htmlFor="pubName">Publisher's Name</label>
                <input type="text" value={book.pubName} onChange={inputChangeHandler} id="pubName" name="pubName" autoComplete='off' placeholder='Publisher Name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="price">Price (In Rs.)</label>
                <input type="Number" value={book.price} onChange={inputChangeHandler} id="price" name="price" autoComplete='off' placeholder='Book Price' />
            </div>
            <div className="inputGroup">
                <label htmlFor="link">Link</label>
                <input type="text" value={book.link} onChange={inputChangeHandler} id="link" name="link" autoComplete='off' placeholder='Link to Buy' />
            </div>
            <div className="inputGroup">
                <button type="submit">UPDATE BOOK</button>
            </div>
        </form>
    </div>
  )
}

export default Edit