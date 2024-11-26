import { Button, Stack, TextField, Typography } from "@mui/material";
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
    localStorage.setItem("name", JSON.stringify(updatedList));
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
          value={name}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleSave}>
          Save To Local Storage
        </Button>
      </Stack>

      <Stack spacing={2} direction={"column"}>
        <Typography variant="h6">Saved Names:</Typography>
        {nameList.length === 0 ? (
          <Typography>No names saved yet.</Typography>
        ) : (
          nameList.map((nameItem, index) => (
            <Stack key={index} direction={"row"} spacing={2}>
              <Typography>{nameItem}</Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemove(nameItem)}
              >
                Remove
              </Button>
            </Stack>
          ))
        )}
        <Button variant="contained" color="error" onClick={handleClear}>
          Clear All Names
        </Button>
      </Stack>
    </Stack>
  );
}

export default App;
