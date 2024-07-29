import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AddModal from "../components/AddModal";
import UpdateModal from "../components/UpdateModal";
import { Button } from "@mui/material";
import BookList from "../components/BookList";
import axios from "axios";
const Home = () => {
  const BASE_URL = "https://library-backend-sflx.onrender.com/books";
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUpdateOpen = (book) => {
    setSelectedBook(book);
    setUpdateOpen(true);
  };
  const handleUpdateClose = () => setUpdateOpen(false);

  useEffect(() => {
    getBooks();
  }, []);
  const getBooks = async () => {
    try {
      const res = await axios.get(BASE_URL);
      //console.log(res)
      setBooks(res.data.result.rows);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  const addBook = async (book) => {
    try {
      const res = await axios.post(BASE_URL, book);
      //console.log(res);
      setBooks([...books, res.data.result]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
    getBooks();
  };
  const updateBook = async (id, updatedBook) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, updatedBook);
      setBooks(books.map((book) => (book.id === id ? res.data.new : book)));
    } catch (error) {
      console.error("Error updating book:", error);
    }
    getBooks();
  };
  const deleteBook = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
    getBooks();
  };
  return (
    <div>
      <Header />
      <Button
        sx={{
          "&:hover": {
            backgroundColor: "lightgray",
          },
          mb:'2rem'
        }}
        onClick={handleOpen}
      >
        Kitap Ekle
      </Button>
      <AddModal open={open} handleClose={handleClose} addBook={addBook} />
      <UpdateModal
        open={updateOpen}
        handleClose={handleUpdateClose}
        updateBook={updateBook}
        book={selectedBook}
      />
      <BookList
        books={books}
        handleUpdateOpen={handleUpdateOpen}
        deleteBook={deleteBook}
      />
    </div>
  );
};
export default Home;
