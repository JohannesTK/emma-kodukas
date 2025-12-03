import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById, categoryLabels, dietaryTagLabels, recipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const recipe = id ? getRecipeById(id) : undefined;
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());

  const toggleIngredient = (ingredientKey: string) => {
    setCheckedIngredients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(ingredientKey)) {
        newSet.delete(ingredientKey);
      } else {
        newSet.add(ingredientKey);
      }
      return newSet;
    });
  };

  if (!recipe) {
    return (
      <div style={styles.notFound}>
        <h1>Retsepti ei leitud</h1>
        <Link to="/retseptid" className="btn btn-primary">
          Tagasi retseptide juurde
        </Link>
      </div>
    );
  }

  const relatedRecipes = recipes
    .filter((r) => r.id !== recipe.id && r.category === recipe.category)
    .slice(0, 3);

  return (
    <div style={styles.page}>
      {/* Back Link */}
      <div style={styles.container}>
        <Link to="/retseptid" style={styles.backLink}>
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
          Tagasi retseptide juurde
        </Link>
      </div>

      {/* Hero */}
      <section style={styles.hero} className="recipe-hero-grid">
        <div style={styles.heroContent}>
          <span style={styles.category}>{categoryLabels[recipe.category]}</span>
          <h1 style={styles.title}>{recipe.title}</h1>
          <p style={styles.description}>{recipe.description}</p>

          <div style={styles.meta}>
            <div style={styles.metaItem}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{recipe.prepTime}</span>
            </div>
            <span style={styles.metaSeparator}>|</span>
            <div style={styles.metaItem}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              <span>{recipe.yield}</span>
            </div>
          </div>

          <div style={styles.tags}>
            {recipe.dietaryTags.map((tag) => (
              <span key={tag} style={styles.tag}>
                {dietaryTagLabels[tag]}
              </span>
            ))}
          </div>
        </div>
        <div style={styles.heroImage}>
          <img src={recipe.image} alt={recipe.title} style={styles.image} />
        </div>
      </section>

      {/* Recipe Content */}
      <section style={styles.content}>
        <div style={styles.contentGrid} className="recipe-content-grid">
          {/* Ingredients */}
          <aside style={styles.ingredients} className="recipe-ingredients">
            <h2 style={styles.sectionTitle}>Koostisosad</h2>
            {recipe.ingredients.map((group, index) => (
              <div key={index} style={styles.ingredientGroup}>
                {group.title && (
                  <h3 style={styles.ingredientGroupTitle}>{group.title}</h3>
                )}
                <ul style={styles.ingredientList}>
                  {group.items.map((item, itemIndex) => {
                    const ingredientKey = `${index}-${itemIndex}`;
                    const isChecked = checkedIngredients.has(ingredientKey);
                    return (
                      <li
                        key={itemIndex}
                        style={styles.ingredientItem}
                        onClick={() => toggleIngredient(ingredientKey)}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleIngredient(ingredientKey)}
                          style={styles.checkbox}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span
                          style={{
                            ...styles.ingredientText,
                            textDecoration: isChecked ? 'line-through' : 'none',
                            opacity: isChecked ? 0.5 : 1,
                          }}
                        >
                          {item}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </aside>

          {/* Instructions */}
          <div style={styles.instructions}>
            <h2 style={styles.sectionTitle}>Valmistamine</h2>
            <ol style={styles.instructionList}>
              {recipe.instructions.map((step, index) => (
                <li key={index} style={styles.instructionItem}>
                  <span style={styles.stepNumber}>{index + 1}</span>
                  <p style={styles.stepText}>{step}</p>
                </li>
              ))}
            </ol>

            {recipe.notes && (
              <div style={styles.notes}>
                <h3 style={styles.notesTitle}>Märkused</h3>
                <p style={styles.notesText}>{recipe.notes}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Recipes */}
      {relatedRecipes.length > 0 && (
        <section style={styles.related}>
          <div style={styles.relatedContainer}>
            <h2 style={styles.relatedTitle}>Seotud retseptid</h2>
            <div style={styles.relatedGrid} className="recipe-related-grid">
              {relatedRecipes.map((r) => (
                <RecipeCard key={r.id} recipe={r} />
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
  hero: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--space-12)',
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 var(--space-6) var(--space-12)',
    alignItems: 'center',
  },
  heroContent: {
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
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-4xl)',
    fontWeight: 500,
    margin: 0,
    lineHeight: 1.2,
  },
  description: {
    fontSize: 'var(--text-lg)',
    color: 'var(--color-text-light)',
    lineHeight: 1.7,
    margin: 0,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-4)',
    marginTop: 'var(--space-4)',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    color: 'var(--color-text-light)',
    fontSize: 'var(--text-sm)',
  },
  metaSeparator: {
    color: 'var(--color-border)',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-2)',
    marginTop: 'var(--space-2)',
  },
  tag: {
    padding: 'var(--space-1) var(--space-3)',
    backgroundColor: 'var(--color-secondary-light)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--text-xs)',
    color: 'var(--color-primary-dark)',
    fontWeight: 500,
  },
  heroImage: {
    aspectRatio: '4/3',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    backgroundColor: 'var(--color-background-alt)',
    padding: 'var(--space-12) 0',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: 'var(--space-12)',
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 var(--space-6)',
    alignItems: 'start',
  },
  ingredients: {
    position: 'sticky',
    top: 'calc(var(--header-height) + var(--space-6))',
    backgroundColor: 'var(--color-white)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-6)',
    boxShadow: 'var(--shadow-sm)',
  },
  sectionTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-xl)',
    fontWeight: 500,
    marginBottom: 'var(--space-6)',
  },
  ingredientGroup: {
    marginBottom: 'var(--space-6)',
  },
  ingredientGroupTitle: {
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    color: 'var(--color-primary)',
    marginBottom: 'var(--space-3)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  ingredientList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  ingredientItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--space-3)',
    padding: 'var(--space-2) 0',
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-light)',
    borderBottom: '1px solid var(--color-border)',
    cursor: 'pointer',
    transition: 'background-color var(--transition-fast)',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    marginTop: '2px',
    flexShrink: 0,
    accentColor: 'var(--color-primary)',
    cursor: 'pointer',
  },
  ingredientText: {
    flex: 1,
    transition: 'opacity var(--transition-fast), text-decoration var(--transition-fast)',
  },
  instructions: {
    backgroundColor: 'var(--color-white)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-8)',
    boxShadow: 'var(--shadow-sm)',
  },
  instructionList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-6)',
  },
  instructionItem: {
    display: 'flex',
    gap: 'var(--space-4)',
  },
  stepNumber: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    borderRadius: '50%',
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    flexShrink: 0,
  },
  stepText: {
    flex: 1,
    fontSize: 'var(--text-base)',
    lineHeight: 1.7,
    color: 'var(--color-text-light)',
    margin: 0,
    paddingTop: '4px',
  },
  notes: {
    marginTop: 'var(--space-8)',
    padding: 'var(--space-5)',
    backgroundColor: 'var(--color-secondary-light)',
    borderRadius: 'var(--radius-md)',
    borderLeft: '4px solid var(--color-primary)',
  },
  notesTitle: {
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    color: 'var(--color-primary-dark)',
    marginBottom: 'var(--space-2)',
  },
  notesText: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-light)',
    lineHeight: 1.6,
    margin: 0,
  },
  related: {
    padding: 'var(--space-16) 0',
  },
  relatedContainer: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 var(--space-6)',
  },
  relatedTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-2xl)',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: 'var(--space-8)',
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--space-6)',
  },
};

// Responsive styles
const responsiveStyles = `
  @media (max-width: 1024px) {
    .recipe-related-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  @media (max-width: 768px) {
    .recipe-hero-grid {
      grid-template-columns: 1fr !important;
      gap: var(--space-6) !important;
    }
    .recipe-hero-grid > div:first-child {
      order: 2;
    }
    .recipe-hero-grid > div:last-child {
      order: 1;
    }
    .recipe-content-grid {
      grid-template-columns: 1fr !important;
    }
    .recipe-ingredients {
      position: static !important;
    }
    .recipe-related-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = responsiveStyles;
  document.head.appendChild(style);
}

export default RecipeDetail;
