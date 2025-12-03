import { Link } from 'react-router-dom';
import SocialConnect from '../components/SocialConnect';

const About = () => {
  return (
    <div>
      {/* Introduction with Image */}
      <section style={styles.introSection}>
        <div style={styles.introContainer}>
          <div style={styles.introGrid} className="about-intro-grid">
            <div style={styles.introImage}>
              <img
                src="/images/1.jpeg"
                alt="Emma-Leena Niitvähi"
                style={styles.introImg}
              />
            </div>
            <div style={styles.introContent}>
              <h1 style={styles.title}>Mul on meeletult hea meel, et oled siin!</h1>
              <p style={styles.introText}>
                Siin blogis tegutseb <strong>Emma-Leena Niitvähi</strong> – kunagisest
                suhkrusõltlasest andunud toidunautija, retseptilooja, teefanaatik,
                ning (muuhulgas) UX disainer.
              </p>
              <p style={styles.introText}>
                Minu eesmärk on jagada kõike seda rõõmu, mida toit, toidu valmistamine
                ja toidu nautimine tegelikult endas peidavad. Rõõmu, mis väljendub nii
                sellest saadavas maitseelamuses, tervises kui elujõus. :)
              </p>
              <p style={styles.signature}>Omaenda kogemuste kaudu. Puhtalt ja puhvrita.</p>
              <img
                src="/images/signature.png"
                alt="Emma-Leena"
                style={styles.signatureImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section style={styles.missionSection}>
        <div style={styles.missionContainer}>
          <div style={styles.missionGrid} className="about-mission-grid">
            <div style={styles.missionContent}>
              <h2 style={styles.sectionTitle}>Toidukodu missioon</h2>
              <p style={styles.missionText}>
                Toidukodu on kõike enamat kui täistaimne ja täisväärtuslik kausitäis.
                Ma usun sügavalt sellesse, et meie vaimne ja füüsiline heaolu algab
                palju kaugemalt. See saab alguse tervislikust suhtest toiduga.
              </p>
              <p style={styles.missionText}>
                Minu suurim soov on inspireerida Sind ennast võtma vastutuse oma
                tervise eest. Jagan oma teekonda lootuses, et see võib ka Sinu oma
                innustada. Maailmas on meeletult palju hääli, kes üritavad meile
                öelda, kuidas oma elu elada. Mina sooviksin Sulle lihtsalt meelde
                tuletada, et mitte keegi teine ei tea Sinu vajadusi ja soove
                paremini kui Sa ise.
              </p>
            </div>
            <div style={styles.missionImage}>
              <img
                src="/images/2.png"
                alt="Toidukodu missioon"
                style={styles.missionImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section style={styles.storySection}>
        <div style={styles.missionContainer}>
          <div style={styles.storyGrid} className="about-story-grid">
            <div style={styles.storyImage}>
              <img
                src="/images/3.png"
                alt="Minu lugu"
                style={styles.storyImg}
              />
            </div>
            <div style={styles.storyContent}>
              <h2 style={styles.sectionTitle}>Minu lugu</h2>
              <p style={styles.storyText}>
                Viimase viie aastaga olen läbinud põnevalt künkliku ja õpetliku
                teekonna. Olen õppinud, et tervistav eluviis ei tähenda mitte üksnes
                eluea pikendamist, vaid just selle kvaliteedi parandamist. Oma tervis
                tulekski oma elus esikohale seada, kuid seda ka mitte elu naudingutest
                loobumise nimel.
              </p>
              <p style={styles.storyText}>
                24/7 magusaisu, rasked seedimisprobleemid, süütunne, enesepiitsutamine...
                See oli vaid kübeke sellest, milline nägi välja minu minevik. Suure osa
                oma elust olen olnud kimbatuses erinevate toitumishäirete ja
                eksperimenteerimisega parasjagu moes olevate dieetidega. Õnneks olen
                jõudnud siia, kus olen praegu – õnnelik ja harmooniline suhe toiduga,
                õnnelik suhe iseendaga.
              </p>
              <p style={styles.storyHighlight}>
                Heaolu saab eksisteerida ilma piirangute, kinnisideede ja piitsutamisteta,
                ja just see on minu südameasi – aidata ka teisi sellel teekonnal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Connect Section */}
      <SocialConnect />

      {/* CTA */}
      <section style={styles.ctaSection}>
        <div style={styles.container}>
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaTitle}>Valmis avastama?</h2>
            <p style={styles.ctaText}>
              Tutvu minu retseptidega ja leia uusi lemmikuid oma köögist!
            </p>
            <div style={styles.ctaButtons}>
              <Link to="/retseptid" className="btn btn-primary">
                Avasta retsepte
              </Link>
              <Link to="/kontakt" className="btn btn-secondary">
                Võta ühendust
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  introSection: {
    padding: 'var(--space-16) 0',
  },
  introContainer: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 var(--space-6)',
  },
  introGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--space-12)',
    alignItems: 'center',
  },
  introImage: {
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
  },
  introImg: {
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-xl)',
  },
  introContent: {
    padding: 'var(--space-4)',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-3xl)',
    fontWeight: 500,
    color: 'var(--color-text)',
    marginBottom: 'var(--space-6)',
    lineHeight: 1.2,
  },
  introText: {
    fontSize: 'var(--text-base)',
    color: 'var(--color-text-light)',
    lineHeight: 1.8,
    marginBottom: 'var(--space-4)',
  },
  signature: {
    fontFamily: 'var(--font-heading)',
    fontStyle: 'italic',
    fontSize: 'var(--text-lg)',
    color: 'var(--color-primary)',
    marginTop: 'var(--space-6)',
  },
  signatureImg: {
    maxWidth: '180px',
    height: 'auto',
    marginTop: 'var(--space-4)',
  },
  missionSection: {
    padding: 'var(--space-16) 0',
    backgroundColor: 'var(--color-background-alt)',
  },
  missionContainer: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 var(--space-6)',
  },
  missionGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--space-12)',
    alignItems: 'center',
  },
  missionImage: {
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
  },
  missionImg: {
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: 'var(--radius-xl)',
  },
  missionContent: {
    padding: 'var(--space-4)',
  },
  sectionTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-3xl)',
    fontWeight: 500,
    marginBottom: 'var(--space-6)',
    color: 'var(--color-text)',
  },
  missionText: {
    fontSize: 'var(--text-base)',
    color: 'var(--color-text-light)',
    lineHeight: 1.8,
    marginBottom: 'var(--space-4)',
  },
  storySection: {
    padding: 'var(--space-16) 0',
  },
  storyGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--space-12)',
    alignItems: 'center',
  },
  storyContent: {
    padding: 'var(--space-4)',
  },
  storyText: {
    fontSize: 'var(--text-base)',
    color: 'var(--color-text-light)',
    lineHeight: 1.8,
    marginBottom: 'var(--space-4)',
  },
  storyHighlight: {
    fontSize: 'var(--text-lg)',
    color: 'var(--color-primary)',
    fontWeight: 500,
    lineHeight: 1.7,
    marginTop: 'var(--space-6)',
    fontStyle: 'italic',
  },
  storyImage: {
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
  },
  storyImg: {
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: 'var(--radius-xl)',
  },
  ctaSection: {
    padding: 'var(--space-16) 0',
    backgroundColor: 'var(--color-background-alt)',
  },
  ctaContent: {
    textAlign: 'center',
  },
  ctaTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-3xl)',
    fontWeight: 500,
    marginBottom: 'var(--space-4)',
  },
  ctaText: {
    fontSize: 'var(--text-lg)',
    color: 'var(--color-text-light)',
    marginBottom: 'var(--space-8)',
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'var(--space-4)',
  },
};

// Responsive styles
const responsiveStyles = `
  @media (max-width: 768px) {
    .about-intro-grid,
    .about-mission-grid,
    .about-story-grid {
      grid-template-columns: 1fr !important;
    }
    .about-intro-grid {
      text-align: center;
    }
    /* Mission: text first, then image on mobile */
    .about-mission-grid > div:first-child {
      order: 1;
    }
    .about-mission-grid > div:last-child {
      order: 2;
    }
    /* Story: image first, then text on mobile */
    .about-story-grid > div:first-child {
      order: 1;
    }
    .about-story-grid > div:last-child {
      order: 2;
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = responsiveStyles;
  document.head.appendChild(style);
}

export default About;
