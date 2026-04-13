import { useNavigate } from "react-router";
import Sign from "../components/Sign";

const Signup = () => {
  const navigate = useNavigate();

  const signupFields = [
    {
      name: "name",
      label: "Full name",
      type: "text",
      placeholder: "Full Name",
      autoComplete: "name",
    },
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
      autoComplete: "new-password",
    },
    {
      name: "confirmPassword",
      label: "Confirm password",
      type: "password",
      placeholder: "Confirm Password",
      autoComplete: "new-password",
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
      eyebrow="Create Account"
      title="Create your premium workspace."
      subtitle="Stay focused and organized."
      fields={signupFields}
      buttonText="Sign Up"
      bottomText="Already have an account?"
      bottomLinkText="Log In"
      bottomLinkTo="/signin"
      onSubmit={handleSignup}
      onGoogleClick={handleGoogleClick}
      onFacebookClick={handleFacebookClick}
      heroBadge="New Workspace"
      heroTitle="Bring structure to the work."
      heroDescription="Set up a calm, focused workspace."
      heroStats={[
        {
          label: "Setup",
          value: "5 min",
        },
        {
          label: "Signals",
          value: "Live",
        },
      ]}
      heroHighlights={[
        "Fast onboarding",
        "Clear task status",
      ]}
    />
  );
};

export default Signup;
