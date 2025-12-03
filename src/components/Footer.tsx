import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid} className="footer-grid">
          {/* Brand */}
          <div style={styles.section}>
            <Link to="/" style={styles.logo}>
              <img src="/images/toidukodu.png" alt="Toidukodu" style={styles.logoImg} />
            </Link>
            <p style={styles.tagline}>
              Tervislikud ja maitsvad retseptid, mis toetavad Sinu heaolu.
            </p>
          </div>

          {/* Navigation */}
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Navigeeri</h4>
            <ul style={styles.linkList}>
              <li>
                <Link to="/" style={styles.link}>Avaleht</Link>
              </li>
              <li>
                <Link to="/retseptid" style={styles.link}>Retseptid</Link>
              </li>
              <li>
                <Link to="/pood" style={styles.link}>Pood</Link>
              </li>
              <li>
                <Link to="/minust" style={styles.link}>Minust</Link>
              </li>
              <li>
                <Link to="/kontakt" style={styles.link}>Kontakt</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Retseptid</h4>
            <ul style={styles.linkList}>
              <li>
                <Link to="/retseptid?category=breakfast" style={styles.link}>Hommikusöök</Link>
              </li>
              <li>
                <Link to="/retseptid?category=main" style={styles.link}>Põhiroad</Link>
              </li>
              <li>
                <Link to="/retseptid?category=dessert" style={styles.link}>Magustoidud</Link>
              </li>
              <li>
                <Link to="/retseptid?category=snack" style={styles.link}>Suupisted</Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Jälgi mind</h4>
            <div style={styles.social}>
              <a
                href="https://www.instagram.com/emmayanera/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialLink}
                aria-label="Instagram"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
            <p style={styles.email}>
              <a href="mailto:emmaleena.niitvahi@gmail.com" style={styles.link}>
                emmaleena.niitvahi@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div style={styles.bottom}>
          <p style={styles.copyright}>
            &copy; {currentYear} Toidukodu. Kõik õigused kaitstud.
          </p>
        </div>
      </div>
    </footer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: 'var(--color-background-alt)',
    borderTop: '1px solid var(--color-border)',
    marginTop: 'auto',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: 'var(--space-12) var(--space-6)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'var(--space-8)',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-4)',
  },
  logo: {
    textDecoration: 'none',
  },
  logoImg: {
    height: '32px',
    width: 'auto',
  },
  tagline: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-light)',
    lineHeight: 1.6,
    margin: 0,
  },
  sectionTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-base)',
    fontWeight: 600,
    color: 'var(--color-text)',
    margin: 0,
  },
  linkList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)',
  },
  link: {
    color: 'var(--color-text-light)',
    textDecoration: 'none',
    fontSize: 'var(--text-sm)',
    transition: 'color var(--transition-fast)',
  },
  social: {
    display: 'flex',
    gap: 'var(--space-3)',
  },
  socialLink: {
    color: 'var(--color-text)',
    transition: 'color var(--transition-fast)',
  },
  email: {
    margin: 0,
  },
  bottom: {
    borderTop: '1px solid var(--color-border)',
    marginTop: 'var(--space-8)',
    paddingTop: 'var(--space-6)',
    textAlign: 'center',
  },
  copyright: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-muted)',
    margin: 0,
  },
};

// Add responsive styles
const responsiveStyles = `
  @media (max-width: 768px) {
    footer .footer-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  @media (max-width: 480px) {
    footer .footer-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = responsiveStyles;
  document.head.appendChild(style);
}

export default Footer;
