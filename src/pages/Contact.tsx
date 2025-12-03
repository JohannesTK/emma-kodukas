import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SocialConnect from '../components/SocialConnect';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Midagi läks valesti');
      }

      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Midagi läks valesti. Proovi hiljem uuesti.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <section style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Võta ühendust</h1>
        </div>
      </section>

      {/* Content */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.intro}>
            <div style={styles.contactImageWrapper}>
              <img
                src="/images/contact.png"
                alt="Emma-Leena"
                style={styles.contactImage}
              />
            </div>
            <p style={styles.introText}>
              See, et elu on Sind siia juhatanud, tähendab mulle väga palju. Iga
              tagasiside ja mõte aitavad Toidukodul saada veel hubasemaks ning jõuda
              veel rohkemate inimeste südameni.
            </p>
            <p style={styles.introText}>
              Siinne kirjakast on avatud kõikidele ideedele, tähelepanekutele,
              küsimustele ja koostööpakkumistele. Kirjuta, joonista, naerata :)
            </p>
            <p style={styles.introHighlight}>Vastan Sulle kõige esimesel võimalusel.</p>
          </div>

          <div style={styles.grid} className="contact-grid">
            {/* Contact Form */}
            <div style={styles.formCard}>
              <h2 style={styles.formTitle}>Saada sõnum</h2>

              {isSubmitted ? (
                <div style={styles.success}>
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-success)"
                    strokeWidth="2"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <h3 style={styles.successTitle}>Sõnum saadetud!</h3>
                  <p style={styles.successText}>
                    Täname, et võtsid ühendust! Vastan Sulle esimesel võimalusel.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="name">Nimi *</label>
                    <input
                      {...register('name', { required: 'Nimi on kohustuslik' })}
                      id="name"
                      style={styles.input}
                      placeholder="Sinu nimi"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <span id="name-error" style={styles.error} role="alert">{errors.name.message}</span>
                    )}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="email">E-post *</label>
                    <input
                      {...register('email', {
                        required: 'E-post on kohustuslik',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Vigane e-posti aadress',
                        },
                      })}
                      id="email"
                      type="email"
                      style={styles.input}
                      placeholder="sinu@email.ee"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <span id="email-error" style={styles.error} role="alert">{errors.email.message}</span>
                    )}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="subject">Teema *</label>
                    <select
                      {...register('subject', { required: 'Vali teema' })}
                      id="subject"
                      style={styles.select}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                    >
                      <option value="">Vali teema</option>
                      <option value="Küsimus">Küsimus</option>
                      <option value="Tagasiside">Tagasiside</option>
                      <option value="Koostöö">Koostöö</option>
                      <option value="Muu">Muu</option>
                    </select>
                    {errors.subject && (
                      <span id="subject-error" style={styles.error} role="alert">{errors.subject.message}</span>
                    )}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="message">Sõnum *</label>
                    <textarea
                      {...register('message', { required: 'Sõnum on kohustuslik' })}
                      id="message"
                      style={styles.textarea}
                      placeholder="Kirjuta oma sõnum siia..."
                      rows={6}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <span id="message-error" style={styles.error} role="alert">{errors.message.message}</span>
                    )}
                  </div>

                  {submitError && (
                    <div style={styles.errorMessage} role="alert">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>{submitError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      ...styles.submitBtn,
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saadan...' : 'Saada sõnum'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div style={styles.infoCard}>
              <h2 style={styles.infoTitle}>Kontaktandmed</h2>

              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h4 style={styles.infoLabel}>E-post</h4>
                  <a
                    href="mailto:emmaleena.niitvahi@gmail.com"
                    style={styles.infoValue}
                  >
                    emmaleena.niitvahi@gmail.com
                  </a>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <div>
                  <h4 style={styles.infoLabel}>Instagram</h4>
                  <a
                    href="https://www.instagram.com/emmayanera/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.infoValue}
                  >
                    @emmayanera
                  </a>
                </div>
              </div>

              <div style={styles.socialSection}>
                <h4 style={styles.socialTitle}>Jälgi mind</h4>
                <a
                  href="https://www.instagram.com/emmayanera/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialLink}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Connect Section */}
      <SocialConnect />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    backgroundColor: 'var(--color-background-alt)',
    padding: 'var(--space-12) 0',
    textAlign: 'center',
  },
  headerContent: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 var(--space-6)',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-4xl)',
    fontWeight: 500,
    margin: 0,
  },
  section: {
    padding: 'var(--space-16) 0',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 var(--space-6)',
  },
  intro: {
    maxWidth: '700px',
    margin: '0 auto var(--space-12)',
    textAlign: 'center',
  },
  introText: {
    fontSize: 'var(--text-lg)',
    color: 'var(--color-text-light)',
    lineHeight: 1.7,
    marginBottom: 'var(--space-4)',
  },
  introHighlight: {
    fontFamily: 'var(--font-heading)',
    fontStyle: 'italic',
    fontSize: 'var(--text-xl)',
    color: 'var(--color-primary)',
    margin: 0,
  },
  contactImageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 'var(--space-8)',
  },
  contactImage: {
    maxWidth: '100%',
    maxHeight: '400px',
    objectFit: 'contain',
    borderRadius: 'var(--radius-lg)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 'var(--space-8)',
    alignItems: 'start',
  },
  formCard: {
    backgroundColor: 'var(--color-white)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-8)',
    boxShadow: 'var(--shadow-sm)',
  },
  formTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-2xl)',
    fontWeight: 500,
    marginBottom: 'var(--space-6)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-4)',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: 'var(--text-sm)',
    fontWeight: 500,
    marginBottom: 'var(--space-2)',
  },
  input: {
    padding: 'var(--space-3) var(--space-4)',
    fontSize: 'var(--text-base)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-background)',
  },
  select: {
    padding: 'var(--space-3) var(--space-4)',
    fontSize: 'var(--text-base)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-background)',
    cursor: 'pointer',
  },
  textarea: {
    padding: 'var(--space-3) var(--space-4)',
    fontSize: 'var(--text-base)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-background)',
    resize: 'vertical',
    minHeight: '150px',
  },
  error: {
    fontSize: 'var(--text-xs)',
    color: 'var(--color-error)',
    marginTop: 'var(--space-1)',
  },
  submitBtn: {
    marginTop: 'var(--space-4)',
    alignSelf: 'flex-start',
  },
  errorMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    padding: 'var(--space-3) var(--space-4)',
    backgroundColor: '#FEF2F2',
    color: 'var(--color-error)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--text-sm)',
  },
  success: {
    textAlign: 'center',
    padding: 'var(--space-8)',
  },
  successTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-xl)',
    marginTop: 'var(--space-4)',
    marginBottom: 'var(--space-2)',
  },
  successText: {
    color: 'var(--color-text-light)',
    margin: 0,
  },
  infoCard: {
    backgroundColor: 'var(--color-background-alt)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-8)',
  },
  infoTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-2xl)',
    fontWeight: 500,
    marginBottom: 'var(--space-6)',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--space-4)',
    marginBottom: 'var(--space-6)',
  },
  infoIcon: {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-white)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-primary)',
  },
  infoLabel: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-muted)',
    margin: '0 0 var(--space-1) 0',
  },
  infoValue: {
    color: 'var(--color-text)',
    textDecoration: 'none',
    fontWeight: 500,
  },
  socialSection: {
    marginTop: 'var(--space-8)',
    paddingTop: 'var(--space-6)',
    borderTop: '1px solid var(--color-border)',
  },
  socialTitle: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-muted)',
    marginBottom: 'var(--space-4)',
  },
  socialLink: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    backgroundColor: 'var(--color-white)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-primary)',
    transition: 'background-color var(--transition-fast)',
  },
};

// Responsive styles
const responsiveStyles = `
  @media (max-width: 768px) {
    .contact-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = responsiveStyles;
  document.head.appendChild(style);
}

export default Contact;
