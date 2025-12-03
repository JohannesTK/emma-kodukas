import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Tehiskokk from './pages/Tehiskokk';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/minust" element={<About />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/retseptid" element={<Recipes />} />
            <Route path="/retseptid/:id" element={<RecipeDetail />} />
            <Route path="/pood" element={<Shop />} />
            <Route path="/pood/:id" element={<ProductDetail />} />
            <Route path="/tehiskokk" element={<Tehiskokk />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
