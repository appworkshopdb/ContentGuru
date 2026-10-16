import React, { useState } from 'react';
import { useStored, uid, iso } from '../store.js';
import { CHANNELS, DAYS, PILLARS, seedFormats, seedPlans } from '../data/seed.js';

export default function Plans() {
  const [plans, setPlans] = useStored('plans', seedPlans);
  const [formats] = useStored('formats', seedFormats);
  const [userEvents, setUserEvents] = useStored('userEvents', {});
  const [selectedId, setSelectedId] = useState(plans[0]?.id);
  const [startDate, setStartDate] = useState('2026-11-16');
  const [message, setMessage] = useState('');

  const plan = plans.find((p) => p.id === selectedId);
  const update = (patch) => setPlans(plans.map((p) => (p.id === selectedId ? { ...p, ...patch } : p)));
  const updateSlot = (id, patch) => update({ slots: plan.slots.map((s) => (s.id === id ? { ...s, ...patch } : s)) });
  const formatName = (id) => formats.find((f) => f.id === id)?.name || 'Beitrag';

  const addPlan = () => {
    const p = { id: uid(), name: 'Neue Vorlage', description: '', slots: [] };
    setPlans([...plans, p]);
    setSelectedId(p.id);
    setMessage('');
  };
  const duplicate = () => {
    const p = { ...plan, id: uid(), name: `${plan.name} (Kopie)`, slots: plan.slots.map((s) => ({ ...s, id: uid() })) };
    setPlans([...plans, p]);
    setSelectedId(p.id);
    setMessage('');
  };
  const remove = () => {
    if (!window.confirm(`Vorlage „${plan.name}“ löschen?`)) return;
    const rest = plans.filter((p) => p.id !== selectedId);
    setPlans(rest);
    setSelectedId(rest[0]?.id);
    setMessage('');
  };
  const reset = () => {
    if (!window.confirm('Alle Vorlagen auf die Standardliste zurücksetzen? Eigene Änderungen gehen verloren.')) return;
    setPlans(seedPlans);
    setSelectedId(seedPlans[0].id);
    setMessage('');
  };
  const addSlot = () =>
    update({
      slots: [
        ...plan.slots,
        { id: uid(), week: 0, day: 0, channel: CHANNELS[0], formatId: formats[0]?.id || '', pillar: PILLARS[0], title: '' },
      ],
    });
  const removeSlot = (id) => update({ slots: plan.slots.filter((s) => s.id !== id) });

  // Legt die Einträge der Vorlage im Kalender an. Frühere Einträge derselben Vorlage werden ersetzt.
  const applyToCalendar = () => {
    if (!startDate) {
      setMessage('Bitte ein Startdatum wählen.');
      return;
    }
    const [y, m, d] = startDate.split('-').map(Number);
    const base = new Date(y, m - 1, d);
    base.setDate(base.getDate() - ((base.getDay() + 6) % 7)); // auf Montag der gewählten Woche
    const next = {};
    for (const [key, list] of Object.entries(userEvents)) {
      const kept = list.filter((e) => e.planId !== plan.id);
      if (kept.length) next[key] = kept;
    }
    for (const s of plan.slots) {
      const dt = new Date(base);
      dt.setDate(base.getDate() + s.week * 7 + s.day);
      const key = iso(dt);
      next[key] = [
        ...(next[key] || []),
        { type: 'idee', planId: plan.id, text: `${s.channel} · ${formatName(s.formatId)}: ${s.title || 'ohne Titel'}` },
      ];
    }
    setUserEvents(next);
    setMessage(
      `${plan.slots.length} Einträge ab Montag, ${base.toLocaleDateString('de-DE')} im Kalender angelegt.`,
    );
  };

  return (
    <>
      <header className="row between">
        <div className="col" style={{ gap: 4 }}>
          <div className="muted" style={{ fontSize: 14 }}>Planung</div>
          <h1>Content-Plan-Vorlagen</h1>
        </div>
        <div className="btn-row">
          <button className="btn quiet" onClick={reset}>Standard wiederherstellen</button>
          <button className="btn primary" onClick={addPlan}>Neue Vorlage</button>
        </div>
      </header>
      <p className="muted" style={{ maxWidth: 760, lineHeight: 1.55 }}>
        Eine Vorlage ist ein wiederverwendbarer Ablauf aus Beiträgen pro Woche und Wochentag. Du wählst ein Startdatum und
        legst die ganze Vorlage mit einem Klick im Kalender an.
      </p>

      <div className="row-24">
        <section className="aside" style={{ flex: '1 1 260px', maxWidth: 360 }}>
          <div className="col" style={{ gap: 8 }}>
            {plans.map((p) => (
              <button key={p.id} className={`pick ${p.id === selectedId ? 'on' : ''}`} onClick={() => { setSelectedId(p.id); setMessage(''); }}>
                <strong>{p.name}</strong>
                <span className="muted small">{p.slots.length} Beiträge</span>
              </button>
            ))}
            {plans.length === 0 && <p className="muted">Noch keine Vorlagen. Lege oben eine neue an.</p>}
          </div>
        </section>

        {plan && (
          <section className="grow col" style={{ gap: 18 }} key={plan.id}>
            <div className="card">
              <div className="row between" style={{ alignItems: 'center' }}>
                <h2>Vorlage bearbeiten</h2>
                <div className="btn-row">
                  <button className="btn" onClick={duplicate}>Duplizieren</button>
                  <button className="btn quiet" onClick={remove}>Löschen</button>
                </div>
              </div>
              <label className="field">
                <span>Name</span>
                <input type="text" value={plan.name} onChange={(e) => update({ name: e.target.value })} />
              </label>
              <label className="field">
                <span>Beschreibung</span>
                <input type="text" value={plan.description} onChange={(e) => update({ description: e.target.value })} />
              </label>
            </div>

            <div className="card">
              <div className="row between" style={{ alignItems: 'center' }}>
                <h2>Beiträge</h2>
                <button className="btn" onClick={addSlot}>Beitrag hinzufügen</button>
              </div>
              {plan.slots.length === 0 && <p className="muted">Noch keine Beiträge in dieser Vorlage.</p>}
              {[...plan.slots]
                .sort((a, b) => a.week - b.week || a.day - b.day)
                .map((s) => (
                  <div key={s.id} className="slot">
                    <label className="field" style={{ flex: '0 0 84px' }}>
                      <span>Woche</span>
                      <input type="number" min="1" max="12" value={s.week + 1} onChange={(e) => updateSlot(s.id, { week: Math.max(0, Number(e.target.value) - 1) })} />
                    </label>
                    <label className="field" style={{ flex: '0 0 84px' }}>
                      <span>Tag</span>
                      <select value={s.day} onChange={(e) => updateSlot(s.id, { day: Number(e.target.value) })}>
                        {DAYS.map((d, i) => <option key={d} value={i}>{d}</option>)}
                      </select>
                    </label>
                    <label className="field" style={{ flex: '1 1 130px' }}>
                      <span>Kanal</span>
                      <select value={s.channel} onChange={(e) => updateSlot(s.id, { channel: e.target.value })}>
                        {CHANNELS.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </label>
                    <label className="field" style={{ flex: '1 1 170px' }}>
                      <span>Format</span>
                      <select value={s.formatId} onChange={(e) => updateSlot(s.id, { formatId: e.target.value })}>
                        {formats.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
                      </select>
                    </label>
                    <label className="field" style={{ flex: '1 1 170px' }}>
                      <span>Säule</span>
                      <select value={s.pillar} onChange={(e) => updateSlot(s.id, { pillar: e.target.value })}>
                        {PILLARS.map((p) => <option key={p}>{p}</option>)}
                      </select>
                    </label>
                    <label className="field" style={{ flex: '2 1 220px' }}>
                      <span>Thema</span>
                      <input type="text" value={s.title} onChange={(e) => updateSlot(s.id, { title: e.target.value })} />
                    </label>
                    <button className="btn quiet" style={{ alignSelf: 'flex-end' }} onClick={() => removeSlot(s.id)} aria-label="Beitrag entfernen">Entfernen</button>
                  </div>
                ))}
            </div>

            <div className="card">
              <h2>Im Kalender anlegen</h2>
              <div className="row" style={{ alignItems: 'flex-end' }}>
                <label className="field" style={{ flex: '0 1 220px' }}>
                  <span>Startwoche (beliebiger Tag der Woche)</span>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </label>
                <button className="btn primary" onClick={applyToCalendar} disabled={plan.slots.length === 0}>Vorlage anwenden</button>
                <a className="btn" href="#/kalender">Zum Kalender</a>
              </div>
              {message && <div className="demo-banner" role="status">{message}</div>}
              <p className="muted small" style={{ lineHeight: 1.5 }}>
                Wendest du dieselbe Vorlage erneut an, ersetzt sie ihre früheren Einträge im Kalender.
              </p>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
