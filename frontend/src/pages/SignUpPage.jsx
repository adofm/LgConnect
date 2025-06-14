import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import AuthImagePattern from "../components/AuthImagePattern";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-base-100 to-base-200">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-hidden">
        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Logo and Header */}
          <div className="text-center mb-12">
            <div className="flex flex-col items-center gap-3 group">
              <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center 
                group-hover:bg-primary/20 transition-all duration-300 transform group-hover:scale-110
                shadow-lg shadow-primary/5">
                <MessageSquare className="size-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className="text-base-content/70 text-lg">Join our community today</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base">Full Name</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
                  group-focus-within:text-primary transition-colors">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20
                    transition-all duration-200"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base">Email</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
                  group-focus-within:text-primary transition-colors">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20
                    transition-all duration-200"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base">Password</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
                  group-focus-within:text-primary transition-colors">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20
                    transition-all duration-200"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40
                    hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full h-12 text-lg font-medium
                hover:scale-[1.02] active:scale-[0.98] transition-transform
                shadow-lg shadow-primary/20"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span className="ml-2">Creating Account...</span>
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-base-content/70">
              Already have an account?{" "}
              <Link
                to="/login"
                className="link link-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image Pattern */}
      <div className="hidden lg:block relative">
        <AuthImagePattern
          title="Welcome to LG Connect"
          subtitle="Collaborate, communicate, and thrive together — because at LG, Life's Good when we're connected."
        />
      </div>
    </div>
  );
};

export default SignUpPage;