import axios from "axios";
import { useNavigate } from "react-router";
import Sign from "../components/Sign";

const Login = () => {
  const navigate = useNavigate();

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
    console.log("Login Data:", data);

    // try {
    //   const res = await axios.post("LOGIN_API", data);
    //   localStorage.setItem("token", res.data.token);
    //   localStorage.setItem("user", JSON.stringify(res.data.user));
    //   navigate("/dashboard");
    // } catch (error) {
    //   console.log(error);
    // }

    navigate("/dashboard");
  };

  const handleGoogleClick = () => {
    console.log("Google login");
    // window.location.href = "YOUR_GOOGLE_AUTH_API";
  };

  const handleFacebookClick = () => {
    console.log("Facebook login");
    // window.location.href = "YOUR_FACEBOOK_AUTH_API";
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
      onGoogleClick={handleGoogleClick}
      onFacebookClick={handleFacebookClick}
    />
  );
};

export default Login;
