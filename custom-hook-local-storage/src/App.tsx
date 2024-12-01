import React, { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormData } from "./interface/Interface";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  // UseLocalStorage hook initialization with proper default value
  const [formData, setFormData] = useLocalStorage<FormData[]>("formData", []);
  const [formInput, setFormInput] = useState<FormData>({
    name: "",
    email: "",
  });

  // Reset formData if corrupted data is found
  React.useEffect(() => {
    if (!Array.isArray(formData)) {
      console.warn(
        "Invalid formData found in localStorage. Resetting to default."
      );
      setFormData([]);
    }
  }, [formData, setFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInput.name || !formInput.email) {
      alert("Please fill in all fields");
      return;
    }
    setFormData((prev) => [...prev, formInput]); // Add new entry to array
    setFormInput({ name: "", email: "" }); // Reset form input
  };

  const handleRemove = (index: number) => {
    setFormData((prev) => prev.filter((_, i) => i !== index)); // Remove specific entry
  };

  const handleClear = () => {
    setFormData([]); // Clear all entries
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
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
        {Array.isArray(formData) && formData.length === 0 ? (
          <Typography
            textAlign="center"
            sx={{
              backgroundColor: "#f9f9f9",
              p: 2,
              borderRadius: 1,
              color: "#555",
            }}
          >
            No data available. Please add some entries.
          </Typography>
        ) : (
          Array.isArray(formData) &&
          formData.map((entry, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                borderBottom: "1px solid #ccc",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography>Name: {entry.name}</Typography>
                <Typography>Email: {entry.email}</Typography>
              </Box>
              <Button
                onClick={() => handleRemove(index)}
                variant="outlined"
                color="error"
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
