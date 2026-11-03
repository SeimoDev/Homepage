import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { langs, ORDER, ui } from './content';

const Ctx = createContext(null);

const STORAGE_KEY = 'seimo.lang';
const VALID = new Set(ORDER);

function detectLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && VALID.has(saved)) return saved;
  } catch {}

  const nav = (navigator.languages || [navigator.language || '']).join(',');
  if (/ja/i.test(nav)) return 'ja';
  if (/hant|tw|hk|mo/i.test(nav)) return 'zh-Hant';
  if (/zh/i.test(nav)) return 'zh-Hans';
  if (/en/i.test(nav)) return 'en';
  return 'zh-Hans';
}

const TITLES = {
  'zh-Hans': { title: 'Seimo — 软硬件全栈开发者', htmlLang: 'zh-Hans' },
  'zh-Hant': { title: 'Seimo — 軟硬體全端開發者', htmlLang: 'zh-Hant' },
  en: { title: 'Seimo — Full-stack, hardware to web', htmlLang: 'en' },
  ja: { title: 'Seimo — ハードからWebまでのフルスタック開発者', htmlLang: 'ja' },
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState(detectLang);

  useEffect(() => {
    const meta = TITLES[lang] || TITLES['zh-Hans'];
    document.documentElement.lang = meta.htmlLang;
    document.body.dataset.lang = lang;
    document.title = meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', langs[lang].intro.quote);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: langs[lang], ui: ui[lang], order: ORDER }),
    [lang]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}
