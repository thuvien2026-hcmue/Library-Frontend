import { useState } from "react";
import { Box, Paper, TextField, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TrendBookCreate() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const create = async () => {
    const token = localStorage.getItem("token");
    const _name = name.trim();
    if (!_name) return alert("Name is required!");

    const res = await fetch("https://library-backend-xhvu.onrender.com/api/trend-books/create", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: _name, content: "", image: "" }), // ✅ no slug
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) return alert(data.message || "Create failed!");

    navigate(`/dashboard/trend-books/edit/${data.id}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Create Trend Book
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant="contained" onClick={create}>
            Create
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
