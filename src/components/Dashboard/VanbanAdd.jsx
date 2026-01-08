import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function VanbanAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tieu_de: "",
    so_hieu: "",
    mo_ta: "",
    category: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) =>
      formData.append(k, v)
    );
    formData.append("file", file);

    setLoading(true);

    try {
      await fetch("https://library-backend-xhvu.onrender.com/api/vanban", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      alert("Upload successful");
      navigate("/dashboard/vanban");
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto" }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Add Văn bản / Công văn
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

            <Button variant="outlined" component="label">
              Select PDF file
              <input
                hidden
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>

            {file && (
              <Typography variant="body2">
                Selected: {file.name}
              </Typography>
            )}

            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Save"}
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
