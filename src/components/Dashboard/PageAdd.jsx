import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useToast } from "../../context/ToastContext";
import { apiFetch } from "../../services/api";

export default function PageAdd() {
    const { showToast } = useToast();
    const [page, setPage] = useState({
        name: "",
        description: ""
    });

    const submit = async () => {
        apiFetch("/pages/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(page),
        });

        showToast("Added successfully!", "success");

        // ⭐ RESET FORM FIELDS
        setPage({
            name: "",
            description: ""
        });
    };

    return (
        <Box sx={{ maxWidth: 500 }}>
            {/* NAME */}
            <TextField
                fullWidth
                label="Name"
                sx={{ mb: 2 }}
                value={page.name}
                onChange={(e) => setPage({ ...page, name: e.target.value })}
            />

            {/* DESCRIPTION */}
            <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                sx={{ mb: 2 }}
                value={page.description}
                onChange={(e) =>
                    setPage({ ...page, description: e.target.value })
                }
            />

            <Button variant="contained" onClick={submit}>
                Create
            </Button>
        </Box>
    );
}
