import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "./App.css";
import { ChangeEvent, useEffect, useState } from "react";
function App() {
  const [name, setName] = useState<string>("");
  const [nameList, setNameList] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  useEffect(() => {
    const savedList = localStorage.getItem("nameList");
    if (savedList) {
      setNameList(JSON.parse(savedList));
    }
  }, []);

  const handleSave = (): void => {
    if (!name.trim()) {
      alert("Please insert a name!");
      return;
    }
    const updatedList = [...nameList, name];
    setNameList(updatedList);
    localStorage.setItem("nameList", JSON.stringify(updatedList));
    setName("");
  };

  const handleRemove = (nameToRemove: string): void => {
    const updatedList = nameList.filter((item) => item !== nameToRemove);
    setNameList(updatedList);
    localStorage.setItem("nameList", JSON.stringify(updatedList));
  };

  const handleClear = (): void => {
    localStorage.clear();
    setNameList([]);
  };
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
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
        <Stack spacing={2}>
          <Stack spacing={2} direction={"row"}>
            <TextField
              id="outlined-basic"
              label="name"
              variant="outlined"
              name="name"
              value={name}
              onChange={handleChange}
              fullWidth
            />
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Stack>

          <Stack spacing={2} direction={"column"}>
            <Typography variant="h6">Saved Names:</Typography>
            {nameList.length === 0 ? (
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
              nameList.map((nameItem, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                    gap: 2,
                    padding: 1,
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <Typography>{nameItem}</Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemove(nameItem)}
                  >
                    Remove
                  </Button>
                </Box>
              ))
            )}
            <Button variant="contained" color="error" onClick={handleClear}>
              Clear All
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

export default App;
