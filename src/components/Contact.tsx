import { useState, FormEvent, ChangeEvent, FocusEvent } from 'react';
import { useTheme } from '../context/ThemeContext';
import SectionHeader from './SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CARD_SURFACE, SECTION_CONTAINER, SECTION_SPACING } from './layout';
import { cn } from '../utils/cn';

const CONTACT_INFO = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'roberto@pires.dev',
    href: 'mailto:roberto@pires.dev',
    copyable: true,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Location',
    value: 'São Paulo, Brazil (UTC-3)',
    href: null,
    copyable: false,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: 'LinkedIn',
    value: 'linkedin.com/in/robertopires',
    href: 'https://linkedin.com',
    copyable: false,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    label: 'GitHub',
    value: 'github.com/tsunade601',
    href: 'https://github.com/tsunade601',
    copyable: false,
  },
];

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

type SubmitStatus = 'idle' | 'loading' | 'success';

export default function Contact() {
  const { isDark } = useTheme();
  const ref = useScrollReveal();

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  // Validate form
  const errors: FormErrors = {};
  if (!form.name.trim()) {
    errors.name = 'Please enter your name.';
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!emailRegex.test(form.email.trim())) {
    errors.email = 'Please provide a valid email (e.g. name@domain.com).';
  }

  if (!form.subject.trim()) {
    errors.subject = 'Please enter a subject.';
  } else if (form.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }

  if (!form.message.trim()) {
    errors.message = 'Please enter your message.';
  } else if (form.message.trim().length < 10) {
    errors.message = `Message is too brief (${form.message.trim().length}/10 min characters).`;
  }

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const copyToClipboard = (text: string, type: 'email' | 'body') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else {
      setCopiedBody(true);
      setTimeout(() => setCopiedBody(false), 2500);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });

    if (!isValid) return;

    setStatus('loading');

    const to = 'roberto@pires.dev';
    const subject = encodeURIComponent(form.subject.trim());
    const body = encodeURIComponent(
      `${form.message.trim()}\n\n---\nSent by: ${form.name.trim()} (${form.email.trim()})`
    );

    setTimeout(() => {
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      setStatus('success');
    }, 500);
  };

  const resetForm = () => {
    setForm({ name: '', email: '', subject: '', message: '' });
    setTouched({});
    setStatus('idle');
  };

  const getInputClass = (fieldName: keyof FormErrors) => {
    const hasError = touched[fieldName] && !!errors[fieldName];
    const isSuccess = touched[fieldName] && !errors[fieldName];

    return cn(
      'w-full px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium border transition-all duration-200 focus:outline-none focus:ring-2',
      hasError
        ? 'border-rose-500 bg-rose-500/5 focus:ring-rose-500/30 text-rose-300 placeholder-rose-300/60'
        : isSuccess
          ? isDark
            ? 'border-emerald-500/60 bg-slate-800/80 focus:ring-emerald-500/30 text-white placeholder-slate-500'
            : 'border-emerald-500/60 bg-white focus:ring-emerald-500/30 text-slate-900 placeholder-slate-400'
          : isDark
            ? 'bg-slate-800/80 border-slate-700/80 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20'
            : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 shadow-sm'
    );
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={cn('section-hidden section-shell', SECTION_SPACING, isDark ? 'bg-slate-950/80' : 'bg-slate-50/80')}
    >
      <div className={SECTION_CONTAINER}>
        <SectionHeader
          isDark={isDark}
          eyebrow="Get in touch"
          title="Let's Connect"
          description="Have an upcoming project, architecture question, or job opportunity? Reach out directly."
        />

        <div className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column: Direct Info & Quick Copy */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <p className={cn('text-base sm:text-lg leading-relaxed', isDark ? 'text-slate-300' : 'text-slate-600')}>
              I'm actively seeking opportunities to build impactful products. Whether you're interested in partnering on a project, hiring full-time, or discussing engineering architecture — my inbox is always open.
            </p>

            <div className="space-y-4">
              {CONTACT_INFO.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    CARD_SURFACE,
                    'spotlight-card flex items-center justify-between p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5',
                    isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                      {item.icon}
                    </div>
                    <div>
                      <div className={cn('text-[11px] font-mono font-bold uppercase tracking-wider mb-0.5', isDark ? 'text-slate-400' : 'text-slate-500')}>
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className={cn('text-xs sm:text-sm font-semibold hover:text-indigo-500 transition-colors', isDark ? 'text-slate-200' : 'text-slate-800')}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className={cn('text-xs sm:text-sm font-semibold', isDark ? 'text-slate-200' : 'text-slate-800')}>
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>

                  {item.copyable && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.value, 'email')}
                      aria-label="Copy email address"
                      title="Copy email to clipboard"
                      className="p-2 rounded-xl text-slate-400 hover:text-indigo-500 hover:bg-indigo-500/10 transition-colors cursor-pointer"
                    >
                      {copiedEmail ? (
                        <span className="text-xs font-mono font-bold text-emerald-500 animate-fade-in-up">Copied!</span>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Availability Box */}
            <div className={cn('p-6 rounded-3xl border', isDark ? 'border-emerald-500/30 bg-emerald-950/20' : 'border-emerald-200 bg-emerald-50/70')}>
              <div className="flex items-center gap-3.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <div>
                  <p className={cn('text-sm font-bold', isDark ? 'text-emerald-400' : 'text-emerald-800')}>
                    Ready to Start New Projects
                  </p>
                  <p className={cn('text-xs mt-0.5', isDark ? 'text-slate-400' : 'text-slate-600')}>
                    Average response time: within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form with Validation */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className={cn(
                CARD_SURFACE,
                'p-6 sm:p-10 shadow-xl',
                isDark ? 'bg-slate-900/85 border-white/10 shadow-black/30' : 'bg-white border-slate-200 shadow-slate-200/80'
              )}
            >
              {status === 'success' ? (
                <div className="py-8 text-center space-y-4 animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto text-3xl">
                    ✓
                  </div>
                  <h3 className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-slate-900')}>
                    Ready to Send!
                  </h3>
                  <p className={cn('text-sm max-w-md mx-auto leading-relaxed', isDark ? 'text-slate-300' : 'text-slate-600')}>
                    Your default email client has been prepared with your message pre-filled. If it didn’t open automatically, you can copy the message below.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          `Subject: ${form.subject}\n\n${form.message}\n\nFrom: ${form.name} (${form.email})`,
                          'body'
                        )
                      }
                      className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 transition-all cursor-pointer"
                    >
                      {copiedBody ? 'Copied Message!' : 'Copy Formatted Text'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    {/* Name field */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="name" className={cn('text-xs font-semibold', isDark ? 'text-slate-300' : 'text-slate-700')}>
                          Your Name <span className="text-indigo-500">*</span>
                        </label>
                        {touched.name && !errors.name && (
                          <span className="text-[10px] text-emerald-500 font-bold">✓ Valid</span>
                        )}
                      </div>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={touched.name && !!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        placeholder="e.g. Jane Doe"
                        className={getInputClass('name')}
                      />
                      {touched.name && errors.name && (
                        <p id="name-error" className="mt-1 text-xs text-rose-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email field */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="email" className={cn('text-xs font-semibold', isDark ? 'text-slate-300' : 'text-slate-700')}>
                          Email Address <span className="text-indigo-500">*</span>
                        </label>
                        {touched.email && !errors.email && (
                          <span className="text-[10px] text-emerald-500 font-bold">✓ Valid</span>
                        )}
                      </div>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={touched.email && !!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        placeholder="jane@company.com"
                        className={getInputClass('email')}
                      />
                      {touched.email && errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-rose-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject field */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="subject" className={cn('text-xs font-semibold', isDark ? 'text-slate-300' : 'text-slate-700')}>
                        Subject <span className="text-indigo-500">*</span>
                      </label>
                      {touched.subject && !errors.subject && (
                        <span className="text-[10px] text-emerald-500 font-bold">✓ Valid</span>
                      )}
                    </div>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={touched.subject && !!errors.subject}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                      placeholder="e.g. Project collaboration or full-time opportunity"
                      className={getInputClass('subject')}
                    />
                    {touched.subject && errors.subject && (
                      <p id="subject-error" className="mt-1 text-xs text-rose-500">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="message" className={cn('text-xs font-semibold', isDark ? 'text-slate-300' : 'text-slate-700')}>
                        Message <span className="text-indigo-500">*</span>
                      </label>
                      <span className={cn('text-[10px] font-mono', form.message.length >= 10 ? 'text-slate-400' : 'text-amber-500')}>
                        {form.message.length} / 1000 chars (min 10)
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      maxLength={1000}
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={touched.message && !!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      placeholder="Tell me about your project, team, timeline, or whatever is on your mind..."
                      className={cn(getInputClass('message'), 'resize-none')}
                    />
                    {touched.message && errors.message && (
                      <p id="message-error" className="mt-1 text-xs text-rose-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={cn(
                      'w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-semibold text-xs sm:text-sm text-white transition-all duration-300 shadow-lg cursor-pointer',
                      'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60'
                    )}
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>Opening Mail Client...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
