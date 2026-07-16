import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Generate } from './pages/Generate';
import { PriceList } from './pages/PriceList';
import { Notes } from './pages/Notes';
import { FormatEditor } from './pages/FormatEditor';
import { useLocalStorage } from './hooks/useLocalStorage';

const DEFAULT_PRODUCTS = [
  { id: '1', name: 'iPhone 11 Basic 64GB', price: 4300000 },
  { id: '2', name: 'iPhone 11 Basic 128GB', price: 4700000 },
  { id: '3', name: 'iPhone 12 Basic 128GB', price: 6200000 },
  { id: '4', name: 'iPhone 13 Basic 128GB', price: 7500000 },
  { id: '5', name: 'iPhone 13 Pro 256GB', price: 10300000 },
];

function App() {
  const [currentView, setCurrentView] = useState('generate');
  const [products, setProducts] = useLocalStorage('iphone_products', DEFAULT_PRODUCTS);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 selection:bg-primary selection:text-primary-foreground">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="max-w-5xl mx-auto transition-all duration-500">
        <div className="glass rounded-3xl p-6 sm:p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
          {currentView === 'generate' && (
            <Generate products={products} />
          )}
          {currentView === 'pricelist' && (
            <PriceList products={products} setProducts={setProducts} />
          )}
          {currentView === 'notes' && (
            <Notes />
          )}
          {currentView === 'format' && (
            <FormatEditor />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
