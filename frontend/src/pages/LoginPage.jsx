import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-base-100 to-base-200">
      {/* Left Side - Form */}
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
                Welcome Back
              </h1>
              <p className="text-base-content/70 text-lg">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span className="ml-2">Signing in...</span>
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-base-content/70">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="link link-primary font-medium hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image Pattern */}
      <div className="hidden lg:block relative">
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>
    </div>
  );
};

export default LoginPage;
