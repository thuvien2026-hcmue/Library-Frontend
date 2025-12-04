import React, { useEffect, useState } from 'react'
import { Container, Grid, Box, Typography, TextField, Pagination } from '@mui/material'
import { fetchBooks } from '../services/api'
import BookCard from '../components/Bookcard'


export default function Catalogue() {
    const [books, setBooks] = useState([])
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)


    useEffect(() => {
        fetchBooks({ q: query, page }).then(res => setBooks(res))
    }, [query, page])


    return (
        <Container sx={{ py: 6 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Catalogue</Typography>
            <TextField fullWidth placeholder="Search catalogue..." value={query} onChange={e => setQuery(e.target.value)} sx={{ mb: 2 }} />
            <Grid container spacing={2}>
                {books.map(b => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={b.id}>
                        <BookCard book={b} />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination count={6} page={page} onChange={(_, v) => setPage(v)} />
            </Box>
        </Container>
    )
}