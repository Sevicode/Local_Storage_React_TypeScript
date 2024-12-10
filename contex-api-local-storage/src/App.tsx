import "./App.css";
import { ListProvider } from "./Components/ListProvider";
import { Form } from "./Components/Form";
import { List } from "./Components/List";
import { Box, Typography } from "@mui/material";

function App() {
  return (
    <ListProvider>
      <Box sx={{ maxWidth: 600, margin: "auto", marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Form
        </Typography>
        <Form />
        <List />
      </Box>
    </ListProvider>
  );
}

export default App;
