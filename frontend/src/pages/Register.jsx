import { BookOpen, Mail, Lock, User, Phone, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts";
import InputField, {
  PasswordStrength,
  PasswordMatch,
  SubmitButton,
} from "../components/ui/InputField";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        ...(formData.phone && { phone_number: formData.phone }),
      };

      const result = await register(userData);

      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "Registration failed");
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
    const colors = [
      "bg-gray-200",
      "bg-red-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-green-500",
    ];
    return colors[passwordStrength] || colors[0];
  };

  const getPasswordStrengthText = () => {
    const texts = ["", "Weak", "Fair", "Good", "Strong"];
    return texts[passwordStrength] || "";
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

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-2.5 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField
                id="firstName"
                name="firstName"
                label="First Name"
                placeholder="John"
                icon={User}
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <InputField
                id="lastName"
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                icon={User}
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <InputField
              id="username"
              name="username"
              label="Username"
              placeholder="johndoe"
              icon={UserPlus}
              value={formData.username}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputField
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
                icon={Mail}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <InputField
                id="phone"
                name="phone"
                type="tel"
                label="Phone (opt)"
                placeholder="+34 612 345 678"
                icon={Phone}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <InputField
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                icon={Lock}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <PasswordStrength
                strength={passwordStrength}
                getStrengthColor={getPasswordStrengthColor}
                getStrengthText={getPasswordStrengthText}
              />
            </div>

            <InputField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              icon={Lock}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              suffix={
                <PasswordMatch
                  password={formData.password}
                  confirmPassword={formData.confirmPassword}
                />
              }
            />

            <SubmitButton loading={loading}>Create Account</SubmitButton>
          </form>

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
