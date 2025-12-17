import { BookOpen, Mail, Lock, User, Phone, Check } from "lucide-react";
import { useState } from "react";

export default function Register() {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		acceptTerms: false,
		newsletter: true,
	});

	const [passwordStrength, setPasswordStrength] = useState(0);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			alert("Las contraseñas no coinciden");
			return;
		}

		if (!formData.acceptTerms) {
			alert("Debes aceptar los términos y condiciones");
			return;
		}

		console.log("Register attempt:", formData);
		// Aquí iría la lógica de registro
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));

		// Calcular fuerza de contraseña
		if (name === "password") {
			let strength = 0;
			if (value.length >= 8) strength++;
			if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++;
			if (/\d/.test(value)) strength++;
			if (/[^a-zA-Z\d]/.test(value)) strength++;
			setPasswordStrength(strength);
		}
	};

	const getPasswordStrengthColor = () => {
		if (passwordStrength === 0) return "bg-gray-200";
		if (passwordStrength === 1) return "bg-red-500";
		if (passwordStrength === 2) return "bg-yellow-500";
		if (passwordStrength === 3) return "bg-blue-500";
		return "bg-green-500";
	};

	const getPasswordStrengthText = () => {
		if (passwordStrength === 0) return "";
		if (passwordStrength === 1) return "Débil";
		if (passwordStrength === 2) return "Regular";
		if (passwordStrength === 3) return "Buena";
		return "Fuerte";
	};

	return (
		<section className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-amber-100 px-6 py-12 flex items-center justify-center">
			<div className="w-full max-w-2xl">
				{/* Card Container */}
				<div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
					{/* Header */}
					<div className="text-center">
						<div className="flex justify-center mb-4">
							<div className="bg-linear-to-br from-amber-500 to-orange-600 p-4 rounded-2xl shadow-lg">
								<BookOpen className="w-12 h-12 text-white" />
							</div>
						</div>
						<h2 className="text-3xl font-bold text-gray-900 mb-2">
							Crea tu cuenta
						</h2>
						<p className="text-gray-600">
							Únete a LibroMundo y descubre miles de libros
						</p>
					</div>

					{/* Form */}
					<div className="space-y-5">
						{/* Full Name */}
						<div>
							<label
								htmlFor="fullName"
								className="block text-sm font-semibold text-gray-700 mb-2"
							>
								Nombre Completo
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<User className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="fullName"
									name="fullName"
									type="text"
									required
									value={formData.fullName}
									onChange={handleChange}
									placeholder="Juan Pérez"
									className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 placeholder:text-gray-400"
								/>
							</div>
						</div>

						{/* Email and Phone in Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{/* Email */}
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-semibold text-gray-700 mb-2"
								>
									Correo Electrónico
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Mail className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="email"
										name="email"
										type="email"
										required
										value={formData.email}
										onChange={handleChange}
										placeholder="tu@email.com"
										className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 placeholder:text-gray-400"
									/>
								</div>
							</div>

							{/* Phone */}
							<div>
								<label
									htmlFor="phone"
									className="block text-sm font-semibold text-gray-700 mb-2"
								>
									Teléfono (opcional)
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Phone className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="phone"
										name="phone"
										type="tel"
										value={formData.phone}
										onChange={handleChange}
										placeholder="+34 612 345 678"
										className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 placeholder:text-gray-400"
									/>
								</div>
							</div>
						</div>

						{/* Password */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-semibold text-gray-700 mb-2"
							>
								Contraseña
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="password"
									name="password"
									type="password"
									required
									value={formData.password}
									onChange={handleChange}
									placeholder="••••••••"
									className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 placeholder:text-gray-400"
								/>
							</div>
							{/* Password Strength Indicator */}
							{formData.password && (
								<div className="mt-2">
									<div className="flex gap-1 mb-1">
										{[1, 2, 3, 4].map((level) => (
											<div
												key={level}
												className={`h-1 flex-1 rounded-full transition-all ${
													level <= passwordStrength
														? getPasswordStrengthColor()
														: "bg-gray-200"
												}`}
											/>
										))}
									</div>
									<p className="text-xs text-gray-600">
										Fortaleza:{" "}
										<span className="font-semibold">
											{getPasswordStrengthText()}
										</span>
									</p>
								</div>
							)}
						</div>

						{/* Confirm Password */}
						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-semibold text-gray-700 mb-2"
							>
								Confirmar Contraseña
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="confirmPassword"
									name="confirmPassword"
									type="password"
									required
									value={formData.confirmPassword}
									onChange={handleChange}
									placeholder="••••••••"
									className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 placeholder:text-gray-400"
								/>
								{formData.confirmPassword && (
									<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
										{formData.password === formData.confirmPassword ? (
											<Check className="h-5 w-5 text-green-500" />
										) : (
											<span className="text-red-500 text-sm">✕</span>
										)}
									</div>
								)}
							</div>
						</div>

						{/* Submit Button */}
						<button
							onClick={handleSubmit}
							type="button"
							className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-4 focus:ring-amber-300 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
						>
							Crear Cuenta
						</button>
					</div>

					{/* Login Link */}
					<p className="text-center text-sm text-gray-600">
						¿Ya tienes cuenta?{" "}
						<a
							href="/login"
							className="font-semibold text-amber-600 hover:text-amber-700 transition"
						>
							Inicia sesión
						</a>
					</p>
				</div>
			</div>
		</section>
	);
}
