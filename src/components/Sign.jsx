import { useState } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiLayers,
  FiLock,
  FiTrendingUp,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleLine } from "react-icons/ri";
import { Link } from "react-router";

const Sign = ({
  eyebrow = "Workspace Access",
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
  heroBadge = "Premium Task Workspace",
  heroTitle = "Keep your team aligned with a calmer, clearer command center.",
  heroDescription = "A premium workflow surface for tracking work, moving priorities, and keeping the next step easy to understand.",
  heroHighlights = [],
  heroStats = [],
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const validateForm = (candidateData) => {
    const nextErrors = {};

    fields.forEach((field) => {
      const rawValue = candidateData[field.name] ?? "";
      const value = typeof rawValue === "string" ? rawValue.trim() : rawValue;

      if (!value) {
        nextErrors[field.name] = `${field.label} is required.`;
        return;
      }

      if (
        field.type === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        nextErrors[field.name] = "Enter a valid email address.";
      }
    });

    if (
      "password" in candidateData &&
      "confirmPassword" in candidateData &&
      candidateData.confirmPassword &&
      candidateData.password !== candidateData.confirmPassword
    ) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(nextFormData);

    if (Object.keys(errors).length > 0) {
      setErrors(validateForm(nextFormData));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm(formData);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="page-enter relative min-h-screen overflow-hidden bg-[var(--page-background)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-x-0 top-0 h-[32rem]"
          style={{ background: "var(--page-shell-top-wash)" }}
        />
        <div
          className="absolute left-[-10rem] top-[-4rem] h-[32rem] w-[32rem] rounded-full blur-[140px]"
          style={{ backgroundColor: "var(--page-shell-primary-glow)" }}
        />
        <div
          className="absolute right-[-9rem] top-[1rem] h-[30rem] w-[30rem] rounded-full blur-[150px]"
          style={{ backgroundColor: "var(--page-shell-warm-glow)" }}
        />
        <div
          className="absolute left-1/2 top-[10%] h-[18rem] w-[32rem] -translate-x-1/2 rounded-full blur-[120px]"
          style={{ backgroundColor: "var(--page-shell-center-glow)" }}
        />
        <div className="premium-grid absolute inset-0 opacity-24 [mask-image:linear-gradient(to_bottom,black,transparent_74%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[82rem] items-center px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid w-full gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-stretch">
          <section className="premium-panel animate-fade-up rounded-[32px] px-4 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-[16px] shadow-[var(--shadow-xs)]"
                      style={{
                        background:
                          "linear-gradient(180deg, color-mix(in srgb, var(--surface-1) 82%, rgba(123, 156, 255, 0.24)) 0%, color-mix(in srgb, var(--surface-3) 72%, rgba(93, 142, 246, 0.16)) 100%)",
                      }}
                    >
                      <img
                        src="/assets/proteamLogo.png"
                        alt="logo"
                        className="h-7 w-7 object-contain"
                      />
                    </div>

                    <div>
                      <p className="text-lg font-black tracking-[-0.03em] text-[var(--text-strong)]">
                        ProTeam
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 ui-kicker">
                    <span
                      className="h-2 w-2 rounded-full bg-[var(--brand-primary-500)]"
                      aria-hidden="true"
                    />
                    {eyebrow}
                  </div>
                </div>

                <div className="ui-glass-chip hidden rounded-[20px] px-3.5 py-2.5 text-right sm:block">
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                    Secure
                  </p>
                </div>
              </div>

              <div className="mt-6 w-full max-w-[28rem]">
                <h1 className="text-[2rem] font-black tracking-[-0.05em] text-[var(--text-strong)] sm:text-[2.3rem] lg:text-[2.65rem] lg:leading-[1.04]">
                  {title}
                </h1>

                {subtitle && (
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
                    {subtitle}
                  </p>
                )}

                <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-3.5">
                  {fields.map((field) => (
                    <label key={field.name} className="flex flex-col gap-2">
                      <span className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                        {field.label}
                      </span>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] ?? ""}
                        placeholder={field.placeholder}
                        required
                        autoComplete={field.autoComplete}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors[field.name])}
                        className={`ui-control px-4 text-sm md:h-[3.4rem] md:text-[0.95rem] ${
                          errors[field.name] ? "ui-control-error" : ""
                        }`}
                      />
                      {errors[field.name] && (
                        <span className="ui-field-error">{errors[field.name]}</span>
                      )}
                    </label>
                  ))}

                  <div className="flex items-center justify-between gap-4 pt-1">
                    {showForgotPassword ? (
                      <Link
                        to="/forgot-password"
                        className="ui-btn-ghost min-h-10 rounded-[16px] px-0 text-sm"
                      >
                        Forgot Password?
                      </Link>
                    ) : (
                      <span />
                    )}

                    <div className="ui-glass-chip hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] sm:inline-flex">
                      <FiLock className="text-sm text-[var(--brand-primary-500)]" />
                      Protected
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="ui-btn-primary min-h-11 w-full cursor-pointer px-6 text-sm md:min-h-[3.25rem] md:text-[0.95rem]"
                  >
                    {buttonText}
                    <FiArrowRight className="text-lg" />
                  </button>
                </form>

                <div className="mt-4 text-center text-sm text-[var(--text-secondary)]">
                  <span>{bottomText} </span>
                  <Link
                    to={bottomLinkTo}
                    className="font-bold text-[var(--brand-primary-500)] transition-colors duration-200 hover:text-[var(--brand-primary-600)]"
                  >
                    {bottomLinkText}
                  </Link>
                </div>

                <div className="my-4 flex items-center gap-4">
                  <div className="h-px flex-1" style={{ background: "var(--divider-fade)" }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                    Continue with
                  </span>
                  <div className="h-px flex-1" style={{ background: "var(--divider-fade)" }} />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={onGoogleClick}
                    className="ui-btn-secondary min-h-11 cursor-pointer px-4 text-sm md:min-h-[3.25rem]"
                  >
                    <span className="text-xl">
                      <FcGoogle />
                    </span>
                    Google
                  </button>

                  <button
                    type="button"
                    onClick={onFacebookClick}
                    className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[20px] border border-[rgba(79,111,181,0.2)] bg-[linear-gradient(180deg,rgba(95,124,189,0.96),rgba(79,111,181,0.88))] px-4 text-sm font-bold text-white shadow-[var(--shadow-xs)] transition-[transform,box-shadow,border-color,filter] duration-200 [transition-timing-function:var(--ease-standard)] hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] md:min-h-[3.25rem]"
                  >
                    <span className="text-xl">
                      <RiFacebookCircleLine />
                    </span>
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </section>

          <aside className="auth-aurora animate-fade-in relative overflow-hidden rounded-[34px] border border-[rgba(214,225,244,0.7)] bg-[linear-gradient(145deg,rgba(17,28,64,0.98)_0%,rgba(28,45,99,0.95)_24%,rgba(78,97,191,0.9)_64%,rgba(255,188,122,0.7)_100%)] shadow-[var(--shadow-lg)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_72%_24%,rgba(152,184,255,0.26),transparent_34%),radial-gradient(circle_at_58%_78%,rgba(255,204,146,0.22),transparent_30%)]"
            />
            <div
              aria-hidden="true"
              className="auth-float pointer-events-none absolute right-[12%] top-[14%] h-32 w-32 rounded-full bg-[rgba(255,255,255,0.08)] blur-[60px]"
            />
            <div
              aria-hidden="true"
              className="auth-float-delay pointer-events-none absolute left-[8%] bottom-[20%] h-40 w-40 rounded-full bg-[rgba(116,156,255,0.18)] blur-[70px]"
            />

            <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6 lg:p-8">
              <div>
                <div className="ui-kicker border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.1)] text-white shadow-none">
                  <span className="h-2 w-2 rounded-full bg-white" aria-hidden="true" />
                  {heroBadge}
                </div>

                <h2 className="mt-5 max-w-xl text-[2rem] font-black tracking-[-0.05em] text-white sm:text-[2.35rem] lg:text-[2.7rem] lg:leading-[1.04]">
                  {heroTitle}
                </h2>

                {heroDescription && (
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[rgba(235,241,255,0.84)] sm:text-base">
                    {heroDescription}
                  </p>
                )}
              </div>

              <div className="mt-6 grid gap-3.5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
                <div className="relative overflow-hidden rounded-[26px] border border-[rgba(255,255,255,0.16)] bg-[rgba(9,19,39,0.18)] px-4 py-4 shadow-[0_24px_60px_rgba(8,16,42,0.24)] backdrop-blur-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-[rgba(255,255,255,0.12)] text-white">
                      <FiLayers className="text-lg" />
                    </div>
                    <div>
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[rgba(229,236,255,0.62)]">
                        Workspace
                      </p>
                      <p className="mt-1 text-base font-black text-white">
                        Calm execution
                      </p>
                    </div>
                  </div>

                  <img
                    src="/assets/photo1.png"
                    alt="workspace illustration"
                    className="auth-float mt-4 max-h-[15rem] w-full object-contain"
                  />

                  <div className="absolute bottom-4 left-4 rounded-[18px] border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.1)] px-3.5 py-2.5 shadow-[0_12px_34px_rgba(7,13,36,0.18)] backdrop-blur-lg">
                    <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[rgba(231,238,255,0.64)]">
                      Live
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      Search, prioritize
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {heroStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-[22px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.1)] px-4 py-3.5 shadow-[0_18px_40px_rgba(8,16,42,0.16)] backdrop-blur-lg"
                      >
                        <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[rgba(231,238,255,0.64)]">
                          {stat.label}
                        </p>
                        <p className="mt-2 text-2xl font-black tracking-[-0.06em] text-white">
                          {stat.value}
                        </p>
                        {stat.note && (
                          <p className="mt-1 text-xs leading-5 text-[rgba(237,242,255,0.78)]">
                            {stat.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {heroHighlights.map((item, index) => {
                      const icon =
                        index % 3 === 0 ? (
                          <FiCheckCircle className="text-lg" />
                        ) : index % 3 === 1 ? (
                          <FiLock className="text-lg" />
                        ) : (
                          <FiTrendingUp className="text-lg" />
                        );

                      return (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-[22px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.1)] px-4 py-3.5 shadow-[0_18px_40px_rgba(8,16,42,0.16)] backdrop-blur-lg"
                        >
                          <div className="mt-0.5 text-white">{icon}</div>
                          <p className="text-sm leading-6 text-[rgba(240,244,255,0.88)]">
                            {item}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Sign;
