import React, { useState } from 'react';
import { useStored, uid } from '../store.js';
import { CHANNELS, seedFormats } from '../data/seed.js';

export default function Formats() {
  const [formats, setFormats] = useStored('formats', seedFormats);
  const [selectedId, setSelectedId] = useState(formats[0]?.id);
  const selected = formats.find((f) => f.id === selectedId);

  const update = (patch) => setFormats(formats.map((f) => (f.id === selectedId ? { ...f, ...patch } : f)));
  const toggleChannel = (c) =>
    update({ channels: selected.channels.includes(c) ? selected.channels.filter((x) => x !== c) : [...selected.channels, c] });

  const add = () => {
    const f = { id: uid(), name: 'Neues Format', description: '', channels: [], length: '', steps: '', aiHint: '' };
    setFormats([...formats, f]);
    setSelectedId(f.id);
  };
  const duplicate = () => {
    const f = { ...selected, id: uid(), name: `${selected.name} (Kopie)` };
    setFormats([...formats, f]);
    setSelectedId(f.id);
  };
  const remove = () => {
    if (!window.confirm(`Format „${selected.name}“ löschen?`)) return;
    const rest = formats.filter((f) => f.id !== selectedId);
    setFormats(rest);
    setSelectedId(rest[0]?.id);
  };
  const reset = () => {
    if (!window.confirm('Alle Formate auf die Standardliste zurücksetzen? Eigene Änderungen gehen verloren.')) return;
    setFormats(seedFormats);
    setSelectedId(seedFormats[0].id);
  };

  return (
    <>
      <header className="row between">
        <div className="col" style={{ gap: 4 }}>
          <div className="muted" style={{ fontSize: 14 }}>Verwaltung</div>
          <h1>Formate</h1>
        </div>
        <div className="btn-row">
          <button className="btn quiet" onClick={reset}>Standard wiederherstellen</button>
          <button className="btn primary" onClick={add}>Neues Format</button>
        </div>
      </header>
      <p className="muted" style={{ maxWidth: 760, lineHeight: 1.55 }}>
        Formate beschreiben, wie ein Beitrag aufgebaut ist, zum Beispiel Q&amp;A oder Tutorial. Die Ideen-Engine und die
        Plan-Vorlagen greifen auf diese Formate zu. Die Hinweise für die KI fließen später in die Textvorschläge ein.
      </p>

      <div className="row-24">
        <section className="aside" style={{ flex: '1 1 260px', maxWidth: 360 }}>
          <div className="col" style={{ gap: 8 }}>
            {formats.map((f) => (
              <button key={f.id} className={`pick ${f.id === selectedId ? 'on' : ''}`} onClick={() => setSelectedId(f.id)}>
                <strong>{f.name}</strong>
                <span className="muted small">{f.channels.length ? f.channels.join(', ') : 'Kein Kanal gewählt'}</span>
              </button>
            ))}
            {formats.length === 0 && <p className="muted">Noch keine Formate. Lege oben ein neues an.</p>}
          </div>
        </section>

        {selected && (
          <section className="card grow" key={selected.id}>
            <div className="row between" style={{ alignItems: 'center' }}>
              <h2>Format bearbeiten</h2>
              <div className="btn-row">
                <button className="btn" onClick={duplicate}>Duplizieren</button>
                <button className="btn quiet" onClick={remove}>Löschen</button>
              </div>
            </div>
            <label className="field">
              <span>Name</span>
              <input type="text" value={selected.name} onChange={(e) => update({ name: e.target.value })} />
            </label>
            <label className="field">
              <span>Beschreibung</span>
              <input type="text" value={selected.description} onChange={(e) => update({ description: e.target.value })} />
            </label>
            <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
              <span style={{ fontWeight: 600 }}>Kanäle</span>
              <div className="checks-row">
                {CHANNELS.map((c) => (
                  <label key={c}>
                    <input type="checkbox" checked={selected.channels.includes(c)} onChange={() => toggleChannel(c)} />
                    {c}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="field">
              <span>Länge</span>
              <input type="text" value={selected.length} onChange={(e) => update({ length: e.target.value })} />
            </label>
            <label className="field">
              <span>Aufbau (ein Schritt pro Zeile)</span>
              <textarea value={selected.steps} onChange={(e) => update({ steps: e.target.value })} />
            </label>
            <label className="field">
              <span>Hinweise für die KI</span>
              <textarea value={selected.aiHint} onChange={(e) => update({ aiHint: e.target.value })} style={{ minHeight: 70 }} />
            </label>
          </section>
        )}
      </div>
    </>
  );
}
