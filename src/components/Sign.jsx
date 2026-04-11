import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleLine } from "react-icons/ri";
import { Link } from "react-router";

const Sign = ({
  title,
  subtitle,
  fields = [],
  buttonText,
  bottomText,
  bottomLinkText,
  bottomLinkTo,
  onSubmit,
  showForgotPassword = false,
  onGoogleClick,
  onFacebookClick,
}) => {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="h-screen overflow-hidden bg-[#eef2f7] flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-6xl h-[calc(100vh-32px)] md:h-[calc(100vh-48px)] bg-white rounded-[30px] shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="px-6 py-5 md:px-10 md:py-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <img
              src="/public/assets/proteamLogo.png"
              alt="logo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-[#202240]">
              ProTeam
            </h1>
          </div>

          <div className="w-full max-w-105">
            <h2 className="text-3xl md:text-4xl font-bold text-[#202240] mb-2 md:mb-3">
              {title}
            </h2>

            <p className="text-gray-500 mb-5 md:mb-6 text-sm md:text-base">
              {subtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              {fields.map((field) => (
                <input
                  key={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required
                  onChange={handleChange}
                  className="w-full h-11 md:h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                />
              ))}

              {showForgotPassword && (
                <Link
                  to="/forgot-password"
                  className="block text-sm text-blue-600 underline"
                >
                  Forgot Password?
                </Link>
              )}

              <button
                type="submit"
                className="w-full h-11 md:h-12 rounded-lg bg-blue-500 hover:bg-blue-600 duration-300 text-white font-medium cursor-pointer"
              >
                {buttonText}
              </button>
            </form>

            <div className="text-center mt-3 md:mt-4">
              <span className="text-sm text-gray-600">{bottomText} </span>
              <Link
                to={bottomLinkTo}
                className="text-sm text-blue-600 underline"
              >
                {bottomLinkText}
              </Link>
            </div>

            <div className="flex items-center gap-4 my-4 md:my-5">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-[#202240]">{buttonText} with</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onGoogleClick}
                className="h-11 md:h-12 border border-gray-300 rounded-lg flex items-center justify-center gap-1.5 bg-white cursor-pointer"
              >
                <span className="text-[19px]">
                  <FcGoogle />
                </span>
                <span className="text-gray-600 font-medium">Google</span>
              </button>

              <button
                type="button"
                onClick={onFacebookClick}
                className="h-11 md:h-12 rounded-lg flex items-center justify-center gap-1.5 bg-[#4f6fb5] text-white cursor-pointer"
              >
                <span className="text-[19px]">
                  <RiFacebookCircleLine />
                </span>
                <span className="font-medium">Facebook</span>
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center bg-[#faf9ff] p-6 lg:p-8">
          <img
            src="/public/assets/photo1.png"
            alt="auth"
            className="w-full max-w-95 max-h-[80%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Sign;
