import { Check, Eye, EyeOff } from "lucide-react";

export function PasswordToggle({ visible, onToggle }) {
	return (
		<button
			type="button"
			onClick={onToggle}
			className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
		>
			{visible ? (
				<EyeOff className="h-4 w-4" />
			) : (
				<Eye className="h-4 w-4" />
			)}
		</button>
	);
}

export function CheckboxField({ id, name, label, checked, onChange }) {
	return (
		<label
			htmlFor={id}
			className="flex items-center gap-2 cursor-pointer"
		>
			<input
				id={id}
				name={name}
				type="checkbox"
				checked={checked}
				onChange={onChange}
				className="w-4 h-4 border-gray-300 rounded text-red-700 focus:ring-red-700 cursor-pointer"
			/>
			<span className="text-sm text-gray-600">{label}</span>
		</label>
	);
}

export default function InputField({
	id,
	name,
	type = "text",
	label,
	placeholder,
	icon: Icon,
	value,
	onChange,
	required,
	autoComplete,
	error,
	suffix,
	...props
}) {
	return (
		<div>
			{label && (
				<label
					htmlFor={id}
					className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5"
				>
					{label}
				</label>
			)}
			<div className="relative">
				{Icon && (
					<div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
						<Icon className="h-4 w-4 text-gray-400" />
					</div>
				)}
				<input
					id={id}
					name={name}
					type={type}
					required={required}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					autoComplete={autoComplete}
					className={`block w-full pl-8 pr-8 py-2.5 border text-sm focus:outline-none transition-colors placeholder:text-gray-400 ${
						error
							? "border-red-500 focus:border-red-700"
							: "border-gray-200 focus:border-red-700"
					}`}
					{...props}
				/>
				{suffix && (
					<div className="absolute inset-y-0 right-0 pr-2.5 flex items-center">
						{suffix}
					</div>
				)}
			</div>
			{error && <p className="mt-1 text-xs text-red-500">{error}</p>}
		</div>
	);
}

export function PasswordStrength({ strength, getStrengthColor, getStrengthText }) {
	if (strength === 0) return null;

	return (
		<div className="mt-1.5">
			<div className="flex gap-1 mb-1">
				{[1, 2, 3, 4].map((level) => (
					<div
						key={level}
						className={`h-0.5 flex-1 rounded-full transition-all ${
							level <= strength ? getStrengthColor() : "bg-gray-200"
						}`}
					/>
				))}
			</div>
			<p className="text-xs text-gray-500">
				Strength: <span className="font-medium">{getStrengthText()}</span>
			</p>
		</div>
	);
}

export function PasswordMatch({ password, confirmPassword }) {
	if (!confirmPassword) return null;

	return (
		<div className="absolute inset-y-0 right-0 pr-2.5 flex items-center">
			{password === confirmPassword ? (
				<Check className="h-4 w-4 text-green-500" />
			) : (
				<span className="text-red-500 text-xs">✕</span>
			)}
		</div>
	);
}

export function SubmitButton({ loading, children }) {
	return (
		<button
			type="submit"
			disabled={loading}
			className="w-full bg-red-700 text-white font-medium py-2.5 text-sm hover:bg-red-800 focus:outline-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			{loading ? (
				<>
					<svg
						className="w-4 h-4 animate-spin"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
						/>
					</svg>
					{children}
				</>
			) : (
				children
			)}
		</button>
	);
}
