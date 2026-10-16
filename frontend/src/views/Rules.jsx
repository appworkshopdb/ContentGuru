import React, { useState } from 'react';
import { useStored, uid } from '../store.js';
import { CHANNELS, RULE_CATEGORIES, RULE_TYPES, seedFormats, seedRules } from '../data/seed.js';

const TYPE_LABEL = { verbot: 'Verbot', pflicht: 'Pflicht', hinweis: 'Hinweis' };

export default function Rules() {
  const [rules, setRules] = useStored('rules', seedRules);
  const [formats] = useStored('formats', seedFormats);
  const [selectedId, setSelectedId] = useState(rules[0]?.id);
  const [category, setCategory] = useState('Alle');
  const [channelFilter, setChannelFilter] = useState('Alle');

  const selected = rules.find((r) => r.id === selectedId);
  const update = (patch) => setRules(rules.map((r) => (r.id === selectedId ? { ...r, ...patch } : r)));
  const toggleIn = (key, value) =>
    update({ [key]: selected[key].includes(value) ? selected[key].filter((x) => x !== value) : [...selected[key], value] });

  const visible = rules.filter(
    (r) =>
      (category === 'Alle' || r.category === category) &&
      (channelFilter === 'Alle' || r.channels.length === 0 || r.channels.includes(channelFilter)),
  );

  const add = () => {
    const r = { id: uid(), name: 'Neue Regel', category: 'Sonstiges', type: 'verbot', terms: '', when: '', message: '', channels: [], formats: [], active: true };
    setRules([...rules, r]);
    setSelectedId(r.id);
    setCategory('Alle');
    setChannelFilter('Alle');
  };
  const duplicate = () => {
    const r = { ...selected, id: uid(), name: `${selected.name} (Kopie)` };
    setRules([...rules, r]);
    setSelectedId(r.id);
  };
  const remove = () => {
    if (!window.confirm(`Regel „${selected.name}“ löschen?`)) return;
    const rest = rules.filter((r) => r.id !== selectedId);
    setRules(rest);
    setSelectedId(rest[0]?.id);
  };
  const reset = () => {
    if (!window.confirm('Alle Regeln auf die Vorlagen zurücksetzen? Eigene Änderungen gehen verloren.')) return;
    setRules(seedRules);
    setSelectedId(seedRules[0].id);
  };

  const scopeText = (r) =>
    `${r.channels.length ? r.channels.join(', ') : 'alle Kanäle'} · ${
      r.formats.length ? r.formats.map((id) => formats.find((f) => f.id === id)?.name || '?').join(', ') : 'alle Formate'
    }`;

  return (
    <>
      <header className="row between">
        <div className="col" style={{ gap: 4 }}>
          <div className="muted" style={{ fontSize: 14 }}>Verwaltung</div>
          <h1>Regeln</h1>
        </div>
        <div className="btn-row">
          <button className="btn quiet" onClick={reset}>Vorlagen wiederherstellen</button>
          <button className="btn primary" onClick={add}>Neue Regel</button>
        </div>
      </header>

      <div className="demo-banner">
        Die Regel-Vorlagen zu Wettbewerbs- und Preisrecht sind eine Orientierung und keine Rechtsberatung. Bitte lass sie
        von Rechtsberatung oder der Geschäftsführung prüfen und passe sie an. Das Tool prüft Texte nur anhand der hier
        hinterlegten Begriffe und ersetzt keine Freigabe.
      </div>

      <div className="row-24">
        <section className="aside" style={{ flex: '1 1 300px', maxWidth: 420 }}>
          <div className="col" style={{ gap: 8 }}>
            <div className="chips">
              {['Alle', ...RULE_CATEGORIES].map((c) => (
                <button key={c} className={`filter ${c === category ? 'on' : ''}`} onClick={() => setCategory(c)}>{c}</button>
              ))}
            </div>
            <label className="field">
              <span>Kanal</span>
              <select value={channelFilter} onChange={(e) => setChannelFilter(e.target.value)}>
                {['Alle', ...CHANNELS].map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            {visible.map((r) => (
              <button key={r.id} className={`pick ${r.id === selectedId ? 'on' : ''}`} onClick={() => setSelectedId(r.id)}>
                <span className="row" style={{ gap: 8, alignItems: 'center' }}>
                  <span className={`pill ${r.active ? 'dark' : ''}`}>{r.active ? 'Aktiv' : 'Aus'}</span>
                  <span className="pill">{TYPE_LABEL[r.type]}</span>
                  <span className="pill warm">{r.category}</span>
                </span>
                <strong>{r.name}</strong>
                <span className="muted small">{scopeText(r)}</span>
              </button>
            ))}
            {visible.length === 0 && <p className="muted">Keine Regel für diese Auswahl.</p>}
          </div>
        </section>

        {selected && (
          <section className="card grow" key={selected.id}>
            <div className="row between" style={{ alignItems: 'center' }}>
              <h2>Regel bearbeiten</h2>
              <div className="btn-row">
                <button className="btn" onClick={duplicate}>Duplizieren</button>
                <button className="btn quiet" onClick={remove}>Löschen</button>
              </div>
            </div>

            <label className="checks-row" style={{ fontSize: 15, fontWeight: 600 }}>
              <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                <input type="checkbox" checked={selected.active} onChange={(e) => update({ active: e.target.checked })} />
                Regel ist aktiv
              </span>
            </label>

            <label className="field">
              <span>Name</span>
              <input type="text" value={selected.name} onChange={(e) => update({ name: e.target.value })} />
            </label>
            <div className="row">
              <label className="field" style={{ flex: '1 1 180px' }}>
                <span>Kategorie</span>
                <select value={selected.category} onChange={(e) => update({ category: e.target.value })}>
                  {RULE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
              <label className="field" style={{ flex: '2 1 280px' }}>
                <span>Art der Regel</span>
                <select value={selected.type} onChange={(e) => update({ type: e.target.value })}>
                  {Object.entries(RULE_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </label>
            </div>

            {selected.type !== 'hinweis' && (
              <label className="field">
                <span>{selected.type === 'verbot' ? 'Verbotene Begriffe' : 'Pflichtbegriffe (einer genügt)'} (mit Komma getrennt)</span>
                <textarea value={selected.terms} onChange={(e) => update({ terms: e.target.value })} style={{ minHeight: 70 }} />
              </label>
            )}
            <label className="field">
              <span>Gilt nur, wenn der Text einen dieser Begriffe enthält (optional, mit Komma getrennt)</span>
              <input type="text" value={selected.when} onChange={(e) => update({ when: e.target.value })} />
            </label>
            <label className="field">
              <span>Meldung für das Team</span>
              <textarea value={selected.message} onChange={(e) => update({ message: e.target.value })} style={{ minHeight: 70 }} />
            </label>

            <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
              <span style={{ fontWeight: 600 }}>Kanäle (keiner gewählt = alle)</span>
              <div className="checks-row">
                {CHANNELS.map((c) => (
                  <label key={c}>
                    <input type="checkbox" checked={selected.channels.includes(c)} onChange={() => toggleIn('channels', c)} />
                    {c}
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
              <span style={{ fontWeight: 600 }}>Formate (keines gewählt = alle)</span>
              <div className="checks-row">
                {formats.map((f) => (
                  <label key={f.id}>
                    <input type="checkbox" checked={selected.formats.includes(f.id)} onChange={() => toggleIn('formats', f.id)} />
                    {f.name}
                  </label>
                ))}
              </div>
            </fieldset>
          </section>
        )}
      </div>
    </>
  );
}
