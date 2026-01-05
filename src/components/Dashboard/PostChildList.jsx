import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Button,
    Box,
    Typography,
    Paper,
    IconButton
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { minWidth } from "@mui/system";

export default function PostChildList({ parentPost }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (!parentPost?.id) return;

        fetch(`http://localhost:5000/api/posts/children/${parentPost.id}`)
            .then((res) => res.json())
            .then((data) => setRows(data));
    }, [parentPost]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this child post?")) return;

        await fetch(`http://localhost:5000/api/posts/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        setRows((prev) => prev.filter((row) => row.id !== id));
    };

    const columns = [
        { field: "id", headerName: "ID", width: 80 },

        {
            field: "name",
            headerName: "Title",
            flex: 1,
            minWidth: 200,
        },

        {
            field: "slug",
            headerName: "Slug",
            flex: 1,
            minWidth: 220,
        },

        {
            field: "created_at",
            headerName: "Created",
            width: 180,
            sortable: true,
            renderCell: (params) => {
                const value = params?.row?.created_at;

                if (!value) return "-";

                const date = new Date(value);
                return date.toLocaleString("vi-VN");
            },
        },

        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        size="small"
                        variant="outlined"
                        component="a"
                        href={`/dashboard/posts/edit/${params.row.id}?parent_id=${parentPost.id}`}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        Edit
                    </Button>

                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box sx={{ width: "100%", mt: 4 }}>
            {/* HEADER */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" fontWeight={700}>
                    Child Posts of: {parentPost?.name}
                </Typography>

                <Button
                    variant="contained"
                    component={Link}
                    to={`/dashboard/posts/add?parent_id=${parentPost.id}`}
                >
                    Add Child Post
                </Button>
            </Box>

            {/* TABLE */}
            <Paper
                sx={{
                    p: 2,
                    borderRadius: 2,
                    width: "100%",
                    overflow: "hidden",
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoHeight
                    disableRowSelectionOnClick
                    sx={{
                        width: "100%",
                        minWidth: 0,
                        border: "none",
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#f9fafb",
                            fontWeight: 700,
                        },
                        "& .MuiDataGrid-cell": {
                            display: "flex",
                            alignItems: "center",
                        },
                    }}
                />
            </Paper>
        </Box>
    );
}
