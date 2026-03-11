const getName = (item) => {
	if (typeof item === "string") return item;
	if (item && typeof item === "object" && item.name) return item.name;
	return String(item);
};

const getString = (val) => {
	if (val == null) return "";
	if (typeof val === "string") return val;
	if (typeof val === "number") return String(val);
	if (Array.isArray(val)) return val.map(getName).join(", ");
	if (typeof val === "object" && val.name) return val.name;
	return String(val);
};

export const transformBook = (book) => {
	if (!book) return book;
	return {
		...book,
		authors: Array.isArray(book.authors) ? book.authors.map(getName) : [],
		category: getName(book.categories?.[0]) || getName(book.category) || "",
		categories: undefined,
		publisher: getString(book.publisher),
		language: getString(book.language),
		type_book: getString(book.type_book),
		image:
			book.image ||
			`https://images.placeholders.dev/?width=400&height=600&text=${encodeURIComponent(book.name || "Book")}`,
	};
};

export const getFallbackImage = (name) =>
	`https://images.placeholders.dev/?width=400&height=600&text=${encodeURIComponent(name || "Book")}`;
