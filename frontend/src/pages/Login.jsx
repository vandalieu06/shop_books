import { BookOpen, Mail, Lock } from "lucide-react";
import { useState } from "react";

export default function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Login attempt:", formData);
		// Aquí iría la lógica de autenticación
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	return (
		<section className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-amber-100 px-6 py-12 flex items-center justify-center">
			<div className="w-full max-w-md">
				{/* Card Container */}
				<div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8">
					{/* Header */}
					<div className="text-center">
						<div className="flex justify-center mb-4">
							<div className="bg-linear-to-br from-amber-500 to-orange-600 p-4 rounded-2xl shadow-lg">
								<BookOpen className="w-12 h-12 text-white" />
							</div>
						</div>
						<h2 className="text-3xl font-bold text-gray-900 mb-2">
							Bienvenido de nuevo
						</h2>
						<p className="text-gray-600">Inicia sesión en LibroMundo</p>
					</div>

					{/* Form */}
					<div className="space-y-6">
						{/* Email Input */}
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
									autoComplete="email"
									placeholder="tu@email.com"
									className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 placeholder:text-gray-400"
								/>
							</div>
						</div>

						{/* Password Input */}
						<div>
							<div className="flex items-center justify-between mb-2">
								<label
									htmlFor="password"
									className="block text-sm font-semibold text-gray-700"
								>
									Contraseña
								</label>
								<button
									onClick={() => console.log("Forgot password")}
									className="text-sm font-medium text-amber-600 hover:text-amber-700 transition"
									type="button"
								>
									¿Olvidaste tu contraseña?
								</button>
							</div>
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
									autoComplete="current-password"
									placeholder="••••••••"
									className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 placeholder:text-gray-400"
								/>
							</div>
						</div>

						{/* Submit Button */}
						<button
							onClick={handleSubmit}
							type="button"
							className="w-full bg-linear-to-r from-amber-500 to-orange-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-4 focus:ring-amber-300 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
						>
							Iniciar Sesión
						</button>
					</div>

					{/* Sign Up Link */}
					<p className="text-center text-sm text-gray-600">
						¿No tienes cuenta?{" "}
						<a
							href="/register"
							className="font-semibold text-amber-600 hover:text-amber-700 transition"
						>
							Regístrate gratis
						</a>
					</p>
				</div>

				{/* Footer Text */}
				<p className="mt-8 text-center text-xs text-gray-500">
					Al continuar, aceptas nuestros{" "}
					<button
						onClick={() => console.log("Terms")}
						className="text-amber-600 hover:text-amber-700"
						type="button"
					>
						Términos de Servicio
					</button>{" "}
					y{" "}
					<button
						onClick={() => console.log("Privacy")}
						className="text-amber-600 hover:text-amber-700"
						type="button"
					>
						Política de Privacidad
					</button>
				</p>
			</div>
		</section>
	);
}
