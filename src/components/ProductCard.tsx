import { Link } from 'react-router-dom';
import type { Product } from '../data/products';
import { dietaryTagLabels, categoryLabels } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.inStock) {
      addToCart(product, 1);
    }
  };

  return (
    <Link to={`/pood/${product.id}`} style={styles.card} className="product-card">
      <div style={styles.imageWrapper}>
        <img src={product.images[0]} alt={product.name} style={styles.image} loading="lazy" />
        <span style={styles.category}>{categoryLabels[product.category]}</span>
        {!product.inStock && <span style={styles.outOfStock}>Otsas</span>}
      </div>
      <div style={styles.content}>
        <h3 style={styles.name}>{product.name}</h3>
        {product.weight && <span style={styles.weight}>{product.weight}</span>}
        {product.dietaryTags && product.dietaryTags.length > 0 && (
          <div style={styles.tags}>
            {product.dietaryTags.slice(0, 3).map((tag) => (
              <span key={tag} style={styles.tag}>
                {dietaryTagLabels[tag]}
              </span>
            ))}
            {product.dietaryTags.length > 3 && (
              <span style={styles.tagMore}>+{product.dietaryTags.length - 3}</span>
            )}
          </div>
        )}
        <div style={styles.footer}>
          <span style={styles.price}>{product.price.toFixed(2)}€</span>
          <button
            onClick={handleAddToCart}
            style={{
              ...styles.addButton,
              opacity: product.inStock ? 1 : 0.5,
              cursor: product.inStock ? 'pointer' : 'not-allowed',
            }}
            disabled={!product.inStock}
            aria-label={product.inStock ? 'Lisa ostukorvi' : 'Toode on otsas'}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: 'block',
    backgroundColor: 'var(--color-white)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    textDecoration: 'none',
    boxShadow: 'var(--shadow-sm)',
    transition: 'transform var(--transition-base), box-shadow var(--transition-base)',
  },
  imageWrapper: {
    position: 'relative',
    aspectRatio: '1/1',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform var(--transition-slow)',
  },
  category: {
    position: 'absolute',
    top: 'var(--space-3)',
    left: 'var(--space-3)',
    padding: 'var(--space-1) var(--space-3)',
    backgroundColor: 'var(--color-white)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--text-xs)',
    fontWeight: 500,
    color: 'var(--color-text-light)',
    textTransform: 'lowercase',
    letterSpacing: '0.5px',
  },
  outOfStock: {
    position: 'absolute',
    top: 'var(--space-3)',
    right: 'var(--space-3)',
    padding: 'var(--space-1) var(--space-3)',
    backgroundColor: 'var(--color-text)',
    color: 'var(--color-white)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--text-xs)',
    fontWeight: 500,
  },
  content: {
    padding: 'var(--space-4)',
  },
  name: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-base)',
    fontWeight: 500,
    color: 'var(--color-text)',
    margin: '0 0 var(--space-1) 0',
    lineHeight: 1.3,
  },
  weight: {
    fontSize: 'var(--text-xs)',
    color: 'var(--color-text-muted)',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-1)',
    marginTop: 'var(--space-2)',
  },
  tag: {
    fontSize: '10px',
    padding: '2px 6px',
    backgroundColor: 'var(--color-background-alt)',
    color: 'var(--color-text-light)',
    borderRadius: 'var(--radius-sm)',
    whiteSpace: 'nowrap',
  },
  tagMore: {
    fontSize: '10px',
    padding: '2px 6px',
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    borderRadius: 'var(--radius-sm)',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'var(--space-3)',
  },
  price: {
    fontSize: 'var(--text-lg)',
    fontWeight: 600,
    color: 'var(--color-primary)',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color var(--transition-fast)',
  },
};

// Add hover effect via CSS
const hoverStyles = `
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  .product-card:hover img {
    transform: scale(1.05);
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = hoverStyles;
  document.head.appendChild(style);
}

export default ProductCard;
