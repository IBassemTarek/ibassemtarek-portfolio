import React from "react";

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

    window.location.href = `mailto:ibassemtarek@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      aria-labelledby="contact-heading"
      className="mt-24 w-full rounded-3xl border border-solid border-dark bg-light p-10 shadow-2xl dark:border-light dark:bg-dark lg:p-8 sm:p-5"
    >
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary dark:text-primaryDark">
          Agent-ready contact
        </p>
        <h2
          id="contact-heading"
          className="mt-3 text-4xl font-bold text-dark dark:text-light sm:text-3xl"
        >
          Start a project conversation
        </h2>
        <p
          id="contact-description"
          className="mt-3 text-base font-medium text-dark/75 dark:text-light/75"
        >
          Use this form to prepare a direct email about hiring, consulting,
          collaboration, or portfolio questions.
        </p>
      </div>

      <form
        action="mailto:ibassemtarek@gmail.com"
        method="post"
        encType="text/plain"
        aria-describedby="contact-description"
        toolname="contact_bassem"
        tooldescription="Prepares a direct email to Bassem Tarek Mahrous about hiring, consulting, collaboration, or questions about his portfolio. Accepts Arabic or English contact details and messages. يجهز رسالة بريد إلكتروني مباشرة إلى باسم طارق محفوظ بخصوص التوظيف أو الاستشارة أو التعاون أو أسئلة المحفظة."
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6 md:grid-cols-1"
      >
        <div className="flex flex-col">
          <label
            htmlFor="contact-name"
            className="mb-2 font-semibold text-dark dark:text-light"
          >
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            dir="auto"
            toolparamdescription="The name of the person contacting Bassem, in Arabic or English. اسم الشخص الذي يتواصل مع باسم بالعربية أو الإنجليزية."
            className="rounded-lg border-2 border-solid border-dark bg-light p-3 text-dark outline-none focus:border-primary dark:border-light dark:bg-dark dark:text-light dark:focus:border-primaryDark"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="contact-email"
            className="mb-2 font-semibold text-dark dark:text-light"
          >
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            dir="auto"
            toolparamdescription="A valid email address Bassem can reply to. بريد إلكتروني صحيح يمكن لباسم الرد عليه."
            className="rounded-lg border-2 border-solid border-dark bg-light p-3 text-dark outline-none focus:border-primary dark:border-light dark:bg-dark dark:text-light dark:focus:border-primaryDark"
          />
        </div>

        <div className="col-span-2 flex flex-col md:col-span-1">
          <label
            htmlFor="contact-topic"
            className="mb-2 font-semibold text-dark dark:text-light"
          >
            Topic
          </label>
          <select
            id="contact-topic"
            name="topic"
            required
            defaultValue=""
            toolparamdescription="The reason for contacting Bassem. سبب التواصل مع باسم."
            className="rounded-lg border-2 border-solid border-dark bg-light p-3 text-dark outline-none focus:border-primary dark:border-light dark:bg-dark dark:text-light dark:focus:border-primaryDark"
          >
            <option value="" disabled>
              Select a topic
            </option>
            <option value="Hiring">Hiring</option>
            <option value="Consulting">Consulting</option>
            <option value="Collaboration">Collaboration</option>
            <option value="Portfolio question">Portfolio question</option>
          </select>
        </div>

        <div className="col-span-2 flex flex-col md:col-span-1">
          <label
            htmlFor="contact-message"
            className="mb-2 font-semibold text-dark dark:text-light"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            dir="auto"
            toolparamdescription="The details of the request, project, opportunity, or question, in Arabic or English. تفاصيل الطلب أو المشروع أو الفرصة أو السؤال بالعربية أو الإنجليزية."
            className="resize-y rounded-lg border-2 border-solid border-dark bg-light p-3 text-dark outline-none focus:border-primary dark:border-light dark:bg-dark dark:text-light dark:focus:border-primaryDark"
          />
        </div>

        <div className="col-span-2 flex items-center justify-between gap-4 md:col-span-1 md:flex-col md:items-start">
          <p className="text-sm font-medium text-dark/70 dark:text-light/70">
            Submitting opens your email client with a prepared message. You can
            write in Arabic or English.
          </p>
          <button
            type="submit"
            className="rounded-lg border-2 border-solid border-dark bg-dark px-6 py-3 text-lg font-semibold text-light transition-colors hover:bg-light hover:text-dark dark:border-light dark:bg-light dark:text-dark dark:hover:bg-dark dark:hover:text-light sm:text-base"
          >
            Prepare email
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
