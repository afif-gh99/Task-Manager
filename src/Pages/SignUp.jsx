import axios from "axios";
import { useNavigate } from "react-router";
import Sign from "../components/Sign";

const Signup = () => {
  const navigate = useNavigate();

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

  const handleSignup = async (data) => {
    console.log("Signup Data:", data);

    // try {
    //   const res = await axios.post("SIGNUP_API", data);
    //   console.log(res.data);
    //   navigate("/dashboard");
    // } catch (error) {
    //   console.log(error);
    // }

    navigate("/dashboard");
  };

  const handleGoogleClick = () => {
    console.log("Google signup");
    // window.location.href = "YOUR_GOOGLE_AUTH_API";
  };

  const handleFacebookClick = () => {
    console.log("Facebook signup");
    // window.location.href = "YOUR_FACEBOOK_AUTH_API";
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
      onGoogleClick={handleGoogleClick}
      onFacebookClick={handleFacebookClick}
    />
  );
};

export default Signup;
