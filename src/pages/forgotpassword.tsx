import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "../components/ui/card";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    if (!email.trim()) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users/forgot-password", { email: email.trim().toLowerCase() });

      if (response.data.success) {
        setMessage("Password reset instructions have been sent to your email");
        setTimeout(() => {
          navigate("/check-reset-email");
        }, 2000);
      } else {
        setError(response.data.message || "Failed to send reset instructions");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reset instructions");
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
              Forgot Password
            </h1>
            <CardDescription className="text-gray-300 text-center">
              Enter your email address to receive a password reset link
          </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
          {message && (
              <div className="text-green-400 text-sm text-center p-2 bg-green-400/10 rounded-md">
              {message}
            </div>
          )}
          {error && (
              <div className="text-red-400 text-sm text-center p-2 bg-red-400/10 rounded-md">
              {error}
            </div>
          )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                placeholder="Enter your email address"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#60a5fa] to-[#c084fc] hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </Button>
            <div className="text-center">
              <a
                href="/login"
                className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
              >
                Back to Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
