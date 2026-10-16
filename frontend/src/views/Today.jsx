import React, { useEffect, useState } from 'react';
import { api } from '../api.js';

const CHANNELS = ['Alle Kanäle', 'Instagram', 'TikTok', 'YouTube', 'Newsletter'];

function scoreColor(score) {
  if (score >= 78) return 'var(--orange)';
  if (score >= 68) return 'var(--orange-soft)';
  return 'var(--orange-pale)';
}

export default function Today() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [channel, setChannel] = useState(CHANNELS[0]);

  useEffect(() => {
    api.getToday().then(setData).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="demo-banner">{error}</div>;
  if (!data) return <p className="muted">Lade Ideen ...</p>;

  const ideas = [...data.ideas]
    .sort((a, b) => b.score - a.score)
    .filter((i) => channel === CHANNELS[0] || i.channel.includes(channel));

  return (
    <>
      <header className="row between">
        <div className="col" style={{ gap: 4 }}>
          <div className="muted" style={{ fontSize: 14 }}>
            {new Date().toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}
          </div>
          <h1>Guten Morgen, das sind Ihre Ideen für heute</h1>
        </div>
        <div className="btn-row">
          <button className="btn">Neue Ideen anfordern</button>
          <button className="btn primary">Als Tagesreport senden</button>
        </div>
      </header>

      <section className="row">
        {data.stats.map((s) => (
          <div key={s.label} className="card stat">
            <div className="muted" style={{ fontSize: 14 }}>{s.label}</div>
            <div className="value">{s.value}</div>
            <div className="muted small">{s.note}</div>
          </div>
        ))}
      </section>

      <div className="row-24">
        <section className="grow col" style={{ gap: 14 }}>
          <div className="row between" style={{ alignItems: 'center' }}>
            <h2>Top-Ideen, sortiert nach Score</h2>
            <div className="chips">
              {CHANNELS.map((c) => (
                <button key={c} className={`filter ${c === channel ? 'on' : ''}`} onClick={() => setChannel(c)}>{c}</button>
              ))}
            </div>
          </div>

          {ideas.length === 0 && <p className="muted">Keine Idee für diesen Kanal.</p>}
          {ideas.map((idea) => (
            <article key={idea.id} className="card idea">
              <div className="score-wrap">
                <div className="score" style={{ background: scoreColor(idea.score) }}>{idea.score}</div>
                Score
              </div>
              <div className="idea-body">
                <div className="chips">
                  <span className="pill dark">{idea.channel}</span>
                  <span className="pill">{idea.pillar}</span>
                  <span className="pill warm">{idea.trigger}</span>
                </div>
                <h3>{idea.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--ink)' }}>{idea.why}</p>
                <div className="muted small">Datenbasis: {idea.data}</div>
                <div className="btn-row">
                  <a className="btn primary" href={`#/idee/${idea.id}`}>Idee öffnen</a>
                  <button className="btn">In Kalender</button>
                  <button className="btn quiet">Ablehnen</button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="aside">
          <section className="card">
            <h2>Anlässe in den nächsten Wochen</h2>
            {data.events.map((ev) => (
              <div key={ev.date + ev.name} className="list-row">
                <div className="date">{ev.date}</div>
                <div>
                  <div style={{ fontWeight: 600 }}>{ev.name}</div>
                  <div className="muted small">{ev.note}</div>
                </div>
              </div>
            ))}
            <a href="#/kalender" style={{ fontWeight: 600 }}>Zum Content-Kalender</a>
          </section>

          <section className="card">
            <h2>Content-Mix diese Woche</h2>
            {data.mix.map((m) => (
              <div key={m.name} className="col" style={{ gap: 4 }}>
                <div className="between-text"><span>{m.name}</span><span className="muted">{m.share} %</span></div>
                <div className="bar"><div style={{ width: `${m.share}%` }} /></div>
              </div>
            ))}
          </section>

          <section className="card">
            <h2>Datenstand</h2>
            {data.sources.map((s) => (
              <div key={s.name} className="between-text src-row"><span>{s.name}</span><span className="muted">{s.state}</span></div>
            ))}
          </section>
        </aside>
      </div>
    </>
  );
}
