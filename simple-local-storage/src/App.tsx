import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import "./App.css";
function App() {
  return (
    <Container>
      <Stack>
        <TextField />
        <Button>Save</Button>
      </Stack>
      <Stack>
        <Typography>Name: </Typography>
        <Button>Clear Local Storage</Button>
      </Stack>
    </Container>
  );
}

export default App;
