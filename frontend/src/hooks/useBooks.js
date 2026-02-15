import { useState, useEffect, useCallback } from 'react';
import { booksApi } from '../api';

const transformBook = (book) => {
	if (!book) return book;
	const getName = (item) => {
		if (typeof item === 'string') return item;
		if (item && typeof item === 'object' && item.name) return item.name;
		return String(item);
	};
	const getString = (val) => {
		if (val == null) return '';
		if (typeof val === 'string') return val;
		if (typeof val === 'number') return String(val);
		if (Array.isArray(val)) return val.map(getName).join(', ');
		if (typeof val === 'object' && val.name) return val.name;
		return String(val);
	};
	return {
		...book,
		authors: Array.isArray(book.authors) ? book.authors.map(getName) : [],
		category: getName(book.categories?.[0]) || getName(book.category) || '',
		categories: undefined,
		publisher: getString(book.publisher),
		language: getString(book.language),
		type_book: getString(book.type_book),
		image: book.image || `https://images.placeholders.dev/?width=400&height=600&text=${encodeURIComponent(book.name || 'Book')}`,
	};
};

export const useBooks = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchBooks = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await booksApi.getAll();
			if (response.status === 'success') {
				setBooks(response.data.map(transformBook));
			} else {
				throw new Error(response.message || 'Error al cargar libros');
			}
		} catch (err) {
			setError(err.message || 'No se pudo cargar el catálogo');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchBooks();
	}, [fetchBooks]);

	return { books, loading, error, refetch: fetchBooks };
};

export const useBookById = (isbn) => {
	const [book, setBook] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchBook = async () => {
			if (!isbn) return;
			setLoading(true);
			setError(null);
			try {
				const response = await booksApi.getById(isbn);
				if (response.status === 'success') {
					setBook(transformBook(response.data));
				} else {
					throw new Error(response.message || 'Libro no encontrado');
				}
			} catch (err) {
				setError(err.message || 'Error al cargar el libro');
			} finally {
				setLoading(false);
			}
		};
		fetchBook();
	}, [isbn]);

	return { book, loading, error };
};

export const useSearchBooks = (query) => {
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const search = useCallback(async (searchQuery) => {
		if (!searchQuery || searchQuery.trim().length < 2) {
			setResults([]);
			return;
		}
		setLoading(true);
		setError(null);
		try {
			const response = await booksApi.search(searchQuery);
			if (response.status === 'success') {
				setResults(response.data.map(transformBook));
			} else {
				throw new Error(response.message || 'Error en la búsqueda');
			}
		} catch (err) {
			setError(err.message || 'Error al buscar');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (query) {
			search(query);
		} else {
			setResults([]);
		}
	}, [query, search]);

	return { results, loading, error, search };
};

export const useFeaturedBooks = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchFeatured = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await booksApi.getFeatured();
			if (response.status === 'success') {
				setBooks(response.data.map(transformBook));
			} else {
				throw new Error(response.message || 'Error al cargar libros destacados');
			}
		} catch (err) {
			setError(err.message || 'No se pudieron cargar los libros destacados');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchFeatured();
	}, [fetchFeatured]);

	return { books, loading, error, refetch: fetchFeatured };
};

export default useBooks;
