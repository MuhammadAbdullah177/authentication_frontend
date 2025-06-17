import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardDescription } from "../components/ui/card";
import { useNavigate } from "react-router-dom";

export default function CheckResetEmailPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] p-4">
      <Card className="w-full max-w-md border-0 bg-white/10 backdrop-blur-md shadow-2xl">
        <CardHeader className="space-y-2">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#c084fc] bg-clip-text text-transparent">
              Check Your Email
            </h1>
            <CardDescription className="text-gray-300 text-center">
              We have sent password reset instructions to your email.
              Please check your inbox and follow the link to reset your password.
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          <Button
            className="bg-gradient-to-r from-[#60a5fa] to-[#c084fc] hover:opacity-90 transition-opacity"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
          <p className="text-gray-400 text-sm text-center mt-4">
            Didn't receive the email?{" "}
            <a
              href="/forgot-password"
              className="text-[#60a5fa] hover:text-[#c084fc] transition-colors"
            >
              Try again
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
