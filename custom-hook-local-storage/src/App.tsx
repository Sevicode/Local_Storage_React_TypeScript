import React, { ChangeEvent, useState } from "react";
import "./App.css";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormData } from "./interface/Interface";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [formData, setFormData] = useLocalStorage<FormData[]>("formData", []);
  const [formInput, setFormInput] = React.useState<FormData>({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData((prev) => [...prev, formInput]);
    setFormInput({ name: "", email: "" });
  };

  const handleRemove = (index: number) => {
    setFormData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    localStorage.clear();
    setFormData([]);
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
          value={formInput.name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth>
          Submit
        </Button>
      </Paper>

      <Box sx={{ mt: 4, width: "100%" }}>
        {formData.length === 0 ? (
          <Box
            sx={{
              backgroundColor: "#d2faf8",
              p: 2,
              borderRadius: 1,
              textAlign: "center",
            }}
          >
            <Typography>No names saved yet.</Typography>
          </Box>
        ) : (
          formData.map((entry, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                borderBottom: "1px solid #ccc",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography>Name: {entry.name}</Typography>
              <Typography>Email: {entry.email}</Typography>
              <Button
                onClick={() => handleRemove(index)}
                variant="outlined"
                color="error"
                sx={{ mt: 1 }}
              >
                Remove
              </Button>
            </Box>
          ))
        )}
      </Box>
      <Button
        onClick={handleClear}
        variant="outlined"
        color="secondary"
        sx={{ mt: 2 }}
      >
        Clear All
      </Button>
    </Box>
  );
}

export default App;
