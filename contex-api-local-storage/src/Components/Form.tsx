import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useList } from "../Hooks/useList";
import { ListItem } from "../Interface/interface";
import { useState } from "react";

export function Form() {
  const { addItem } = useList();
  const [formData, setFormData] = useState<ListItem>({
    name: "",
    email: "",
    username: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addItem(formData);
    setFormData({ name: "", email: "", username: "" });
  }

  return (
    <Card sx={{ padding: 2, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">Add User</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
