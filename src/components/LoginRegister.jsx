import { useState, useContext } from "react";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";

function LoginRegister() {
  const { login, register } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return "Please fill in all required fields";
    }

    if (!showLogin && !formData.name) {
      return "Please enter your name";
    }

    if (formData.email && !formData.email.includes("@")) {
      return "Please enter a valid email address";
    }

    if (formData.password && formData.password.length < 3) {
      return "Password must be at least 3 characters long";
    }

    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay for better UX
    setTimeout(() => {
      const userData = {
        name: formData.name || formData.email.split("@")[0],
        email: formData.email,
      };

      const success = login(userData);
      if (success) {
        setFormData({ email: "", password: "", name: "" });
      }
      setIsSubmitting(false);
    }, 500);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay for better UX
    setTimeout(() => {
      const userData = {
        name: formData.name,
        email: formData.email,
      };

      const success = register(userData);
      if (success) {
        setFormData({ email: "", password: "", name: "" });
      }
      setIsSubmitting(false);
    }, 500);
  };

  const handleToggleMode = () => {
    setShowLogin(!showLogin);
    setFormData({ email: "", password: "", name: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 px-4 md:px-10 py-8 pb-32">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 bg-clip-text text-transparent">
          Welcome to MoviesApp
        </h1>

        <div className="bg-white/90 rounded-2xl shadow-xl border border-blue-200 p-8">
          {/* Toggle Buttons */}
          <div className="flex mb-6 bg-blue-50 rounded-xl p-1">
            <button
              onClick={() => setShowLogin(true)}
              disabled={isSubmitting}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                showLogin
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-blue-600 hover:bg-blue-100"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Login
            </button>
            <button
              onClick={() => setShowLogin(false)}
              disabled={isSubmitting}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                !showLogin
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-blue-600 hover:bg-blue-100"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Register
            </button>
          </div>

          <form
            onSubmit={showLogin ? handleLogin : handleRegister}
            className="space-y-4"
          >
            {!showLogin && (
              <div>
                <label className="block text-blue-900 font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  required={!showLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-blue-900 font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                disabled={isSubmitting}
                className="w-full py-3 px-4 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
            </div>

            <div>
              <label className="block text-blue-900 font-semibold mb-2">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                disabled={isSubmitting}
                className="w-full py-3 px-4 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                required
                minLength="3"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {showLogin ? "Logging in..." : "Creating Account..."}
                </>
              ) : showLogin ? (
                "Login"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-blue-700 text-sm">
              Demo app - use any email/password combination
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
