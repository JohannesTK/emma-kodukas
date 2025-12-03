import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import ProductCard from '../components/ProductCard';
import NewsletterSignup from '../components/NewsletterSignup';
import InstagramFeed from '../components/InstagramFeed';
import { getFeaturedRecipes } from '../data/recipes';
import { getFeaturedProducts } from '../data/products';

const carouselImages = [
  '/images/main-scroll-1.png',
  '/images/main-scroll-2.png',
  '/images/main-scroll-3.png',
  '/images/main-scroll-4.png',
];

const Home = () => {
  const featuredRecipes = getFeaturedRecipes();
  const featuredProducts = getFeaturedProducts();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section style={styles.hero} className="home-hero">
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Tere tulemast Toidukoju!</h1>
          <p style={styles.heroSubtitle}>
            Tervislikud ja maitsvad retseptid, mis toetavad Sinu heaolu. Kõik vaba
            laktoosist, gluteenist ja rafineeritud suhkrust.
          </p>
          <div style={styles.heroButtons} className="home-hero-buttons">
            <Link to="/retseptid" className="btn btn-primary">
              Avasta retsepte
            </Link>
            <Link to="/minust" className="btn btn-secondary">
              Tutvu minuga
            </Link>
          </div>
        </div>
        <div style={styles.heroImage}>
          <div style={styles.carouselContainer}>
            {carouselImages.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Tervislik toit ${index + 1}`}
                style={{
                  ...styles.heroImg,
                  opacity: index === currentImageIndex ? 1 : 0,
                  position: index === 0 ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  transition: 'opacity 0.8s ease-in-out',
                }}
              />
            ))}
          </div>
          <div style={styles.carouselDots}>
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                style={{
                  ...styles.carouselDot,
                  backgroundColor: index === currentImageIndex
                    ? 'var(--color-primary)'
                    : 'var(--color-white)',
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section style={styles.promiseSection}>
        <div style={styles.promiseContainer}>
          <span style={styles.promiseLabel}>Minu lubadus sulle</span>
          <h2 style={styles.promiseTitle}>Toit, mis hoolib sinust</h2>
          <p style={styles.promiseText}>
            Kõik minu retseptid on hoolikalt välja töötatud, et olla vabad laktoosist,
            kaseiinist, munast, pärmist, nisujahust ja valgest suhkrust. Samas on nad
            pungil valgust, kiudainetest, tervislikest rasvadest, mineraalainetest ja
            antioksüdantidest.
          </p>
          <div style={styles.promiseTags}>
            <span style={styles.promiseTag}>Laktoosivaba</span>
            <span style={styles.promiseTag}>Gluteenivaba</span>
            <span style={styles.promiseTag}>Munavaba</span>
            <span style={styles.promiseTag}>Suhkruvaba</span>
            <span style={styles.promiseTag}>Valgurohke</span>
            <span style={styles.promiseTag}>Kiudainerikas</span>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <div>
              <span style={styles.sectionLabel}>Värskelt köögist</span>
              <h2 style={styles.sectionTitle}>Lemmikretseptid</h2>
            </div>
            <Link to="/retseptid" style={styles.sectionLink}>
              Vaata kõiki retsepte →
            </Link>
          </div>
          <div style={styles.recipeGrid} className="home-recipe-grid">
            {featuredRecipes.slice(0, 4).map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section style={styles.aboutSection}>
        <div style={styles.container}>
          <div style={styles.aboutContent} className="home-about-content">
            <div style={styles.aboutImage} className="home-about-image">
              <img
                src="/images/1.jpeg"
                alt="Emma-Leena"
                style={styles.aboutImg}
              />
            </div>
            <div style={styles.aboutText}>
              <h2 style={styles.aboutTitle}>Hei! Mina olen Emma-Leena</h2>
              <p style={styles.aboutDescription}>
                Mul on siiralt suur rõõm, et oled jõudnud (Toidu)koju! Siit leiad
                retseptid, mis keskendunud nii naudingule kui ka Sinu heaolule,
                mõtisklused toitumisest ja enesehoolitsusest ning jutud
                (maitse)seiklustest ümber maailma. Kõik selleks, et leiaksid
                parema suhte toiduga.
              </p>
              <p style={styles.aboutDescription}>
                Kõik retseptid on muuhulgas vabad laktoosist, kaseiinist, munast,
                pärmist, nisujahust ja valgest suhkrust ning pungil valgust,
                kiudainetest, tervislikest rasvadest, mineraalainetest ja
                antioksüdantidest.
              </p>
              <p style={styles.aboutSignature}>
                Värviliste elamuste ja eneseavastusteni!
              </p>
              <Link to="/minust" className="btn btn-secondary">
                Loe rohkem
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <div>
              <span style={styles.sectionLabel}>Käsitsi valmistatud</span>
              <h2 style={styles.sectionTitle}>Toidukodu pood</h2>
            </div>
            <Link to="/pood" style={styles.sectionLink}>
              Vaata kogu poodi →
            </Link>
          </div>
          <div style={styles.productGrid} className="home-product-grid">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Instagram */}
      <InstagramFeed />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  hero: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--space-12)',
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: 'var(--space-16) var(--space-6)',
    alignItems: 'center',
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-6)',
  },
  heroTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-5xl)',
    fontWeight: 500,
    color: 'var(--color-text)',
    lineHeight: 1.2,
    margin: 0,
  },
  heroSubtitle: {
    fontSize: 'var(--text-lg)',
    color: 'var(--color-text-light)',
    lineHeight: 1.7,
    margin: 0,
  },
  heroButtons: {
    display: 'flex',
    gap: 'var(--space-4)',
    marginTop: 'var(--space-4)',
  },
  heroImage: {
    aspectRatio: '4/3',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    position: 'relative',
  },
  carouselContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  heroImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  carouselDots: {
    position: 'absolute',
    bottom: 'var(--space-4)',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 'var(--space-2)',
    zIndex: 10,
  },
  carouselDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: '2px solid var(--color-white)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    padding: 0,
  },
  promiseSection: {
    padding: 'var(--space-16) 0',
    backgroundColor: 'var(--color-background-alt)',
  },
  promiseContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 var(--space-6)',
    textAlign: 'center',
  },
  promiseLabel: {
    fontFamily: 'var(--font-heading)',
    fontStyle: 'italic',
    fontSize: 'var(--text-lg)',
    color: 'var(--color-primary)',
    display: 'block',
    marginBottom: 'var(--space-4)',
  },
  promiseTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-3xl)',
    fontWeight: 500,
    color: 'var(--color-text)',
    margin: '0 0 var(--space-6) 0',
  },
  promiseText: {
    fontSize: 'var(--text-base)',
    color: 'var(--color-text-light)',
    lineHeight: 1.8,
    margin: '0 0 var(--space-8) 0',
  },
  promiseTags: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 'var(--space-3)',
  },
  promiseTag: {
    padding: 'var(--space-2) var(--space-4)',
    backgroundColor: 'var(--color-accent)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-light)',
    fontWeight: 500,
  },
  section: {
    padding: 'var(--space-16) 0',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 var(--space-6)',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--space-8)',
  },
  sectionLabel: {
    fontFamily: 'var(--font-heading)',
    fontStyle: 'italic',
    fontSize: 'var(--text-lg)',
    color: 'var(--color-primary)',
    display: 'block',
    marginBottom: 'var(--space-2)',
  },
  sectionTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-3xl)',
    fontWeight: 500,
    margin: 0,
  },
  sectionLink: {
    color: 'var(--color-primary)',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: 'var(--text-sm)',
  },
  recipeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'var(--space-6)',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'var(--space-6)',
  },
  aboutSection: {
    padding: 'var(--space-16) 0',
    backgroundColor: 'var(--color-background-alt)',
  },
  aboutContent: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: 'var(--space-12)',
    alignItems: 'center',
  },
  aboutImage: {
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '4px solid var(--color-white)',
    boxShadow: 'var(--shadow-lg)',
  },
  aboutImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  aboutText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-4)',
  },
  aboutTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-3xl)',
    fontWeight: 500,
    margin: 0,
  },
  aboutDescription: {
    fontSize: 'var(--text-base)',
    color: 'var(--color-text-light)',
    lineHeight: 1.7,
    margin: 0,
  },
  aboutSignature: {
    fontFamily: 'var(--font-heading)',
    fontStyle: 'italic',
    fontSize: 'var(--text-lg)',
    color: 'var(--color-primary)',
    margin: 0,
  },
};

// Add responsive styles
const responsiveStyles = `
  @media (max-width: 1024px) {
    .home-recipe-grid, .home-product-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }
  @media (max-width: 768px) {
    .home-hero {
      grid-template-columns: 1fr !important;
      text-align: center;
    }
    .home-hero-buttons {
      justify-content: center;
    }
    .home-recipe-grid, .home-product-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    .home-about-content {
      grid-template-columns: 1fr !important;
      text-align: center;
    }
    .home-about-image {
      margin: 0 auto;
    }
  }
  @media (max-width: 480px) {
    .home-recipe-grid, .home-product-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = responsiveStyles;
  document.head.appendChild(style);
}

export default Home;
