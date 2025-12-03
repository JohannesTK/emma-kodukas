const instagramPosts = [
  { id: 1, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80', alt: 'Tervislik toidukaust' },
  { id: 2, image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80', alt: 'Värske hommikusöök' },
  { id: 3, image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&q=80', alt: 'Maitsev salat' },
  { id: 4, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', alt: 'Tervislik eine' },
  { id: 5, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80', alt: 'Värviline salat' },
  { id: 6, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80', alt: 'Magustoit' },
];

const SocialConnect = () => {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Separator Line */}
        <div style={styles.separator} />

        {/* Heading */}
        <h2 style={styles.heading}>jälgi ja ühenda</h2>

        {/* Social Icons Row */}
        <div style={styles.socialIcons}>
          <a
            href="https://www.instagram.com/emmayanera/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialLink}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span style={styles.socialLabel}>INSTAGRAM</span>
          </a>
          <a
            href="mailto:emmaleena.niitvahi@gmail.com"
            style={styles.socialLink}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span style={styles.socialLabel}>EMAIL</span>
          </a>
        </div>

        {/* Profile Section */}
        <div style={styles.profileSection}>
          <a
            href="https://www.instagram.com/emmayanera/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.profileLink}
          >
            <img
              src="/images/1.jpeg"
              alt="Emma-Leena"
              style={styles.avatar}
            />
            <span style={styles.handle}>emmayanera</span>
          </a>
          <p style={styles.bio}>
            Retseptilooja, teefanaatik ja toidunautija. Jagan tervislikke ja maitsvaid retsepte, mis on vabad laktoosist, kaseiinist, munast ja nisujahust.
          </p>
        </div>

        {/* Instagram Grid */}
        <div style={styles.grid} className="social-connect-grid">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/emmayanera/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.gridItem}
              className="social-connect-item"
            >
              <img src={post.image} alt={post.alt} style={styles.gridImage} loading="lazy" />
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <a
          href="https://www.instagram.com/emmayanera/"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.followButton}
          className="social-follow-btn"
        >
          Jälgi Instagramis
        </a>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: 'var(--space-16) 0',
    backgroundColor: 'var(--color-background)',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 var(--space-6)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  separator: {
    width: '100%',
    height: '1px',
    backgroundColor: 'var(--color-border)',
    marginBottom: 'var(--space-10)',
  },
  heading: {
    fontFamily: 'var(--font-heading)',
    fontStyle: 'italic',
    fontSize: 'var(--text-2xl)',
    fontWeight: 400,
    color: 'var(--color-text)',
    margin: '0 0 var(--space-8) 0',
    textAlign: 'center',
  },
  socialIcons: {
    display: 'flex',
    gap: 'var(--space-10)',
    marginBottom: 'var(--space-10)',
  },
  socialLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-2)',
    color: 'var(--color-text)',
    textDecoration: 'none',
    transition: 'color var(--transition-fast)',
  },
  socialLabel: {
    fontSize: 'var(--text-xs)',
    fontWeight: 500,
    letterSpacing: '1.5px',
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 'var(--space-8)',
    textAlign: 'center',
  },
  profileLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'var(--color-text)',
    marginBottom: 'var(--space-3)',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: 'var(--space-2)',
  },
  handle: {
    fontSize: 'var(--text-sm)',
    fontWeight: 500,
    color: 'var(--color-text)',
  },
  bio: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-light)',
    maxWidth: '400px',
    lineHeight: 1.6,
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: 'var(--space-2)',
    width: '100%',
    marginBottom: 'var(--space-8)',
  },
  gridItem: {
    aspectRatio: '1/1',
    overflow: 'hidden',
    display: 'block',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform var(--transition-base), opacity var(--transition-base)',
  },
  followButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-3) var(--space-8)',
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    textDecoration: 'none',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--text-sm)',
    fontWeight: 500,
    transition: 'background-color var(--transition-fast)',
  },
};

// Add hover effects via CSS
const hoverStyles = `
  .social-connect-item:hover img {
    transform: scale(1.05);
    opacity: 0.9;
  }
  .social-follow-btn:hover {
    background-color: var(--color-primary-dark, #7a4f26);
  }
  @media (max-width: 768px) {
    .social-connect-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }
  @media (max-width: 480px) {
    .social-connect-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = hoverStyles;
  document.head.appendChild(style);
}

export default SocialConnect;
