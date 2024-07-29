import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function UpdateModal({ open, handleClose, updateBook, book }) {
  const [info, setInfo] = useState({
    title: "",
    author: "",
    ISBN: "",
    publicationYear: "",
    genre: "",
    image: "",
  });
  useEffect(() => {
    if (book) {
      setInfo(book);
    }
  }, [book]);
  const { title, author, ISBN, publicationYear, genre, image } = info;
  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateBook(book.id, info);
    handleClose();
    setInfo({
      title: "",
      author: "",
      ISBN: "",
      publicationYear: "",
      genre: "",
      image: "",
    });
  };
  const currentYear = new Date().getFullYear();
  const startYear = 1954;
  const years = [];
  for (let i = currentYear; i >= startYear; i--) {
    years.push(i);
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            id="title"
            name="title"
            value={title}
            label="Kitap Adı"
            variant="outlined"
            type="text"
            onChange={handleInfo}
            required
          />
          <TextField
            fullWidth
            id="author"
            name="author"
            value={author}
            label="Yazar Adı"
            variant="outlined"
            type="text"
            onChange={handleInfo}
            required
          />
          <TextField
            fullWidth
            id="ISBN"
            name="ISBN"
            value={ISBN}
            label="ISBN"
            variant="outlined"
            type="text"
            onChange={handleInfo}
            required
          />
          <FormControl fullWidth>
            <InputLabel id="publicationYear">Yayımlama Yılı</InputLabel>
            <Select
              labelId="publicationYear"
              id="publicationYear"
              name="publicationYear"
              value={publicationYear}
              label="Yayımlama Yılı"
              onChange={handleInfo}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            id="genre"
            name="genre"
            value={genre}
            label="Tür"
            variant="outlined"
            type="text"
            onChange={handleInfo}
            required
          />
          <TextField
            fullWidth
            id="image"
            name="image"
            value={image}
            label="Kapak Resmi"
            variant="outlined"
            type="text"
            onChange={handleInfo}
            required
          />
          <Button variant="contained" type="submit">
            GÜNCELLE
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}