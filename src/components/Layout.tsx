import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Cart from './Cart';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div style={styles.layout}>
      <Header />
      <main style={styles.main}>{children}</main>
      <Footer />
      <Cart />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  layout: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
  },
};

export default Layout;
