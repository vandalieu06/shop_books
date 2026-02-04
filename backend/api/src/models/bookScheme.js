const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
	isbn: {
		type: String,
		unique: [true, "El ISBN ya existe"],
		required: [true, "El ISBN es obligatorio"],
		index: true,
	},
	name: {
		type: String,
		unique: [true, "El título ya existe"],
		required: [true, "El título es obligatorio"],
		trim: true,
		minlength: [3, "El título debe tener al menos 3 caracteres"],
		maxlength: [200, "El título no puede exceder 200 caracteres"],
		index: true,
	},
	description: {
		type: String,
		trim: true,
		maxlength: [400, "La descripción no puede exceder 400 caracteres"],
	},
	num_pages: {
		type: Number,
		required: [true, "El número de páginas es obligatorio"],
		min: [1, "El número de páginas debe ser mayor a 0"],
	},
	language: {
		type: String,
		enum: {
			values: ["es", "en", "jp"],
			message: "El idioma debe ser: es, en o jp",
		},
		required: [true, "El idioma es obligatorio"],
	},
	year_publish: {
		type: Date,
		required: [true, "La fecha de publicación es obligatoria"],
		validate: {
			validator: (v) => v <= new Date(),
			message: "La fecha de publicación no puede estar en el futuro",
		},
	},
	type_book: {
		type: String,
		enum: {
			values: ["digital", "fisico"],
			message: "El tipo de libro debe ser: digital o fisico",
		},
		required: [true, "El tipo de libro es obligatorio"],
	},
	price: {
		type: Number,
		required: [true, "El precio es obligatorio"],
		min: [0, "El precio no puede ser negativo"],
	},
	unit_stock: {
		type: Number,
		default: 0,
		min: [0, "El stock no puede ser inferior a 0"],
	},
	publisher: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Publisher",
		required: false,
	},
	authors: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Author",
		},
	],
	categories: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
		},
	],
});

module.exports = mongoose.model("Book", bookSchema);
