import { BookOpen, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts";
import { Link, useNavigate } from "react-router-dom";
import InputField, {
  PasswordToggle,
  CheckboxField,
  SubmitButton,
} from "../components/ui/InputField";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="w-full max-w-md">
        <div className="border border-gray-200 p-6 space-y-5">
          <div className="text-center">
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
            <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-2.5 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />

            <div>
              <InputField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="••••••••"
                icon={Lock}
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                suffix={
                  <PasswordToggle
                    visible={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                  />
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <CheckboxField
                id="rememberMe"
                name="rememberMe"
                label="Remember me"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <button
                type="button"
                className="text-xs font-medium text-red-700 hover:text-red-800 transition-colors"
              >
                Forgot?
              </button>
            </div>

            <SubmitButton loading={loading}>Sign In</SubmitButton>
          </form>

          <p className="text-center text-sm text-gray-500">
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
