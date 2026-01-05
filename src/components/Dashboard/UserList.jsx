import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, Typography, Paper, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { apiFetch } from "../../services/api";

export default function UserList() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        apiFetch("/users")
            .then(res => res.json())
            .then(data => setRows(data));
    }, []);


    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "username", headerName: "Username", flex: 1, minWidth: 150 },
        { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
        { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
        {
            field: "role",
            headerName: "Role",
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={params.value === "admin" ? "error" : "default"}
                    size="small"
                />
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <Button
                    size="small"
                    variant="outlined"
                    component={Link}
                    to={`/dashboard/users/edit/${params.row.id}`}
                >
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <Box sx={{ width: "100%" }}>
            {/* HEADER */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" fontWeight={700}>
                    Users
                </Typography>

                <Button variant="contained" component={Link} to="/dashboard/users/add">
                    Add User
                </Button>
            </Box>

            {/* TABLE */}
            <Paper sx={{ p: 2, borderRadius: 2, overflow: "hidden" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoHeight
                    disableRowSelectionOnClick
                    sx={{
                        width: "100%",
                        border: "none",
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#f9fafb",
                            fontWeight: 700,
                        },
                    }}
                />
            </Paper>
        </Box>
    );
}
