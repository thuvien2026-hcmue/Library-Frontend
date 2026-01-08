import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../services/api";

export default function UserAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "editor",
  });

  const submit = async () => {
    await apiFetch("/users", {
      method: "POST",
      body: JSON.stringify(form),
    });

    navigate("/dashboard/users");
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Add User
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={3}>
          <TextField
            label="Username"
            fullWidth
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <TextField
            label="Full name"
            fullWidth
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <TextField
            label="Email"
            fullWidth
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <TextField
            select
            label="Role"
            fullWidth
            value={form.role}
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
            <Button variant="contained" onClick={submit}>
              Create
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
