// Datenzugriff des Frontends.
// Solange VITE_API_URL nicht gesetzt ist, liefert das Frontend Demo-Daten.
// Später zeigt VITE_API_URL auf das interne Backend, das die JTL-Shadow-DB ausliest.
// Die Datenbank selbst wird nie direkt aus dem Browser angesprochen.

import * as demo from './data/demo.js';

const API_URL = import.meta.env.VITE_API_URL || '';

async function get(path, fallback) {
  if (!API_URL) return fallback;
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`API-Fehler ${res.status} bei ${path}`);
  return res.json();
}

export const api = {
  isDemo: !API_URL,
  getToday: () =>
    get('/api/today', {
      stats: demo.stats,
      ideas: demo.ideas,
      events: demo.upcomingEvents,
      mix: demo.mix,
      sources: demo.sources,
    }),
  getIdea: async (id) => {
    const today = await api.getToday();
    return today.ideas.find((i) => i.id === id) || null;
  },
  getCalendar: () => get('/api/calendar', { events: demo.calendarEvents, suggestions: demo.suggestions }),
};
