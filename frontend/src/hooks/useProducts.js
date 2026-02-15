import { useState, useEffect, useCallback, useMemo } from 'react';
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

export const useProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchProducts = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await booksApi.getAll();
			if (response.status === 'success') {
				setProducts(response.data.map(transformBook));
			} else {
				throw new Error(response.message || 'Error al cargar productos');
			}
		} catch (err) {
			setError(err.message || 'No se pudo cargar el catálogo');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return { products, loading, error, refetch: fetchProducts };
};

export const useProductFilters = (products) => {
	const [filters, setFilters] = useState({
		search: '',
		category: 'all',
		priceRange: [0, 100],
		sortBy: 'default',
		typeBook: 'all',
	});

	const categories = useMemo(() => {
		const cats = new Set(products.map(p => p.category).filter(Boolean));
		return ['all', ...Array.from(cats)];
	}, [products]);

	const typeBooks = useMemo(() => {
		const types = new Set(products.map(p => p.type_book).filter(Boolean));
		return ['all', ...Array.from(types)];
	}, [products]);

	const priceRange = useMemo(() => {
		if (products.length === 0) return [0, 100];
		const prices = products.map(p => parseFloat(p.price) || 0);
		return [Math.min(...prices), Math.max(...prices)];
	}, [products]);

	const filteredProducts = useMemo(() => {
		let result = [...products];

		if (filters.search) {
			const searchLower = filters.search.toLowerCase();
			result = result.filter(
				p =>
					p.name?.toLowerCase().includes(searchLower) ||
					p.authors?.some(a => a.toLowerCase().includes(searchLower)) ||
					p.isbn?.toLowerCase().includes(searchLower)
			);
		}

		if (filters.category !== 'all') {
			result = result.filter(p => p.category === filters.category);
		}

		if (filters.typeBook !== 'all') {
			result = result.filter(p => p.type_book === filters.typeBook);
		}

		result = result.filter(p => {
			const price = parseFloat(p.price) || 0;
			return price >= filters.priceRange[0] && price <= filters.priceRange[1];
		});

		switch (filters.sortBy) {
			case 'price-asc':
				result.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
				break;
			case 'price-desc':
				result.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
				break;
			case 'name':
				result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
				break;
			case 'stock':
				result.sort((a, b) => (b.unit_stock || 0) - (a.unit_stock || 0));
				break;
			default:
				break;
		}

		return result;
	}, [products, filters]);

	const updateFilter = useCallback((key, value) => {
		setFilters(prev => ({ ...prev, [key]: value }));
	}, []);

	const resetFilters = useCallback(() => {
		setFilters({
			search: '',
			category: 'all',
			priceRange: [0, 100],
			sortBy: 'default',
			typeBook: 'all',
		});
	}, []);

	return {
		filters,
		updateFilter,
		resetFilters,
		filteredProducts,
		categories,
		typeBooks,
		priceRange,
	};
};

export default useProducts;
