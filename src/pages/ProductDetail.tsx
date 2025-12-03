import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, categoryLabels, dietaryTagLabels, products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div style={styles.notFound}>
        <h1>Toodet ei leitud</h1>
        <Link to="/pood" className="btn btn-primary">
          Tagasi poodi
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  // Get similar products (same category, excluding current product)
  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={styles.page}>
      {/* Back Link */}
      <div style={styles.container}>
        <Link to="/pood" style={styles.backLink}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Tagasi poodi
        </Link>
      </div>

      {/* Product Content */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.grid} className="product-detail-grid">
            {/* Image */}
            <div style={styles.imageSection} className="product-image-section">
              <div style={styles.mainImage}>
                <img
                  src={product.images[0] || '/images/placeholder.jpg'}
                  alt={product.name}
                  style={styles.image}
                  loading="lazy"
                />
                {!product.inStock && (
                  <span style={styles.outOfStock}>Hetkel otsas</span>
                )}
              </div>
            </div>

            {/* Info */}
            <div style={styles.infoSection}>
              <span style={styles.category}>{categoryLabels[product.category]}</span>
              <h1 style={styles.title}>{product.name}</h1>
              {product.dietaryTags && product.dietaryTags.length > 0 && (
                <div style={styles.dietaryTags}>
                  {product.dietaryTags.map((tag) => (
                    <span key={tag} style={styles.dietaryTag}>
                      {dietaryTagLabels[tag]}
                    </span>
                  ))}
                </div>
              )}
              {product.weight && (
                <span style={styles.weight}>{product.weight}</span>
              )}

              <p style={styles.price}>{product.price.toFixed(2)}€</p>

              <p style={styles.description}>{product.description}</p>

              {/* Quantity & Add to Cart */}
              <div style={styles.actions}>
                <div style={styles.quantity}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={styles.quantityButton}
                    aria-label="Vähenda kogust"
                  >
                    -
                  </button>
                  <span style={styles.quantityValue}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(99, quantity + 1))}
                    style={styles.quantityButton}
                    aria-label="Suurenda kogust"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="btn btn-primary"
                  style={{
                    ...styles.addButton,
                    opacity: product.inStock ? 1 : 0.5,
                    cursor: product.inStock ? 'pointer' : 'not-allowed',
                  }}
                >
                  {product.inStock ? 'Lisa ostukorvi' : 'Otsas'}
                </button>
              </div>

              {/* Ingredients */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div style={styles.ingredients}>
                  <h3 style={styles.ingredientsTitle}>Koostisosad</h3>
                  <p style={styles.ingredientsList}>
                    {product.ingredients.join(', ')}
                  </p>
                </div>
              )}

              {/* Delivery Info */}
              <div style={styles.deliveryInfo}>
                <div style={styles.deliveryItem}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  <span>Kohaletoimetamine kokkuleppel</span>
                </div>
                <div style={styles.deliveryItem}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
                    <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
                    <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                  </svg>
                  <span>Käsitsi valmistatud</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section style={styles.similarSection}>
          <div style={styles.container}>
            <h2 style={styles.similarTitle}>Sarnased tooted</h2>
            <div style={styles.similarGrid} className="similar-products-grid">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    paddingBottom: 'var(--space-16)',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 var(--space-6)',
  },
  notFound: {
    textAlign: 'center',
    padding: 'var(--space-16)',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    color: 'var(--color-text-light)',
    textDecoration: 'none',
    fontSize: 'var(--text-sm)',
    padding: 'var(--space-4) 0',
    transition: 'color var(--transition-fast)',
  },
  section: {
    padding: 'var(--space-8) 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--space-12)',
    alignItems: 'start',
  },
  imageSection: {
    position: 'sticky',
    top: 'calc(var(--header-height) + var(--space-6))',
  },
  mainImage: {
    position: 'relative',
    aspectRatio: '4/3',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    backgroundColor: 'var(--color-background-alt)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  outOfStock: {
    position: 'absolute',
    top: 'var(--space-4)',
    right: 'var(--space-4)',
    padding: 'var(--space-2) var(--space-4)',
    backgroundColor: 'var(--color-text)',
    color: 'var(--color-white)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--text-sm)',
    fontWeight: 500,
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-4)',
  },
  category: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-primary)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 500,
  },
  dietaryTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-2)',
    marginTop: 'var(--space-2)',
  },
  dietaryTag: {
    fontSize: 'var(--text-xs)',
    padding: 'var(--space-1) var(--space-3)',
    backgroundColor: 'var(--color-background-alt)',
    color: 'var(--color-text-light)',
    borderRadius: 'var(--radius-full)',
    whiteSpace: 'nowrap',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-3xl)',
    fontWeight: 500,
    margin: 0,
    lineHeight: 1.2,
  },
  weight: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-muted)',
  },
  price: {
    fontSize: 'var(--text-3xl)',
    fontWeight: 600,
    color: 'var(--color-primary)',
    margin: 'var(--space-4) 0',
  },
  description: {
    fontSize: 'var(--text-base)',
    color: 'var(--color-text-light)',
    lineHeight: 1.7,
    margin: 0,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-4)',
    marginTop: 'var(--space-6)',
  },
  quantity: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-1)',
  },
  quantityButton: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'var(--text-lg)',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--color-text)',
  },
  quantityValue: {
    minWidth: '40px',
    textAlign: 'center',
    fontSize: 'var(--text-lg)',
    fontWeight: 500,
  },
  addButton: {
    flex: 1,
    padding: 'var(--space-4) var(--space-8)',
    fontSize: 'var(--text-base)',
  },
  ingredients: {
    marginTop: 'var(--space-8)',
    padding: 'var(--space-5)',
    backgroundColor: 'var(--color-background-alt)',
    borderRadius: 'var(--radius-md)',
  },
  ingredientsTitle: {
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    color: 'var(--color-text)',
    marginBottom: 'var(--space-2)',
  },
  ingredientsList: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-light)',
    margin: 0,
    lineHeight: 1.6,
  },
  deliveryInfo: {
    marginTop: 'var(--space-6)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
  },
  deliveryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-light)',
  },
  similarSection: {
    padding: 'var(--space-16) 0',
    backgroundColor: 'var(--color-background-alt)',
    marginTop: 'var(--space-8)',
  },
  similarTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-2xl)',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: 'var(--space-8)',
  },
  similarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'var(--space-6)',
  },
};

// Responsive styles
const responsiveStyles = `
  @media (max-width: 1024px) {
    .similar-products-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }
  @media (max-width: 768px) {
    .product-detail-grid {
      grid-template-columns: 1fr !important;
      gap: var(--space-8) !important;
    }
    .product-image-section {
      position: static !important;
    }
    .similar-products-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  @media (max-width: 480px) {
    .similar-products-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = responsiveStyles;
  document.head.appendChild(style);
}

export default ProductDetail;
