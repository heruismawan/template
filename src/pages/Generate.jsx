import React, { useState, useEffect, useRef } from 'react';
import { Copy, FileText, CheckCircle2, Search, ChevronDown } from 'lucide-react';
import { formatRupiah } from '../utils/formatRupiah';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_TEMPLATE_INTER, DEFAULT_TEMPLATE_IBOX } from './FormatEditor';

export function Generate({ products }) {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [batteryHealth, setBatteryHealth] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);
  
  const [templateInter] = useLocalStorage('generate_template_inter', DEFAULT_TEMPLATE_INTER);
  const [templateIbox] = useLocalStorage('generate_template_ibox', DEFAULT_TEMPLATE_IBOX);
  const [notes, setNotes] = useLocalStorage('iphone_notes', '');

  // States for searchable dropdown
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Set default product when products load
  useEffect(() => {
    if (products.length > 0 && !selectedProductId) {
      const defaultProduct = products[0];
      setSelectedProductId(defaultProduct.id);
      setSearchQuery(defaultProduct.name);
    }
  }, [products, selectedProductId]);

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        if (selectedProduct) {
          setSearchQuery(selectedProduct.name);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedProduct]);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateDescription = () => {
    if (!selectedProduct) {
      alert("Silakan pilih produk terlebih dahulu!");
      return;
    }
    if (!batteryHealth) {
      alert("Masukkan Battery Health terlebih dahulu!");
      return;
    }

    const isIbox = selectedProduct.name.toLowerCase().includes('ibox');

    let result = isIbox ? templateIbox : templateInter;
    result = result.replace(/\[NAMA_PRODUK\]/g, selectedProduct.name);
    result = result.replace(/\[HARGA\]/g, formatRupiah(selectedProduct.price));
    result = result.replace(/\[BH\]/g, batteryHealth);

    setGeneratedText(result);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 transition-all duration-500">
      <div className="flex-1 space-y-6 min-w-0">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary">
            Generate Deskripsi
          </h2>
        </div>

        <div className="space-y-4">
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-semibold mb-1.5 text-foreground">Pilih Produk</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-muted-foreground" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => {
                  setSearchQuery('');
                  setIsDropdownOpen(true);
                }}

                className="w-full pl-11 pr-10 py-3 rounded-xl border border-border bg-white dark:bg-white/5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300 shadow-sm text-foreground placeholder:text-muted-foreground/50"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-muted-foreground transition-transform duration-300" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </div>
            </div>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-card text-card-foreground border border-border rounded-xl shadow-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setSearchQuery(product.name);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-secondary/80 transition-colors first:rounded-t-xl last:rounded-b-xl focus:bg-secondary focus:outline-none border-b border-border/40 last:border-0 flex justify-between items-center"
                    >
                      <span className="font-medium text-foreground">{product.name}</span>
                      <span className="text-sm font-semibold text-primary">{formatRupiah(product.price)}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-6 text-sm text-muted-foreground text-center">
                    Produk tidak ditemukan
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1.5 text-foreground">Battery Health (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Contoh: 93"
                value={batteryHealth}
                onChange={(e) => setBatteryHealth(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white dark:bg-white/5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300 shadow-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1.5 text-foreground">Harga</label>
              <input
                type="text"
                readOnly
                value={selectedProduct ? formatRupiah(selectedProduct.price) : ''}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white/60 dark:bg-white/10 text-muted-foreground cursor-not-allowed outline-none shadow-sm"
              />
            </div>
          </div>

          <button
            onClick={generateDescription}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 active:scale-95 mt-4"
          >
            <FileText size={20} />
            Generate
          </button>
        </div>

        {generatedText && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-foreground">Hasil Deskripsi</label>
              <button
                onClick={copyToClipboard}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${copied
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-secondary text-secondary-foreground hover:bg-border'
                  }`}
              >
                {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                {copied ? 'Tersalin!' : 'Copy'}
              </button>
            </div>
            <div className="relative group">
              <textarea
                readOnly
                value={generatedText}
                rows={15}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white dark:bg-white/5 resize-none outline-none font-mono text-sm shadow-sm"
              />
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:flex w-[280px] flex-col border-l border-border/50 pl-8 max-h-[600px] shrink-0">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-semibold text-foreground">Review Catatan</label>
        </div>
        <div className="flex-1 w-full overflow-y-auto text-sm text-foreground whitespace-pre-wrap pr-2 custom-scrollbar">
          {notes ? notes : <span className="text-muted-foreground/50 italic">Belum ada catatan yang disimpan...</span>}
        </div>
      </div>
    </div>
  );
}
