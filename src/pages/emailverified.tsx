import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function EmailVerified() {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'already-verified'>('loading');
  const [message, setMessage] = useState<string>("");
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setVerificationStatus('error');
      setMessage('No verification token provided.');
      toast.error('No verification token provided.');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/verify-email/${token}`);
        if (response.data && response.data.success) {
          if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('isAuthenticated', 'true');
          }
          setVerificationStatus('success');
          setMessage(response.data.message || 'Email verified successfully!');
          toast.success(response.data.message || 'Email verified successfully!');
        } else if (response.data && response.data.message && response.data.message.toLowerCase().includes('already verified')) {
          setVerificationStatus('already-verified');
          setMessage('Your email is already verified.');
        } else if (response.data && response.data.message) {
          setVerificationStatus('error');
          setMessage(response.data.message);
        } else {
          setVerificationStatus('error');
          setMessage('Verification failed. Please try again.');
        }
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          (error instanceof Error ? error.message : "Internal Server Error");
        setVerificationStatus('error');
        setMessage(errorMessage);
        toast.error(errorMessage);
      }
    };

    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#fff] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-0 bg-white/90">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-[#C562AF] drop-shadow">Email Verification</CardTitle>
          <CardDescription className="text-center text-[#C562AF]/80">
            {verificationStatus === "loading" && "Please wait while we verify your email address."}
            {verificationStatus === "success" && "Your email has been verified successfully. You can now log in to your account."}
            {verificationStatus === "already-verified" && "Your email is already verified. You can log in to your account."}
            {verificationStatus === "error" && message}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {verificationStatus === "loading" && (
            <Loader2 className="h-8 w-8 text-[#C562AF] animate-spin" />
          )}
          {verificationStatus === "success" && (
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          )}
          {verificationStatus === "already-verified" && (
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          )}
          {verificationStatus === "error" && (
            <XCircle className="h-8 w-8 text-red-500" />
          )}
          {(verificationStatus === "success" || verificationStatus === "already-verified") && (
            <Button onClick={() => navigate("/login")} className="w-full bg-[#C562AF] hover:bg-[#a84b8c] text-white">
              Go to Login
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}