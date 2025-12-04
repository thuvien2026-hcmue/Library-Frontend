// Plain JS mock API using fetch-like interface (you can replace endpoints)


const SAMPLE = Array.from({ length: 24 }).map((_, i) => ({
    id: i + 1,
    title: `Sample Book Title ${i + 1}`,
    author: `Author ${i + 1}`,
    cover: `https://picsum.photos/seed/book${i + 1}/400/600`,
    tags: i % 2 ? ['Research', 'PDF'] : ['Fiction', 'Borrow']
}))


export async function fetchBooks({ q = '', page = 1, perPage = 12 } = {}) {
    // naive search + pagination in-memory (mock)
    const filtered = SAMPLE.filter(b => (
        b.title.toLowerCase().includes(q.toLowerCase()) || b.author.toLowerCase().includes(q.toLowerCase())
    ))
    const start = (page - 1) * perPage
    return new Promise(resolve => setTimeout(() => resolve(filtered.slice(start, start + perPage)), 300))
}