import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  const navLinks = [
    { to: '/', label: 'Avaleht' },
    { to: '/retseptid', label: 'Retseptid' },
    { to: '/pood', label: 'Pood' },
    { to: '/tehiskokk', label: 'Tehiskokk' },
    { to: '/minust', label: 'Minust' },
    { to: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <img src="/images/toidukodu.png" alt="Toidukodu" style={styles.logoImg} />
        </Link>

        <nav style={styles.nav} className="header-nav">
          <ul style={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  style={({ isActive }) => ({
                    ...styles.navLink,
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                  })}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div style={styles.actions}>
          <button
            onClick={openCart}
            style={styles.cartButton}
            aria-label="Ava ostukorv"
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
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && <span style={styles.cartBadge}>{totalItems}</span>}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={styles.mobileMenuButton}
            className="mobile-menu-btn"
            aria-label="Menüü"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav style={styles.mobileNav} className="mobile-nav">
          <ul style={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  style={({ isActive }) => ({
                    ...styles.mobileNavLink,
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                  })}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: 'var(--color-background)',
    borderBottom: '1px solid var(--color-border)',
    zIndex: 1000,
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 var(--space-6)',
    height: 'var(--header-height)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    textDecoration: 'none',
  },
  logoImg: {
    height: '40px',
    width: 'auto',
  },
  nav: {
    display: 'flex',
  },
  navList: {
    display: 'flex',
    gap: 'var(--space-8)',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navLink: {
    textDecoration: 'none',
    fontSize: 'var(--text-base)',
    fontWeight: 500,
    transition: 'color var(--transition-fast)',
    letterSpacing: '0.5px',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-4)',
  },
  cartButton: {
    position: 'relative',
    padding: 'var(--space-2)',
    color: 'var(--color-text)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'color var(--transition-fast)',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileMenuButton: {
    display: 'none',
    padding: 'var(--space-2)',
    color: 'var(--color-text)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  mobileNav: {
    display: 'none',
    backgroundColor: 'var(--color-background)',
    borderBottom: '1px solid var(--color-border)',
    padding: 'var(--space-4) var(--space-6)',
  },
  mobileNavList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  mobileNavLink: {
    display: 'block',
    padding: 'var(--space-3) 0',
    textDecoration: 'none',
    fontSize: 'var(--text-lg)',
    fontWeight: 500,
    borderBottom: '1px solid var(--color-border)',
  },
};

// Add media query styles via CSS
const mediaStyles = `
  @media (max-width: 768px) {
    .header-nav { display: none !important; }
    .mobile-menu-btn { display: block !important; }
    .mobile-nav { display: block !important; }
  }
`;

// Inject media query styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = mediaStyles;
  document.head.appendChild(styleSheet);
}

export default Header;
