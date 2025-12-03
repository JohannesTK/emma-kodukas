import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import SocialConnect from '../components/SocialConnect';
import { filterProducts, categoryLabels, type Product } from '../data/products';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<Product['category'] | ''>('');

  const categories = Object.entries(categoryLabels) as [Product['category'], string][];

  const filteredProducts = useMemo(() => {
    return filterProducts(selectedCategory || undefined);
  }, [selectedCategory]);

  return (
    <div style={styles.page}>
      {/* Header */}
      <section style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Pood</h1>
          <p style={styles.subtitle}>
            Käsitsi valmistatud tervislikud hõrgutised ja e-kokaraamatud
          </p>
        </div>
      </section>

      {/* Categories */}
      <section style={styles.categories}>
        <div style={styles.container}>
          <div style={styles.categoryTabs}>
            <button
              onClick={() => setSelectedCategory('')}
              style={{
                ...styles.categoryTab,
                backgroundColor: selectedCategory === '' ? 'var(--color-primary)' : 'transparent',
                color: selectedCategory === '' ? 'var(--color-white)' : 'var(--color-text)',
              }}
            >
              Kõik tooted
            </button>
            {categories.map(([value, label]) => (
              <button
                key={value}
                onClick={() => setSelectedCategory(value)}
                style={{
                  ...styles.categoryTab,
                  backgroundColor:
                    selectedCategory === value ? 'var(--color-primary)' : 'transparent',
                  color:
                    selectedCategory === value ? 'var(--color-white)' : 'var(--color-text)',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section style={styles.products}>
        <div style={styles.container}>
          {filteredProducts.length === 0 ? (
            <div style={styles.noProducts}>
              <p>Selles kategoorias pole veel tooteid.</p>
            </div>
          ) : (
            <>
              <p style={styles.productCount}>
                {filteredProducts.length} toodet
              </p>
              <div style={styles.grid} className="shop-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Info */}
      <section style={styles.info}>
        <div style={styles.container}>
          <div style={styles.infoGrid} className="shop-info-grid">
            <div style={styles.infoCard}>
              <div style={styles.infoIcon}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
                  <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
                  <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
                  <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                </svg>
              </div>
              <h3 style={styles.infoTitle}>Käsitsi valmistatud</h3>
              <p style={styles.infoText}>
                Kõik tooted on valmistatud hoolikalt käsitsi, kasutades ainult
                kvaliteetseid koostisosi.
              </p>
            </div>

            <div style={styles.infoCard}>
              <div style={styles.infoIcon}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 style={styles.infoTitle}>Tervislikud valikud</h3>
              <p style={styles.infoText}>
                Ilma lisatud suhkruta, gluteenivabad ja valmistatud armastusega.
              </p>
            </div>

            <div style={styles.infoCard}>
              <div style={styles.infoIcon}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3 style={styles.infoTitle}>Kohaletoimetamine</h3>
              <p style={styles.infoText}>
                Lepime kohaletoimetamise üksikasjad kokku peale tellimust.
              </p>
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
  page: {
    paddingBottom: 'var(--space-16)',
  },
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
    margin: '0 0 var(--space-3) 0',
  },
  subtitle: {
    fontSize: 'var(--text-lg)',
    color: 'var(--color-text-light)',
    margin: 0,
  },
  categories: {
    padding: 'var(--space-8) 0',
    borderBottom: '1px solid var(--color-border)',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 var(--space-6)',
  },
  categoryTabs: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 'var(--space-2)',
  },
  categoryTab: {
    padding: 'var(--space-2) var(--space-5)',
    fontSize: 'var(--text-sm)',
    fontWeight: 500,
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-full)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
  },
  products: {
    padding: 'var(--space-12) 0',
  },
  productCount: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-muted)',
    marginBottom: 'var(--space-6)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'var(--space-6)',
  },
  noProducts: {
    textAlign: 'center',
    padding: 'var(--space-12)',
    color: 'var(--color-text-muted)',
  },
  info: {
    padding: 'var(--space-12) 0',
    backgroundColor: 'var(--color-background-alt)',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--space-8)',
  },
  infoCard: {
    textAlign: 'center',
    padding: 'var(--space-6)',
  },
  infoIcon: {
    width: '64px',
    height: '64px',
    margin: '0 auto var(--space-4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-white)',
    borderRadius: '50%',
    color: 'var(--color-primary)',
  },
  infoTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-lg)',
    fontWeight: 500,
    marginBottom: 'var(--space-2)',
  },
  infoText: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-light)',
    margin: 0,
  },
};

// Responsive styles
const responsiveStyles = `
  @media (max-width: 1024px) {
    .shop-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }
  @media (max-width: 768px) {
    .shop-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    .shop-info-grid {
      grid-template-columns: 1fr !important;
    }
  }
  @media (max-width: 480px) {
    .shop-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = responsiveStyles;
  document.head.appendChild(style);
}

export default Shop;
