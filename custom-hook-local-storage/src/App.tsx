import React, { ChangeEvent, useState } from "react";
import "./App.css";
import { Box, Button, Paper, TextField } from "@mui/material";
import { FormData } from "./interface/Interface";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [formData, setFormData] = useLocalStorage<FormData>("formData", {
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // prev refers to the previous state of formData before the update.
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    // Save to localStorage
    localStorage.setItem("formData", JSON.stringify(formData));
    setFormData({ name: "", email: "" });
  };

  const handleRemove = () => {
    localStorage.removeItem("formData");
    setFormData({ name: "", email: "" });
  };

  const handleClear = () => {
    localStorage.clear();
    setFormData({ name: "", email: "" });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: "400px",
          maxWidth: "90%",
        }}
      >
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Paper>
      <Button
        onClick={handleRemove}
        variant="outlined"
        color="error"
        sx={{ mt: 2 }}
      >
        Remove from LocalStorage
      </Button>
      <Button onClick={handleClear}>Clear from LocalStorage</Button>
    </Box>
  );
}

export default App;
