import {
    Button,
    Checkbox,
    FormControlLabel,
    FormLabel,
    TextField,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import axios from "axios";
  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  const AddBook = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
      title: "",
      ISBN: "",
      author: "",
      description: "",
      PublishedDate:"",
      Publisher:"",
    });
    const [checked, setChecked] = useState(false);
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.title]: e.target.value,
      }));
      // console.log(e.target.name, "Value", e.target.value);
    };
  
    const sendRequest = async () => {
      await axios
        .post("http://localhost:5000/books", {
          title: String(inputs.title),
          ISBN: String(inputs.ISBN),
          author: String(inputs.author),
          description: String(inputs.description),
          PublishedDate: String(inputs.PublishedDate),
          Publisher: String(inputs.Publisher),
        })
        .then((res) => res.data);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(inputs, checked);
      sendRequest().then(() => history("/books"));
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          maxWidth={700}
          alignContent={"center"}
          alignSelf="center"
          marginLeft={"auto"}
          marginRight="auto"
          marginTop={10}
        >
          <FormLabel>Title</FormLabel>
          <TextField
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="title"
          />
          <FormLabel>ISBN</FormLabel>
          <TextField
            value={inputs.ISBN}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="ISBN"
          />
          <FormLabel>Author</FormLabel>
          <TextField
            value={inputs.author}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="author"
          />
          <FormLabel>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            type="number"
            margin="normal"
            fullWidth
            variant="outlined"
            name="description"
          />
          <FormLabel>PublishedDate</FormLabel>
          <TextField
            value={inputs.PublishedDate}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="PublishedDate"
          />
          <FormLabel>Publisher</FormLabel>
          <TextField
            value={inputs.Publisher}
            onChange={handleChange}
            type="number"
            margin="normal"
            fullWidth
            variant="outlined"
            name="Publisher"
          />
          <FormControlLabel
            control={
              <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
            }
            label="Available"
          />
  
          <Button variant="contained" type="submit">
            Add Book
          </Button>
        </Box>
      </form>
    );
  };
  
  export default AddBook;