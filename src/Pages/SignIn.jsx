import { useNavigate } from "react-router";
import { useIntroLoader } from "../components/AppEntry";
import Sign from "../components/Sign";

const Login = () => {
  const navigate = useNavigate();
  const { playIntro } = useIntroLoader();

  const loginFields = [
    {
      name: "email",
      label: "Email address",
      type: "email",
      placeholder: "Email Address",
      autoComplete: "email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
      autoComplete: "current-password",
    },
  ];

  const handleLogin = async (data) => {
    console.log("Login Data:", data);

    // try {
    //   const res = await axios.post("LOGIN_API", data);
    //   localStorage.setItem("token", res.data.token);
    //   localStorage.setItem("user", JSON.stringify(res.data.user));
    //   await playIntro();
    //   navigate("/dashboard");
    // } catch (error) {
    //   console.log(error);
    // }

    await playIntro();
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
      eyebrow="Sign In"
      title="Welcome back to your workspace."
      subtitle="Pick up where you left off."
      fields={loginFields}
      buttonText="Sign In"
      bottomText="Don't have an account?"
      bottomLinkText="Sign Up"
      bottomLinkTo="/signup"
      onSubmit={handleLogin}
      showForgotPassword={true}
      onGoogleClick={handleGoogleClick}
      onFacebookClick={handleFacebookClick}
      heroBadge="Focused Workflow"
      heroTitle="Stay on top of every task."
      heroDescription="A calm place to return to your work."
      heroStats={[
        {
          label: "Focus",
          value: "24/7",
        },
        {
          label: "Flow",
          value: "3x",
        },
      ]}
      heroHighlights={[
        "Clear task flow",
        "Fast status updates",
      ]}
    />
  );
};

export default Login;
