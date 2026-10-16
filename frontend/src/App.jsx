import React, { useEffect, useState } from 'react';
import Today from './views/Today.jsx';
import Idea from './views/Idea.jsx';
import Calendar from './views/Calendar.jsx';
import Plans from './views/Plans.jsx';
import Rules from './views/Rules.jsx';
import Formats from './views/Formats.jsx';
import { api } from './api.js';

// Einfaches Hash-Routing, damit GitHub Pages ohne Server-Konfiguration funktioniert.
function useRoute() {
  const [hash, setHash] = useState(window.location.hash || '#/');
  useEffect(() => {
    const onChange = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  const [, page, id] = hash.split('/');
  return { page: page || 'heute', id };
}

export default function App() {
  const { page, id } = useRoute();
  const items = [
    ['heute', 'Heute', '#/'],
    ['kalender', 'Kalender', '#/kalender'],
    ['idee', 'Ideen-Archiv', '#/idee/jbl-bassprotube-bware'],
    ['vorlagen', 'Plan-Vorlagen', '#/vorlagen'],
    ['formate', 'Formate', '#/formate'],
    ['regeln', 'Regeln', '#/regeln'],
  ];

  return (
    <div className="shell">
      <nav className="side">
        <div>
          <div className="logo">SOUND<span>.de</span></div>
          <div className="logo-sub">Content-Kompass</div>
        </div>
        <div className="nav">
          {items.map(([key, label, href]) => (
            <a key={key} href={href} className={page === key ? 'active' : ''}>{label}</a>
          ))}
        </div>
        <div className="side-note">
          {api.isDemo
            ? 'Demo-Modus: Alle Daten sind Beispiele. Preise und Bestand kommen im Betrieb aus der Shadow-DB.'
            : 'Live-Modus: Daten aus dem Backend.'}
        </div>
      </nav>
      <main className="main">
        {page === 'kalender' ? (
          <Calendar />
        ) : page === 'idee' ? (
          <Idea id={id} />
        ) : page === 'vorlagen' ? (
          <Plans />
        ) : page === 'formate' ? (
          <Formats />
        ) : page === 'regeln' ? (
          <Rules />
        ) : (
          <Today />
        )}
      </main>
    </div>
  );
}
