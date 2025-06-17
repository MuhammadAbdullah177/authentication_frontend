import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasValidToken, setHasValidToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("reset_token");
    if (!token) {
      setError("No reset token found. Please request a new password reset.");
      setTimeout(() => {
        navigate("/forgot-password");
      }, 2000);
    } else {
      setHasValidToken(true);
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!hasValidToken) {
        throw new Error("No valid reset token found");
      }

      // Input validation
      if (!password.trim() || !confirmPassword.trim()) {
        throw new Error("Both password fields are required");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      const token = localStorage.getItem("reset_token");
      if (!token) {
        throw new Error("Invalid or expired reset token");
      }

      const response = await axios.post(
        `${API_URL}/api/users/reset-password`,
        {
          token: token,
          newPassword: password,
          confirmPassword: confirmPassword
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      // Validate response structure
      if (!response.data) {
        throw new Error("Invalid response from server");
      }

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to reset password");
      }

      // Clear sensitive data
      setPassword("");
      setConfirmPassword("");
      
      // Clear token and show success
      localStorage.removeItem("reset_token");
      setHasValidToken(false);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      console.error('Password reset error:', err);
      const errorMessage = err?.response?.data?.message || err.message || "An error occurred while resetting password";
      setError(errorMessage);

      if (
        errorMessage.toLowerCase().includes("invalid") || 
        errorMessage.toLowerCase().includes("expired") ||
        errorMessage.toLowerCase().includes("token")
      ) {
        localStorage.removeItem("reset_token");
        setHasValidToken(false);
        setTimeout(() => {
          navigate("/forgot-password");
        }, 2000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] p-4">
      <Card className="w-full max-w-md border-0 bg-white/10 backdrop-blur-md shadow-2xl">
        <CardHeader className="space-y-2">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#c084fc] bg-clip-text text-transparent">
              Reset Password
            </h1>
            <CardDescription className="text-gray-300">
              Enter your new password below. Password must be at least 6 characters.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="text-green-400 text-lg font-semibold text-center">
                Your password has been reset successfully!
              </div>
              <Button
                className="bg-gradient-to-r from-[#60a5fa] to-[#c084fc] hover:opacity-90 transition-opacity"
                onClick={() => navigate("/login")}
              >
                Go to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 pr-10"
                    placeholder="Enter your new password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-200">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 pr-10"
                    placeholder="Confirm your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {error && (
                <div className="text-red-400 text-sm text-center p-2 bg-red-400/10 rounded-md">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#60a5fa] to-[#c084fc] hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          <div className="text-sm text-center w-full space-x-1 text-gray-300">
            <span>Remember your password?</span>
            <a
              href="/login"
              className="text-[#60a5fa] hover:text-[#c084fc] transition-colors font-medium"
            >
              Sign in
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
