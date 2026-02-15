import api from './client';

export const booksApi = {
	getAll: () => api.get('/books'),
	
	getById: (isbn) => api.get(`/books/${isbn}`),
	
	search: (query) => api.get(`/books/search?q=${encodeURIComponent(query)}`),
	
	getByCategory: (category) => api.get(`/books?category=${encodeURIComponent(category)}`),
	
	getFeatured: () => api.get('/books/featured'),
};

export default booksApi;
