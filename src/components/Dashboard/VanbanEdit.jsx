import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

export default function VanbanEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tieu_de: "",
    so_hieu: "",
    mo_ta: "",
    category: "",
  });

  useEffect(() => {
    fetch(`https://library-backend-xhvu.onrender.com/api/vanban/${id}`)
      .then((res) => res.json())
      .then((data) =>
        setForm({
          tieu_de: data.tieu_de || "",
          so_hieu: data.so_hieu || "",
          mo_ta: data.mo_ta || "",
          category: data.category || "",
        })
      );
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`https://library-backend-xhvu.onrender.com/api/vanban/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    alert("Updated");
    navigate("/dashboard/vanban");
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto" }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Edit Văn bản
      </Typography>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Tiêu đề"
              name="tieu_de"
              value={form.tieu_de}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Số hiệu"
              name="so_hieu"
              value={form.so_hieu}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Loại văn bản"
              name="category"
              value={form.category}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Mô tả"
              name="mo_ta"
              value={form.mo_ta}
              onChange={handleChange}
              multiline
              minRows={3}
              fullWidth
            />

            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained">
                Save
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
