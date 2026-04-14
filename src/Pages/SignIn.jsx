import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Sign from "../components/Sign";
import { getApiErrorMessage } from "../lib/api/getApiErrorMessage";
import { authService } from "../services/authService";
import { tokenStorage, userStorage } from "../lib/auth/tokenStorage";

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleLogin = async (data) => {
    if (!data.email || !data.password) {
      toast.error("Email and password are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const requestBody = {
        email: data.email,
        password: data.password,
      };

      const session = await authService.login(requestBody);

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
