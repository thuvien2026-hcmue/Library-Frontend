import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  MenuItem,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../../services/api";

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    apiFetch(`/users/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [id]);

  const update = async () => {
    await apiFetch(`/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    navigate("/dashboard/users");
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Edit User
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={3}>
          <TextField
            label="Username"
            value={form.username}
            fullWidth
            disabled
          />

          <TextField
            label="Full name"
            value={form.name}
            fullWidth
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <TextField
            label="Email"
            value={form.email}
            fullWidth
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <TextField
            select
            label="Role"
            value={form.role}
            fullWidth
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="editor">Editor</MenuItem>
          </TextField>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={update}>
              Save
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
