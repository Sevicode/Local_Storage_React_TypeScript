import { Button, Stack, TextField, Typography } from "@mui/material";
import "./App.css";
import { ChangeEvent, useEffect, useState } from "react";
function App() {
  const [name, setName] = useState<string>("");
  const [storedName, setStoredName] = useState<string | null>("");
  const [nameList, setNameList] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  useEffect(() => {
    const savedName: string | null = localStorage.getItem("name");
    if (savedName) {
      setStoredName(savedName);
    }
  }, []);

  const handleSave = (): void => {
    localStorage.setItem("name", name);
    setStoredName(name);
  };

  const handleRemove = (): void => {
    localStorage.removeItem("name");
    setStoredName(null);
  };

  const handleClear = (): void => {
    localStorage.clear();
    setStoredName(null);
  };
  return (
    <Stack
      spacing={2}
      sx={{
        width: "100%",
        height: "100vh",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stack spacing={2} direction={"row"}>
        <TextField
          id="outlined-basic"
          label="name"
          variant="outlined"
          name="name"
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleSave}>
          Save To Local Storage
        </Button>
      </Stack>
      {storedName && (
        <Stack spacing={2} direction={"row"}>
          <Typography>Name:{storedName} </Typography>
          <Button variant="contained" onClick={handleRemove}>
            Remove Item from local storage
          </Button>
          <Button variant="contained" onClick={handleClear}>
            Clear Local Storage
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

export default App;
