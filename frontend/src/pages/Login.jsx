import { BookOpen, Mail, Lock, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const result = await login(formData.email, formData.password);
			if (result.success) {
				navigate("/");
			} else {
				setError(result.error || "Login failed");
			}
		} catch (err) {
			setError(err.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	return (
		<section className="min-h-screen bg-white px-6 py-12 flex items-center justify-center">
			<div className="w-full max-w-sm">
				<div className="border border-gray-200 p-8">
					<div className="text-center mb-8">
						<div className="flex justify-center mb-4">
							<div className="w-10 h-10 bg-red-700 flex items-center justify-center">
								<BookOpen className="w-5 h-5 text-white" />
							</div>
						</div>
						<h2 className="text-xl font-semibold text-gray-900 mb-1">
							Welcome back
						</h2>
						<p className="text-gray-500 text-sm">Sign in to AkiraBooks</p>
					</div>

					{error && (
						<div className="bg-red-50 border border-red-100 text-red-700 px-4 py-2.5 text-xs mb-6">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
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
									autoComplete="email"
									placeholder="you@example.com"
									className="block w-full pl-8 pr-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-red-700 transition-colors placeholder:text-gray-400"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between mb-1.5">
								<label
									htmlFor="password"
									className="block text-xs font-medium text-gray-500 uppercase tracking-wide"
								>
									Password
								</label>
								<button
									type="button"
									className="text-xs font-medium text-red-700 hover:text-red-800 transition-colors"
								>
									Forgot?
								</button>
							</div>
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
									autoComplete="current-password"
									placeholder="••••••••"
									className="block w-full pl-8 pr-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-red-700 transition-colors placeholder:text-gray-400"
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-red-700 text-white font-medium py-2.5 text-sm hover:bg-red-800 focus:outline-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? (
								<>
									<Loader2 className="w-4 h-4 animate-spin" />
									Signing in...
								</>
							) : (
								"Sign In"
							)}
						</button>
					</form>

					<p className="text-center text-sm text-gray-500 mt-6">
						No account?{" "}
						<Link
							to="/register"
							className="font-medium text-red-700 hover:text-red-800 transition-colors"
						>
							Register
						</Link>
					</p>
				</div>

				<p className="mt-6 text-center text-xs text-gray-400">
					By continuing, you agree to our{" "}
					<button type="button" className="text-red-700 hover:text-red-800">
						Terms
					</button>{" "}
					and{" "}
					<button type="button" className="text-red-700 hover:text-red-800">
						Privacy
					</button>
				</p>
			</div>
		</section>
	);
}
