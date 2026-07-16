import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { RefreshCcw, Save, CheckCircle2 } from 'lucide-react';

export const DEFAULT_TEMPLATE_INTER = `Bismillah [NAMA_PRODUK] All Operator

💰 Harga [HARGA] Nego

Mulus Terawat, Full Normal

DETAIL BARANG:

- BH [BH]%
- Bukan SIM Lock • Bisa Semua Operator
- FULLSET
- Orian semua
- Kamera D/B Jernih Aman
- Face ID & True Tone ON
- Siap garansi
- Bisa Kredit

📍 COD Kota Malang

Minat WA/DM:
📞 https://wa.me/6281348831975`;

export const DEFAULT_TEMPLATE_IBOX = `Bismillah [NAMA_PRODUK]

💰 Harga [HARGA] Nego

Mulus Terawat, Full Normal

DETAIL BARANG:

- BH [BH]%
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
  const [activeTab, setActiveTab] = useState('inter'); // 'inter' or 'ibox'
  
  const [templateInter, setTemplateInter] = useLocalStorage('generate_template_inter', DEFAULT_TEMPLATE_INTER);
  const [templateIbox, setTemplateIbox] = useLocalStorage('generate_template_ibox', DEFAULT_TEMPLATE_IBOX);
  
  const [tempValueInter, setTempValueInter] = useState(templateInter);
  const [tempValueIbox, setTempValueIbox] = useState(templateIbox);
  
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (activeTab === 'inter') {
      setTemplateInter(tempValueInter);
    } else {
      setTemplateIbox(tempValueIbox);
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Yakin ingin mengembalikan template ini ke bentuk semula (default)?')) {
      if (activeTab === 'inter') {
        setTempValueInter(DEFAULT_TEMPLATE_INTER);
        setTemplateInter(DEFAULT_TEMPLATE_INTER);
      } else {
        setTempValueIbox(DEFAULT_TEMPLATE_IBOX);
        setTemplateIbox(DEFAULT_TEMPLATE_IBOX);
      }
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
      
      {/* Tab Switcher */}
      <div className="flex justify-center mb-2">
        <div className="flex gap-2 p-1 bg-secondary/50 rounded-xl border border-border/50">
          <button
            onClick={() => setActiveTab('inter')}
            className={`px-8 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${activeTab === 'inter' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 shadow' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Format Inter
          </button>
          <button
            onClick={() => setActiveTab('ibox')}
            className={`px-8 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${activeTab === 'ibox' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 shadow' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Format iBox
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        <div className="md:col-span-2 flex flex-col">
          <textarea
            value={activeTab === 'inter' ? tempValueInter : tempValueIbox}
            onChange={(e) => {
              if (activeTab === 'inter') setTempValueInter(e.target.value);
              else setTempValueIbox(e.target.value);
            }}
            className={`w-full flex-1 min-h-[400px] p-4 rounded-xl border bg-white dark:bg-white/5 outline-none transition-all duration-300 resize-none text-sm font-mono shadow-sm focus:ring-2 ${activeTab === 'inter' ? 'border-blue-200 focus:ring-blue-500/50 dark:border-blue-500/30' : 'border-red-200 focus:ring-red-500/50 dark:border-red-500/30'}`}
            placeholder="Ketik format template di sini..."
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSave}
              className={`flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 active:scale-95 ${activeTab === 'inter' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}`}
            >
              {isSaved ? (
                <>
                  <CheckCircle2 size={18} />
                  Tersimpan!
                </>
              ) : (
                <>
                  <Save size={18} />
                  Simpan Format {activeTab === 'inter' ? 'Inter' : 'iBox'}
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
