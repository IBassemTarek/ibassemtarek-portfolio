import React from "react";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "./AppIcons";

const EMAIL = "ibassemtarek@gmail.com";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full fill-current">
      <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v.4l8 5.1 8-5.1V7H4zm16 2.8-7.46 4.75a1 1 0 0 1-1.08 0L4 9.8V17h16V9.8z" />
    </svg>
  );
}

// Icons sit in a fixed box: the shared icons carry their own w-full.
const CHANNELS = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, Icon: MailIcon },
  {
    label: "LinkedIn",
    value: "in/ibassemtarek",
    href: "https://www.linkedin.com/in/ibassemtarek/",
    Icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    value: "IBassemTarek",
    href: "https://github.com/IBassemTarek",
    Icon: GithubIcon,
  },
  {
    label: "X",
    value: "@IBassemTarek",
    href: "https://twitter.com/IBassemTarek",
    Icon: TwitterIcon,
  },
  {
    label: "Facebook",
    value: "IBassemTarek",
    href: "https://www.facebook.com/IBassemTarek",
    Icon: FacebookIcon,
  },
  {
    label: "Instagram",
    value: "@ibassemtarek",
    href: "https://www.instagram.com/ibassemtarek",
    Icon: InstagramIcon,
  },
];

const FIELD =
  "w-full rounded-xl border border-solid border-dark/15 bg-white px-4 py-3 text-dark outline-none transition placeholder:text-dark/40 focus:border-primary focus:ring-4 focus:ring-primary/15 dark:border-light/15 dark:bg-light/5 dark:text-light dark:placeholder:text-light/35 dark:focus:border-primaryDark dark:focus:ring-primaryDark/15";
const LABEL = "mb-2 text-sm font-semibold text-dark/80 dark:text-light/80";

const ContactForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const topic = formData.get("topic");
    const message = formData.get("message");
    const subject = encodeURIComponent(`Portfolio contact: ${topic}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mt-28 grid w-full grid-cols-[0.85fr_1.15fr] overflow-hidden rounded-[2rem] border border-solid border-dark/10 bg-light shadow-2xl dark:border-light/10 dark:bg-dark lg:grid-cols-1 md:mt-20"
    >
      <div className="contact-panel relative flex flex-col justify-between gap-10 p-10 text-light lg:p-8 sm:p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-light/80">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="mt-3 text-4xl font-bold leading-tight sm:text-3xl"
          >
            Let&apos;s build something people love.
          </h2>
          <p
            id="contact-description"
            className="mt-4 text-base font-medium text-light/85"
          >
            Hiring, consulting, a new app or a question about my work: tell me
            about it here and the form prepares an email to me. Arabic or
            English, both welcome.
          </p>
        </div>

        <ul className="m-0 space-y-3 p-0">
          {CHANNELS.map(({ label, value, href, Icon }) => (
            <li key={label} className="list-none">
              <a
                href={href}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="group flex items-center gap-4 rounded-2xl border border-solid border-light/15 bg-light/10 px-4 py-3 transition hover:border-light/40 hover:bg-light/20"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-light p-2 text-dark">
                  <Icon />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-light/70">
                    {label}
                  </span>
                  <span className="block break-all font-semibold sm:text-sm">{value}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="ms-auto text-xl transition group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <form
        aria-describedby="contact-description"
        toolname="contact_bassem"
        tooldescription="Prepares a direct email to Bassem Tarek Mahrous about hiring, consulting, collaboration, or questions about his portfolio. Accepts Arabic or English contact details and messages. يجهز رسالة بريد إلكتروني مباشرة إلى باسم طارق محفوظ بخصوص التوظيف أو الاستشارة أو التعاون أو أسئلة المحفظة."
        onSubmit={handleSubmit}
        className="grid grid-cols-2 content-start gap-5 p-10 lg:p-8 md:grid-cols-1 sm:p-6"
      >
        <div className="flex flex-col">
          <label htmlFor="contact-name" className={LABEL}>
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            dir="auto"
            placeholder="Jane Doe"
            toolparamdescription="The name of the person contacting Bassem, in Arabic or English. اسم الشخص الذي يتواصل مع باسم بالعربية أو الإنجليزية."
            className={FIELD}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="contact-email" className={LABEL}>
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            dir="auto"
            placeholder="jane@company.com"
            toolparamdescription="A valid email address Bassem can reply to. بريد إلكتروني صحيح يمكن لباسم الرد عليه."
            className={FIELD}
          />
        </div>

        <div className="col-span-2 flex flex-col md:col-span-1">
          <label htmlFor="contact-topic" className={LABEL}>
            Topic
          </label>
          <div className="relative">
            <select
              id="contact-topic"
              name="topic"
              required
              defaultValue=""
              toolparamdescription="The reason for contacting Bassem. سبب التواصل مع باسم."
              className={`${FIELD} appearance-none pe-10`}
            >
              <option value="" disabled>
                What&apos;s it about?
              </option>
              <option value="Hiring">Hiring</option>
              <option value="Consulting">Consulting</option>
              <option value="Collaboration">Collaboration</option>
              <option value="Portfolio question">Portfolio question</option>
            </select>
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="pointer-events-none absolute end-4 top-1/2 h-4 w-4 -translate-y-1/2 fill-current text-dark/50 dark:text-light/50"
            >
              <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z" />
            </svg>
          </div>
        </div>

        <div className="col-span-2 flex flex-col md:col-span-1">
          <label htmlFor="contact-message" className={LABEL}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            dir="auto"
            placeholder="A few lines about your project, timeline or question."
            toolparamdescription="The details of the request, project, opportunity, or question, in Arabic or English. تفاصيل الطلب أو المشروع أو الفرصة أو السؤال بالعربية أو الإنجليزية."
            className={`${FIELD} resize-y`}
          />
        </div>

        <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
          <button
            type="submit"
            className="contact-submit w-full rounded-xl px-6 py-3.5 text-lg font-semibold text-light shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 sm:text-base"
          >
            Prepare email →
          </button>
          <p className="text-center text-sm font-medium text-dark/60 dark:text-light/60">
            Opens your email app with the message ready to send.
          </p>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
