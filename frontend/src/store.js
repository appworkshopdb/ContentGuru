import { useEffect, useState } from 'react';

// Einfacher Speicher im Browser (localStorage). Sobald das Backend steht, wird dieser Hook
// durch API-Aufrufe ersetzt; die Ansichten bleiben unverändert.
const PREFIX = 'contentguru.v1.';

export function useStored(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      /* Speicher voll oder gesperrt: Änderungen bleiben nur in dieser Sitzung */
    }
  }, [key, value]);

  return [value, setValue];
}

export const uid = () => Math.random().toString(36).slice(2, 9);

export const iso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
