import { useState, useEffect, useCallback } from 'react';
import api from '../api/client';

const categoryIcons = {
	'ficción': '📚',
	'fantasía': '🏰',
	'ciencia-ficción': '🚀',
	'terror': '👻',
	'romance': '💕',
	'no-ficción': '📖',
	'autoayuda': '🌟',
	'historia': '🏛️',
};

const getCategoryIcon = (name) => categoryIcons[name?.toLowerCase()] || '📖';

const categoryColors = [
	'bg-purple-100 text-purple-700 hover:bg-purple-200',
	'bg-blue-100 text-blue-700 hover:bg-blue-200',
	'bg-green-100 text-green-700 hover:bg-green-200',
	'bg-amber-100 text-amber-700 hover:bg-amber-200',
	'bg-pink-100 text-pink-700 hover:bg-pink-200',
	'bg-rose-100 text-rose-700 hover:bg-rose-200',
	'bg-cyan-100 text-cyan-700 hover:bg-cyan-200',
	'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
];

const getCategoryColor = (index) => categoryColors[index % categoryColors.length];

export const useCategories = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchCategories = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await api.get('/categories');
			if (response.status === 'success') {
				const transformed = response.data.map((cat, index) => ({
					...cat,
					icon: getCategoryIcon(cat.name),
					color: getCategoryColor(index),
				}));
				setCategories(transformed);
			} else {
				throw new Error(response.message || 'Error al cargar categorías');
			}
		} catch (err) {
			setError(err.message || 'No se pudieron cargar las categorías');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	return { categories, loading, error, refetch: fetchCategories };
};

export default useCategories;
