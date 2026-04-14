// This page handles user registration.
// It prepares the signup payload, shows toast feedback, and redirects
// the user to the sign-in page after a successful account creation.
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Sign from "../components/Sign";
import { getApiErrorMessage } from "../lib/api/getApiErrorMessage";
import { authService } from "../services/authService";

const Signup = () => {
  const navigate = useNavigate();
  // Local submit state keeps the primary button responsive but controlled.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field definitions are passed into the shared auth form component.
  const signupFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Full Name",
    },
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
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
    },
  ];

  // Submit flow:
  // 1. validate required fields and password confirmation
  // 2. send the register request
  // 3. show feedback
  // 4. redirect to login
  const handleSignup = async (data) => {
    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Match the backend register payload exactly.
      const requestBody = {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      };

      const response = await authService.register(requestBody);
      toast.success(response?.message || "Account created successfully.");
      navigate("/signin");
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "We could not create your account right now."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sign
      title="Create Account"
      subtitle="Sign up to get started with your dashboard"
      fields={signupFields}
      buttonText="Sign Up"
      bottomText="Already have an account?"
      bottomLinkText="Log In"
      bottomLinkTo="/signin"
      onSubmit={handleSignup}
      isSubmitting={isSubmitting}
    />
  );
};

export default Signup;
