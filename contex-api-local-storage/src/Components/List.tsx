import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useList } from "../Hooks/useList";

export function List() {
  const { list, removeItem, clearList } = useList();

  return (
    <Card sx={{ padding: 2 }}>
      <CardContent>
        <Typography variant="h6">User List</Typography>
        {list.length > 0 ? (
          <Box sx={{ marginTop: 2 }}>
            {list.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 1,
                }}
              >
                <Box>
                  <Typography>Name: {item.name}</Typography>
                  <Typography>Email: {item.email}</Typography>
                  <Typography>Username: {item.username}</Typography>
                </Box>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </Button>
              </Box>
            ))}
            <Button
              variant="contained"
              color="error"
              onClick={clearList}
              sx={{ marginTop: 2 }}
            >
              Clear List
            </Button>
          </Box>
        ) : (
          <Typography>No users added yet.</Typography>
        )}
      </CardContent>
    </Card>
  );
}
