import type { Recipe } from '../data/recipes';
import { categoryLabels, dietaryTagLabels } from '../data/recipes';

interface RecipeFiltersProps {
  selectedCategory: Recipe['category'] | '';
  selectedTags: Recipe['dietaryTags'][number][];
  searchQuery: string;
  onCategoryChange: (category: Recipe['category'] | '') => void;
  onTagChange: (tag: Recipe['dietaryTags'][number]) => void;
  onSearchChange: (query: string) => void;
}

const RecipeFilters = ({
  selectedCategory,
  selectedTags,
  searchQuery,
  onCategoryChange,
  onTagChange,
  onSearchChange,
}: RecipeFiltersProps) => {
  const categories = Object.entries(categoryLabels) as [Recipe['category'], string][];
  const dietaryTags = Object.entries(dietaryTagLabels) as [
    Recipe['dietaryTags'][number],
    string
  ][];

  return (
    <aside style={styles.sidebar} className="recipe-filters">
      <h2 style={styles.title}>Retsepti indeks</h2>

      {/* Search */}
      <div style={styles.section}>
        <div style={styles.searchWrapper}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={styles.searchIcon}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Otsi retsepte..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={styles.searchInput}
            aria-label="Otsi retsepte"
          />
        </div>
      </div>

      {/* Category */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Retsepti tüüp:</h3>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value as Recipe['category'] | '')}
          style={styles.select}
        >
          <option value="">Kõik retseptid</option>
          {categories.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.divider} />

      {/* Dietary Preferences */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Toitumiseelistused:</h3>
        <div style={styles.checkboxes}>
          {dietaryTags.map(([value, label]) => (
            <label key={value} style={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedTags.includes(value)}
                onChange={() => onTagChange(value)}
                style={styles.checkboxInput}
              />
              <span style={styles.checkmark} />
              <span style={styles.checkboxLabel}>{label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    position: 'sticky',
    top: 'calc(var(--header-height) + var(--space-6))',
    padding: 'var(--space-6)',
    backgroundColor: 'var(--color-white)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-2xl)',
    fontStyle: 'italic',
    fontWeight: 400,
    color: 'var(--color-text)',
    margin: '0 0 var(--space-6) 0',
  },
  section: {
    marginBottom: 'var(--space-5)',
  },
  sectionTitle: {
    fontSize: 'var(--text-sm)',
    fontWeight: 500,
    color: 'var(--color-text)',
    margin: '0 0 var(--space-3) 0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  searchWrapper: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 'var(--space-3)',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--color-text-muted)',
  },
  searchInput: {
    width: '100%',
    padding: 'var(--space-3) var(--space-3) var(--space-3) var(--space-10)',
    fontSize: 'var(--text-sm)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-background)',
  },
  select: {
    width: '100%',
    padding: 'var(--space-3) var(--space-4)',
    fontSize: 'var(--text-sm)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-white)',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238C8480' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right var(--space-3) center',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: 'var(--space-5) 0',
  },
  checkboxes: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    cursor: 'pointer',
  },
  checkboxInput: {
    position: 'absolute',
    opacity: 0,
    cursor: 'pointer',
  },
  checkmark: {
    width: '18px',
    height: '18px',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'var(--color-white)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all var(--transition-fast)',
  },
  checkboxLabel: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-light)',
  },
};

// Add checkbox styling via CSS
const checkboxStyles = `
  .recipe-filters input[type="checkbox"]:checked + span {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }
  .recipe-filters input[type="checkbox"]:checked + span::after {
    content: '';
    width: 5px;
    height: 9px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    position: absolute;
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = checkboxStyles;
  document.head.appendChild(style);
}

export default RecipeFilters;
