import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import RecipeFilters from '../components/RecipeFilters';
import SocialConnect from '../components/SocialConnect';
import { recipes, filterRecipes, type Recipe } from '../data/recipes';

const Recipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const initialCategory = (searchParams.get('category') as Recipe['category']) || '';
  const [selectedCategory, setSelectedCategory] = useState<Recipe['category'] | ''>(
    initialCategory
  );
  const [selectedTags, setSelectedTags] = useState<Recipe['dietaryTags'][number][]>([]);

  const filteredRecipes = useMemo(() => {
    return filterRecipes(
      selectedCategory || undefined,
      selectedTags.length > 0 ? selectedTags : undefined,
      searchQuery || undefined
    );
  }, [selectedCategory, selectedTags, searchQuery]);

  const handleCategoryChange = (category: Recipe['category'] | '') => {
    setSelectedCategory(category);
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  const handleTagChange = (tag: Recipe['dietaryTags'][number]) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.layout} className="recipes-layout">
          {/* Sidebar */}
          <RecipeFilters
            selectedCategory={selectedCategory}
            selectedTags={selectedTags}
            searchQuery={searchQuery}
            onCategoryChange={handleCategoryChange}
            onTagChange={handleTagChange}
            onSearchChange={setSearchQuery}
          />

          {/* Main Content */}
          <main style={styles.main}>
            {filteredRecipes.length === 0 ? (
              <div style={styles.noResults}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-text-muted)"
                  strokeWidth="1.5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <h3 style={styles.noResultsTitle}>Retsepte ei leitud</h3>
                <p style={styles.noResultsText}>
                  Proovi muuta filtreerimise valikuid või otsingusõna.
                </p>
              </div>
            ) : (
              <>
                <p style={styles.resultCount}>
                  Leitud {filteredRecipes.length} retsepti ({recipes.length} kokku)
                </p>
                <div style={styles.grid} className="recipes-grid">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      {/* Social Connect Section */}
      <SocialConnect />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: 'var(--space-8) 0 var(--space-16)',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 var(--space-6)',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    gap: 'var(--space-8)',
    alignItems: 'start',
  },
  main: {
    minHeight: '400px',
  },
  resultCount: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-muted)',
    marginBottom: 'var(--space-6)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--space-6)',
  },
  noResults: {
    textAlign: 'center',
    padding: 'var(--space-16) 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-4)',
  },
  noResultsTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-xl)',
    margin: 0,
  },
  noResultsText: {
    color: 'var(--color-text-muted)',
    margin: 0,
  },
};

// Responsive styles
const responsiveStyles = `
  @media (max-width: 1024px) {
    .recipes-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  @media (max-width: 768px) {
    .recipes-layout {
      grid-template-columns: 1fr !important;
    }
    .recipes-sidebar {
      position: static !important;
    }
  }
  @media (max-width: 480px) {
    .recipes-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = responsiveStyles;
  document.head.appendChild(style);
}

export default Recipes;
