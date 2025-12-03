const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
    alt: 'Tervislik toidukaust',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80',
    alt: 'Värske hommikusöök',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&q=80',
    alt: 'Maitsev salat',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
    alt: 'Tervislik eine',
  },
];

const InstagramFeed = () => {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Jälgi mind Instagramis</h2>
          <a
            href="https://www.instagram.com/emmayanera/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.handle}
          >
            @emmayanera
          </a>
        </div>

        <div style={styles.grid} className="instagram-grid">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/emmayanera/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.post}
              className="instagram-post"
              aria-label={`Instagram: ${post.alt}`}
            >
              <img src={post.image} alt={post.alt} style={styles.image} loading="lazy" />
              <div style={styles.overlay} className="instagram-overlay">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: 'var(--space-16) 0',
    backgroundColor: 'var(--color-background-alt)',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 var(--space-6)',
  },
  header: {
    textAlign: 'center',
    marginBottom: 'var(--space-8)',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-2xl)',
    fontWeight: 500,
    margin: '0 0 var(--space-2) 0',
  },
  handle: {
    color: 'var(--color-primary)',
    textDecoration: 'none',
    fontSize: 'var(--text-base)',
    fontWeight: 500,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'var(--space-4)',
  },
  post: {
    position: 'relative',
    aspectRatio: '1/1',
    overflow: 'hidden',
    borderRadius: 'var(--radius-md)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform var(--transition-slow)',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity var(--transition-base)',
  },
};

// Add hover effect via CSS
const hoverStyles = `
  .instagram-post:hover img {
    transform: scale(1.1);
  }
  .instagram-post:hover .instagram-overlay {
    opacity: 1;
  }
  @media (max-width: 768px) {
    .instagram-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = hoverStyles;
  document.head.appendChild(style);
}

export default InstagramFeed;
