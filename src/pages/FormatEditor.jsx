import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { RefreshCcw, Save, CheckCircle2 } from 'lucide-react';

export const DEFAULT_TEMPLATE = `Bismillah [NAMA_PRODUK][LABEL_ALL_OPERATOR]

💰 Harga [HARGA] Nego

Mulus Terawat, Full Normal

DETAIL BARANG:

- BH [BH]%[LABEL_SIM_LOCK]
- FULLSET
- Orian semua
- Kamera D/B Jernih Aman
- Face ID & True Tone ON
- Siap garansi
- Bisa Kredit

📍 COD Kota Malang

Minat WA/DM:
📞 https://wa.me/6281348831975`;

export function FormatEditor() {
  const [template, setTemplate] = useLocalStorage('generate_template', DEFAULT_TEMPLATE);
  const [tempValue, setTempValue] = useState(template);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setTemplate(tempValue);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Yakin ingin mengembalikan template ke bentuk semula (default)?')) {
      setTempValue(DEFAULT_TEMPLATE);
      setTemplate(DEFAULT_TEMPLATE);
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full min-h-[60vh]">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-primary">
          Edit Format
        </h2>
        <p className="text-muted-foreground mt-2">
          Sesuaikan teks hasil generate dengan bahasa Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        <div className="md:col-span-2 flex flex-col">
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full flex-1 min-h-[400px] p-4 rounded-xl border border-border bg-white dark:bg-white/5 focus:ring-2 focus:ring-primary outline-none transition-all duration-300 resize-none text-sm font-mono shadow-sm"
            placeholder="Ketik format template di sini..."
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 active:scale-95"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 size={18} />
                  Tersimpan!
                </>
              ) : (
                <>
                  <Save size={18} />
                  Simpan Perubahan
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-bold hover:bg-secondary/80 transition-all duration-300 active:scale-95"
            >
              <RefreshCcw size={18} />
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-secondary/20">
            <h3 className="font-bold text-foreground mb-3 border-b border-border pb-2">Panduan Variabel</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Gunakan kode di bawah ini di dalam template. Saat generate, kode akan otomatis diganti dengan aslinya.
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <code className="text-primary font-bold bg-primary/10 px-1 py-0.5 rounded">[NAMA_PRODUK]</code>
                <span className="block text-muted-foreground mt-1 text-xs">Contoh: iPhone 13 Pro 128GB</span>
              </li>
              <li>
                <code className="text-primary font-bold bg-primary/10 px-1 py-0.5 rounded">[HARGA]</code>
                <span className="block text-muted-foreground mt-1 text-xs">Contoh: Rp 10.100.000</span>
              </li>
              <li>
                <code className="text-primary font-bold bg-primary/10 px-1 py-0.5 rounded">[BH]</code>
                <span className="block text-muted-foreground mt-1 text-xs">Contoh: 99</span>
              </li>
              <li>
                <code className="text-primary font-bold bg-primary/10 px-1 py-0.5 rounded">[LABEL_ALL_OPERATOR]</code>
                <span className="block text-muted-foreground mt-1 text-xs">Tulisan " All Operator" jika barang Inter. Kosong jika iBox.</span>
              </li>
              <li>
                <code className="text-primary font-bold bg-primary/10 px-1 py-0.5 rounded">[LABEL_SIM_LOCK]</code>
                <span className="block text-muted-foreground mt-1 text-xs">Tulisan "- Bukan SIM Lock..." jika barang Inter. Kosong jika iBox.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
