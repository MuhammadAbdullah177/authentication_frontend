import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import axios from "axios";

export default function ResetPasswordRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract token from /reset-password/:token route
    const pathSegments = location.pathname.split('/');
    const resetPasswordIndex = pathSegments.findIndex(segment => segment === 'reset-password');
    const token = resetPasswordIndex !== -1 ? pathSegments[resetPasswordIndex + 1] : null;

    const verifyToken = async (token: string) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/verify-reset-token/${token}`);
        if (response.data && response.data.success) {
          localStorage.setItem('reset_token', token);
          navigate('/reset-password', { replace: true });
        } else {
          setError(response.data?.message || "Invalid or expired reset token");
        }
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
          (err instanceof Error ? err.message : "Invalid or expired reset token")
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyToken(token);
    } else {
      setError('Invalid reset password link');
      setLoading(false);
    }
  }, [navigate, location]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] p-4">
        <Card className="w-full max-w-md border-0 bg-white/10 backdrop-blur-md shadow-2xl">
          <CardHeader className="space-y-2">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#c084fc] bg-clip-text text-transparent">
                Invalid Link
              </h1>
              <CardDescription className="text-gray-300 text-center">
                The password reset link is invalid or has expired
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#c084fc] p-1">
              <div className="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-[#60a5fa]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
          </div>
            <p className="text-red-400 text-sm text-center mt-2">{error}</p>
              <a
                href="/forgot-password"
              className="text-[#60a5fa] hover:text-[#c084fc] transition-colors text-sm mt-4"
              >
                Request new reset link
              </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loader while verifying
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] p-4">
        <Card className="w-full max-w-md border-0 bg-white/10 backdrop-blur-md shadow-2xl">
          <CardHeader className="space-y-2">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#c084fc] bg-clip-text text-transparent">
                Verifying Link
              </h1>
              <CardDescription className="text-gray-300 text-center">
                Please wait while we verify your reset link
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#c084fc] p-1">
              <div className="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#60a5fa] border-t-transparent rounded-full animate-spin" />
          </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}