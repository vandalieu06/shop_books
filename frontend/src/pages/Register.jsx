import { BookOpen, Mail, Lock, User, Phone, Check } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

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
			alert("Passwords do not match");
			return;
		}

		if (!formData.acceptTerms) {
			alert("You must accept the terms and conditions");
			return;
		}

		console.log("Register attempt:", formData);
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));

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
		if (passwordStrength === 1) return "Weak";
		if (passwordStrength === 2) return "Fair";
		if (passwordStrength === 3) return "Good";
		return "Strong";
	};

	return (
		<section className="min-h-screen bg-white px-6 py-12 flex items-center justify-center">
			<div className="w-full max-w-md">
				<div className="border border-gray-200 p-6 space-y-5">
					<div className="text-center">
						<div className="flex justify-center mb-4">
							<div className="w-10 h-10 bg-red-700 flex items-center justify-center">
								<BookOpen className="w-5 h-5 text-white" />
							</div>
						</div>
						<h2 className="text-xl font-semibold text-gray-900 mb-1">
							Create account
						</h2>
						<p className="text-gray-500 text-sm">Join AkiraBooks</p>
					</div>

					<div className="space-y-4">
						<div>
							<label
								htmlFor="fullName"
								className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5"
							>
								Full Name
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
									<User className="h-4 w-4 text-gray-400" />
								</div>
								<input
									id="fullName"
									name="fullName"
									type="text"
									required
									value={formData.fullName}
									onChange={handleChange}
									placeholder="John Doe"
									className="block w-full pl-8 pr-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-red-700 transition-colors placeholder:text-gray-400"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							<div>
								<label
									htmlFor="email"
									className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5"
								>
									Email
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
										<Mail className="h-4 w-4 text-gray-400" />
									</div>
									<input
										id="email"
										name="email"
										type="email"
										required
										value={formData.email}
										onChange={handleChange}
										placeholder="you@example.com"
										className="block w-full pl-8 pr-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-red-700 transition-colors placeholder:text-gray-400"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="phone"
									className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5"
								>
									Phone (opt)
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
										<Phone className="h-4 w-4 text-gray-400" />
									</div>
									<input
										id="phone"
										name="phone"
										type="tel"
										value={formData.phone}
										onChange={handleChange}
										placeholder="+34 612 345 678"
										className="block w-full pl-8 pr-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-red-700 transition-colors placeholder:text-gray-400"
									/>
								</div>
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5"
							>
								Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
									<Lock className="h-4 w-4 text-gray-400" />
								</div>
								<input
									id="password"
									name="password"
									type="password"
									required
									value={formData.password}
									onChange={handleChange}
									placeholder="••••••••"
									className="block w-full pl-8 pr-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-red-700 transition-colors placeholder:text-gray-400"
								/>
							</div>
							{formData.password && (
								<div className="mt-1.5">
									<div className="flex gap-1 mb-1">
										{[1, 2, 3, 4].map((level) => (
											<div
												key={level}
												className={`h-0.5 flex-1 rounded-full transition-all ${
													level <= passwordStrength
														? getPasswordStrengthColor()
														: "bg-gray-200"
												}`}
											/>
										))}
									</div>
									<p className="text-xs text-gray-500">
										Strength:{" "}
										<span className="font-medium">
											{getPasswordStrengthText()}
										</span>
									</p>
								</div>
							)}
						</div>

						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5"
							>
								Confirm Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
									<Lock className="h-4 w-4 text-gray-400" />
								</div>
								<input
									id="confirmPassword"
									name="confirmPassword"
									type="password"
									required
									value={formData.confirmPassword}
									onChange={handleChange}
									placeholder="••••••••"
									className="block w-full pl-8 pr-8 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-red-700 transition-colors placeholder:text-gray-400"
								/>
								{formData.confirmPassword && (
									<div className="absolute inset-y-0 right-0 pr-2.5 flex items-center">
										{formData.password === formData.confirmPassword ? (
											<Check className="h-4 w-4 text-green-500" />
										) : (
											<span className="text-red-500 text-xs">✕</span>
										)}
									</div>
								)}
							</div>
						</div>

						<button
							onClick={handleSubmit}
							type="button"
							className="w-full bg-red-700 text-white font-medium py-2.5 text-sm hover:bg-red-800 focus:outline-none transition-colors"
						>
							Create Account
						</button>
					</div>

					<p className="text-center text-sm text-gray-500">
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-medium text-red-700 hover:text-red-800 transition-colors"
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
}
