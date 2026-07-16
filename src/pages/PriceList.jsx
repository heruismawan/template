import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Search } from 'lucide-react';
import { formatRupiah } from '../utils/formatRupiah';

export function PriceList({ products, setProducts }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');

  const handleAdd = () => {
    if (!newName || !newPrice) return;
    const newProduct = {
      id: Date.now().toString(),
      name: newName,
      price: parseInt(newPrice, 10),
    };
    setProducts([...products, newProduct]);
    setNewName('');
    setNewPrice('');
    setIsAdding(false);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(product.price.toString());
  };

  const handleSaveEdit = (id) => {
    if (!editName || !editPrice) return;
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, name: editName, price: parseInt(editPrice, 10) } : p
      )
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus produk ini?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const isIbox = p.name.toLowerCase().includes('ibox');
    if (filterType === 'ibox' && !isIbox) return false;
    if (filterType === 'inter' && isIbox) return false;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-primary">
            Daftar Harga
          </h2>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`p-3 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center hover:scale-105 active:scale-95 ${
            isAdding ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'
          }`}
        >
          {isAdding ? <X size={20} /> : <Plus size={20} />}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white dark:bg-white/5 border border-border shadow-sm p-4 rounded-xl space-y-4 mb-6 animate-in fade-in slide-in-from-top-4">
          <h3 className="font-semibold text-foreground">Tambah Produk Baru</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nama Produk"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-border bg-white dark:bg-white/5 outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
            <input
              type="number"
              placeholder="Harga (Rp)"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-border bg-white dark:bg-white/5 outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
          </div>
          <button
            onClick={handleAdd}
            className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold hover:shadow-md transition-all"
          >
            Simpan
          </button>
        </div>
      )}

      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all duration-300 shadow-sm text-foreground placeholder:text-muted-foreground/50"
          />
        </div>
        <div className="flex gap-2 p-1 bg-secondary/50 rounded-xl border border-border/50">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${filterType === 'all' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Semua
          </button>
          <button
            onClick={() => setFilterType('inter')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${filterType === 'inter' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 shadow' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Inter
          </button>
          <button
            onClick={() => setFilterType('ibox')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${filterType === 'ibox' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 shadow' : 'text-muted-foreground hover:text-foreground'}`}
          >
            iBox
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary/80 text-secondary-foreground text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Produk</th>
              <th className="p-4 font-semibold">Harga</th>
              <th className="p-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white dark:bg-white/5">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-8 text-center text-muted-foreground">
                  {products.length === 0 ? 'Belum ada produk.' : 'Produk tidak ditemukan.'}
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    {editingId === product.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-md border border-border bg-white dark:bg-white/5 outline-none focus:ring-1 focus:ring-primary text-sm shadow-sm"
                      />
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-foreground">{product.name}</span>
                        {product.name.toLowerCase().includes('ibox') ? (
                          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 rounded-full border border-red-200 dark:border-red-500/30">iBox</span>
                        ) : (
                          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-500/30">Inter</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    {editingId === product.id ? (
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-md border border-border bg-white dark:bg-white/5 outline-none focus:ring-1 focus:ring-primary text-sm shadow-sm"
                      />
                    ) : (
                      <span className="text-muted-foreground">{formatRupiah(product.price)}</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {editingId === product.id ? (
                        <>
                          <button
                            onClick={() => handleSaveEdit(product.id)}
                            className="p-1.5 text-green-600 hover:bg-green-100 rounded-md transition-colors"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
