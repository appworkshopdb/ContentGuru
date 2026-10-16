import React, { useEffect, useState } from 'react';
import { api } from '../api.js';
import { useStored } from '../store.js';

const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Liefert alle Tage des Monats als Wochen (Montag zuerst).
function buildWeeks(year, month) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - offset);
  const last = new Date(year, month + 1, 0);
  const total = Math.ceil((offset + last.getDate()) / 7) * 7;
  const days = Array.from({ length: total }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  return Array.from({ length: total / 7 }, (_, w) => days.slice(w * 7, w * 7 + 7));
}

export default function Calendar() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [cursor, setCursor] = useState({ year: 2026, month: 10 });
  const [userEvents, setUserEvents] = useStored('userEvents', {});

  useEffect(() => {
    api.getCalendar().then(setData).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="demo-banner">{error}</div>;
  if (!data) return <p className="muted">Lade Kalender ...</p>;

  const shift = (delta) => {
    const d = new Date(cursor.year, cursor.month + delta, 1);
    setCursor({ year: d.getFullYear(), month: d.getMonth() });
  };
  const weeks = buildWeeks(cursor.year, cursor.month);
  const eventsFor = (key) => [...(data.events[key] || []), ...(userEvents[key] || [])];
  const userCount = Object.values(userEvents).reduce((n, list) => n + list.length, 0);

  return (
    <>
      <header className="row between">
        <div className="col" style={{ gap: 4 }}>
          <div className="muted" style={{ fontSize: 14 }}>Content-Kalender</div>
          <h1>{MONTHS[cursor.month]} {cursor.year}</h1>
        </div>
        <div className="btn-row">
          <button className="btn" onClick={() => shift(-1)}>Vorheriger Monat</button>
          <button className="btn" onClick={() => shift(1)}>Nächster Monat</button>
          <a className="btn primary" href="#/vorlagen">Vorlage anwenden</a>
        </div>
      </header>

      {userCount > 0 && (
        <div className="demo-banner row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{userCount} Einträge aus Plan-Vorlagen sind im Kalender.</span>
          <button
            className="btn quiet"
            onClick={() => {
              if (window.confirm('Alle Einträge aus Plan-Vorlagen aus dem Kalender entfernen?')) setUserEvents({});
            }}
          >
            Einträge entfernen
          </button>
        </div>
      )}

      <div className="legend">
        <span><i className="sw" style={{ background: 'var(--navy)' }} />Anlass</span>
        <span><i className="sw" style={{ background: 'var(--orange)' }} />Geplanter Beitrag</span>
        <span><i className="sw" style={{ background: 'var(--chip)', border: '1px dashed var(--muted)' }} />Entwurf</span>
      </div>

      <div className="row-24">
        <section className="card grow">
          <div className="cal-wrap">
            <div className="cal">
              {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((d) => <div key={d} className="dow">{d}</div>)}
              {weeks.flat().map((day) => {
                const inMonth = day.getMonth() === cursor.month;
                const events = eventsFor(iso(day));
                return (
                  <div key={iso(day)} className={`day ${inMonth ? '' : 'other'}`}>
                    <div className="n">{day.getDate()}</div>
                    {events.map((e, i) => <div key={`${e.text}-${i}`} className={`ev ${e.type}`}>{e.text}</div>)}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <aside className="aside" style={{ flex: '1 1 280px' }}>
          <section className="card">
            <h2>Vorschläge für freie Tage</h2>
            {data.suggestions.map((s) => (
              <div key={s.title} className="col" style={{ gap: 8, paddingTop: 12, borderTop: '1px solid var(--chip)' }}>
                <div className="muted small">{s.date} · {s.pillar}</div>
                <div style={{ fontWeight: 600, lineHeight: 1.35 }}>{s.title}</div>
                <div><button className="btn" style={{ fontSize: 14 }}>In Kalender übernehmen</button></div>
              </div>
            ))}
          </section>
          <p className="muted small" style={{ lineHeight: 1.5 }}>
            Beispieldaten. Termine wie Black Friday (27.11.) und Cyber Monday (30.11.) stammen aus dem Saisonkalender im Konzept.
          </p>
        </aside>
      </div>
    </>
  );
}
