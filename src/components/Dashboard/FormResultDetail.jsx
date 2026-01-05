import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, Typography, Box, Button } from "@mui/material";

export default function FormResultDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [row, setRow] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/form-results/${id}`)
      .then(res => res.json())
      .then(setRow);
  }, [id]);

  if (!row) return null;

  const formData = JSON.parse(row.form_data);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Submission #{row.id}
      </Typography>

      {Object.entries(formData).map(([key, value]) => (
        <Box key={key} mb={1}>
          <strong>{key}:</strong>{" "}
          {Array.isArray(value) ? value.join(", ") : value}
        </Box>
      ))}

      <Box mt={3}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Paper>
  );
}
