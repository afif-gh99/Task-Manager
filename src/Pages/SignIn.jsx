// This page handles the sign-in flow.
// It validates the form, calls the login endpoint, stores auth data,
// then redirects the user to the dashboard.
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Sign from "../components/Sign";
import { getApiErrorMessage } from "../lib/api/getApiErrorMessage";
import { authService } from "../services/authService";
import { tokenStorage, userStorage } from "../lib/auth/tokenStorage";

const Login = () => {
  const navigate = useNavigate();
  // Local submit state is used only for button disabling and UX feedback.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // These field definitions are passed into the shared Sign form component.
  const loginFields = [
    {
      name: "email",
      type: "email",
      placeholder: "Email Address",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
    },
  ];

  // Submit flow:
  // 1. validate required fields
  // 2. call the login API
  // 3. store token + user for later authenticated requests
  // 4. show a toast and redirect
  const handleLogin = async (data) => {
    if (!data.email || !data.password) {
      toast.error("Email and password are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Build the exact request body expected by the auth API.
      const requestBody = {
        email: data.email,
        password: data.password,
      };

      const session = await authService.login(requestBody);

      // Save auth state locally so protected task requests can attach the token.
      tokenStorage.setToken(session?.Token);
      userStorage.setUser(session?.User);
      toast.success(session?.message || "Signed in successfully.");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "We could not sign you in right now."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sign
      title="Welcome back!"
      subtitle="Sign in to get started with your dashboard"
      fields={loginFields}
      buttonText="Sign In"
      bottomText="Dont have an account?"
      bottomLinkText="Sign Up"
      bottomLinkTo="/signup"
      onSubmit={handleLogin}
      showForgotPassword={true}
      isSubmitting={isSubmitting}
    />
  );
};

export default Login;
