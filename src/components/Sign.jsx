import { useState } from "react";
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
  isSubmitting = false,
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
    <div className="flex h-screen items-center justify-center overflow-hidden bg-[#eef2f7] p-4 md:p-6">
      <div className="animate-fade-up grid h-[calc(100vh-32px)] w-full max-w-6xl overflow-hidden rounded-[30px] bg-white shadow-[var(--color-shadow-soft)] transition-all duration-300 md:h-[calc(100vh-48px)] md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-5 md:px-10 md:py-8">
          <div className="mb-6 flex items-center gap-3 md:mb-8">
            <img
              src="/assets/proteamLogo.png"
              alt="logo"
              className="h-10 w-10 object-contain transition-transform duration-300 hover:scale-105 md:h-12 md:w-12"
            />
            <h1 className="text-xl font-bold text-[#202240] md:text-2xl">
              ProTeam
            </h1>
          </div>

          <div className="w-full max-w-[26.25rem]">
            <h2 className="mb-2 text-2xl font-bold text-[#202240] md:mb-3 md:text-3xl">
              {title}
            </h2>

            <p className="mb-5 text-sm text-gray-500 md:mb-6 md:text-base">
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
                  disabled={isSubmitting}
                  className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none transition duration-200 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(93,142,246,0.14)] md:h-12"
                />
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full cursor-pointer rounded-lg bg-blue-500 text-white font-medium transition duration-200 hover:-translate-y-0.5 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-80 md:h-12"
              >
                {isSubmitting ? `${buttonText}...` : buttonText}
              </button>
            </form>

            <div className="mt-3 text-center md:mt-4">
              <span className="text-sm text-gray-600">{bottomText} </span>
              <Link
                to={bottomLinkTo}
                className="text-sm text-blue-600 underline"
              >
                {bottomLinkText}
              </Link>
            </div>
          </div>
        </div>

        <div className="animate-fade-in hidden items-center justify-center bg-[#faf9ff] p-6 md:flex lg:p-8">
          <img
            src="/assets/photo1.png"
            alt="auth"
            className="max-h-[80%] w-full max-w-[23.75rem] object-contain transition-transform duration-500 hover:scale-[1.02]"
          />
        </div>
      </div>
    </div>
  );
};

export default Sign;
