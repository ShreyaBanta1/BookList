import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import "./book.css";
import { Link } from 'react-router-dom'

const Book = () => {

  const [books, setBooks] = useState([]);

  useEffect(()=>{

    const fetchData = async()=>{
        const response = await axios.get("http://localhost:8000/api/getall");
        setBooks(response.data);
    }

    fetchData();

  },[])

  const deleteBook = async(bookId) =>{
      await axios.delete(`http://localhost:8000/api/delete/${bookId}`)
      .then((respones)=>{
        setBooks((prevBook)=> prevBook.filter((book)=> book._id !== bookId))
        toast.success("Book deleted successfully", {position: 'top-right'})
      })
      .catch((error) =>{
        console.log(error);
      })
  }

  return (
    <div className='bookTable'>
        <Link to={"/add"} className='addButton'>Add Book</Link>
        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>Book Name</th>
                    <th>Code</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Price</th>
                    <th>Link</th>
                    <th>Actions ( Delete / Edit )</th>
                </tr>
            </thead>
            <tbody>
                {
                    books.map((book, index)=>{
                        return(
                        <tr key={book._id}>
                            <td>{index + 1}</td>
                            <td>{book.name}</td>
                            <td>{book.code}</td>
                            <td>{book.authName}</td>
                            <td>{book.pubName}</td>
                            <td>{book.price}</td>
                            <td><a target='blank' href={book.link}>{book.link}</a></td>
                            <td className='actionButtons'>
                                <button onClick={()=> deleteBook(book._id)}><i className="fa-solid fa-trash"></i></button>
                                <Link to={`/edit/`+book._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                            </td>
                        </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
    </div>
  )
}

export default Book