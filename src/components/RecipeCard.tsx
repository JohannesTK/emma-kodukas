import { Link } from 'react-router-dom';
import type { Recipe } from '../data/recipes';
import { categoryLabels } from '../data/recipes';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Link to={`/retseptid/${recipe.id}`} style={styles.card} className="recipe-card">
      <div style={styles.imageWrapper}>
        <img src={recipe.image} alt={recipe.title} style={styles.image} loading="lazy" />
        <span style={styles.category}>{categoryLabels[recipe.category]}</span>
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{recipe.title}</h3>
        <p style={styles.description}>{recipe.description}</p>
        <div style={styles.meta}>
          <span style={styles.metaItem}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {recipe.prepTime}
          </span>
          <span style={styles.metaItem}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {recipe.yield}
          </span>
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
    aspectRatio: '4/3',
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
  content: {
    padding: 'var(--space-5)',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-lg)',
    fontWeight: 500,
    color: 'var(--color-text)',
    margin: '0 0 var(--space-2) 0',
    lineHeight: 1.3,
  },
  description: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-light)',
    margin: '0 0 var(--space-4) 0',
    lineHeight: 1.5,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  meta: {
    display: 'flex',
    gap: 'var(--space-4)',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
    fontSize: 'var(--text-xs)',
    color: 'var(--color-text-muted)',
  },
};

// Add hover effect via CSS
const hoverStyles = `
  .recipe-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  .recipe-card:hover img {
    transform: scale(1.05);
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = hoverStyles;
  document.head.appendChild(style);
}

export default RecipeCard;
