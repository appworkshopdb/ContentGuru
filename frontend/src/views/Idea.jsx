import React, { useEffect, useState } from 'react';
import { api } from '../api.js';

export default function Idea({ id }) {
  const [idea, setIdea] = useState(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api.getIdea(id).then(setIdea).catch(() => setIdea(null));
  }, [id]);

  if (idea === undefined) return <p className="muted">Lade Idee ...</p>;
  if (idea === null) {
    return (
      <>
        <a href="#/" style={{ fontWeight: 600 }}>Zurück zur Tagesansicht</a>
        <p>Diese Idee wurde nicht gefunden.</p>
      </>
    );
  }

  const d = idea.detail;

  return (
    <>
      <a href="#/" style={{ fontWeight: 600 }}>Zurück zur Tagesansicht</a>

      <header className="row between" style={{ alignItems: 'flex-start' }}>
        <div className="col" style={{ flex: '1 1 420px', minWidth: 0 }}>
          <div className="chips">
            {(d ? d.tags : [idea.channel, idea.pillar, idea.trigger]).map((t) => (
              <span key={t} className="pill">{t}</span>
            ))}
          </div>
          <h1>{idea.title}</h1>
          <div className="muted">Status: Entwurf</div>
        </div>
        <div className="btn-row">
          <button className="btn primary">Annehmen</button>
          <button className="btn">In Kalender planen</button>
          <button className="btn quiet">Ablehnen</button>
        </div>
      </header>

      {!d && (
        <div className="demo-banner">
          Der ausgearbeitete Entwurf (Hook, Skript, Caption, Prüfliste) ist im Demo-Modus nur für die Idee
          „B-Ware-Check: JBL BASSPRO Tube 12“ hinterlegt. Im Betrieb erzeugt das Tool ihn für jede Idee.
          <div style={{ marginTop: 8 }}><a href="#/idee/jbl-bassprotube-bware">Beispiel öffnen</a></div>
        </div>
      )}

      {d && (
        <div className="row-24">
          <div className="grow col" style={{ gap: 18 }}>
            <section className="card">
              <h2>Warum jetzt?</h2>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--ink)' }}>{d.whyNow}</p>
              <div className="muted small">Datenbasis: {idea.data}. Preis laut Shop zum Abrufzeitpunkt.</div>
            </section>

            <section className="card">
              <h2>Hook, die ersten 2 Sekunden</h2>
              <p style={{ fontSize: 20, lineHeight: 1.4, fontWeight: 600 }}>{d.hook}</p>
            </section>

            <section className="card">
              <h2>Skript-Skizze, ca. 30 Sekunden</h2>
              {d.scenes.map((s) => (
                <div key={s.time} className="scene">
                  <div className="t">{s.time}</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{s.title}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink)' }}>{s.text}</div>
                  </div>
                </div>
              ))}
            </section>

            <section className="card">
              <div className="row between" style={{ alignItems: 'center' }}>
                <h2>Caption-Entwurf</h2>
                <button
                  className="btn"
                  onClick={() => {
                    navigator.clipboard?.writeText(d.caption);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                >
                  {copied ? 'Kopiert' : 'Kopieren'}
                </button>
              </div>
              <div className="box">{d.caption}</div>
              <div className="muted small">{d.captionNote}</div>
            </section>

            <section className="card">
              <h2>Bildbriefing</h2>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15, lineHeight: 1.6, color: 'var(--ink)' }}>
                {d.brief.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </section>
          </div>

          <aside className="aside">
            <section className="card">
              <div className="row between" style={{ alignItems: 'center' }}>
                <h2>Score</h2>
                <div className="score" style={{ background: 'var(--orange-soft)' }}>{idea.score}</div>
              </div>
              {d.criteria.map((c) => (
                <div key={c.name} className="col" style={{ gap: 4 }}>
                  <div className="between-text"><span>{c.name}</span><span className="muted">{c.value} von {c.max}</span></div>
                  <div className="bar"><div style={{ width: `${(c.value / c.max) * 100}%` }} /></div>
                </div>
              ))}
            </section>

            <section className="card">
              <h2>Variante anfordern</h2>
              <div className="chips">
                {['Lockerer', 'Mehr Fachwissen', 'Für YouTube Short', 'Ohne Preis'].map((v) => (
                  <button key={v} className="filter" style={{ minHeight: 44 }}>{v}</button>
                ))}
              </div>
            </section>

            <section className="card">
              <h2>Prüfliste vor Freigabe</h2>
              {d.checks.map((c) => (
                <div key={c.text} className="check">
                  <i className={c.done ? 'done' : ''} aria-hidden="true" />
                  <span>{c.done ? 'Erledigt: ' : 'Offen: '}{c.text}</span>
                </div>
              ))}
            </section>
          </aside>
        </div>
      )}
    </>
  );
}
