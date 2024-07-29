import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function BookList({ books, handleUpdateOpen, deleteBook }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
      {books.map((book, index) => {
        const { id, title, author, ISBN, publicationYear, genre, image } = book;
        return (
          <Card key={index} sx={{ display: 'flex', flexDirection: 'row', maxWidth: 400 }}>
            <CardMedia sx={{ width: 140 }} component="img" image={image} />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" component="div">
                  Yazar: {author}
                </Typography>
                <Typography variant="body2" component="div">
                  ISBN: {ISBN}
                </Typography>
                <Typography variant="body2" component="div">
                  Yayımlama Yılı: {publicationYear}
                </Typography>
                <Typography variant="body2" component="div">
                  Tür: {genre}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 1 }}>
                <IconButton color="error" onClick={() => deleteBook(id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton color="primary" onClick={() => handleUpdateOpen(book)}> 
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
}