import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import { Dashboard } from './pages/dashboard';
import CheckEmailPage from './pages/checkemail';
import ForgotPasswordPage from './pages/forgotpassword';
import CheckResetEmailPage from './pages/checkresetemail';
import ResetPasswordPage from './pages/resetpassword';
import EmailVerifiedPage from './pages/emailverified';
import ChatPage from './pages/chat';
import ResetPasswordRedirect from './pages/resetpasswordredirect';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/check-email" element={<CheckEmailPage />} />
        <Route path="/verify-email/:token" element={<EmailVerifiedPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/check-reset-email" element={<CheckResetEmailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordRedirect />} />
        <Route path="/chat" element={<ChatPage />} />
        
      </Routes>
    </Router>
  );
};

export default App;
