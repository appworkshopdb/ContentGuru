// Prüft einen Text gegen die aktiven Regeln.
// ctx: { channels: ['Instagram', ...], formatId: 'reel' }

export const splitList = (s) =>
  String(s || '')
    .split(/[,\n]/)
    .map((x) => x.trim())
    .filter(Boolean);

export function ruleApplies(rule, ctx) {
  if (!rule.active) return false;
  if (rule.channels.length && !(ctx.channels || []).some((c) => rule.channels.includes(c))) return false;
  if (rule.formats.length && !rule.formats.includes(ctx.formatId)) return false;
  return true;
}

export function evaluate(rules, text, ctx) {
  const t = text.toLowerCase();
  const hasAny = (list) => list.some((w) => t.includes(w.toLowerCase()));
  const active = rules.filter((r) => ruleApplies(r, ctx));
  const results = [];

  for (const rule of active) {
    const when = splitList(rule.when);
    if (when.length && !hasAny(when)) continue;
    const terms = splitList(rule.terms);

    if (rule.type === 'verbot') {
      const hits = terms.filter((w) => t.includes(w.toLowerCase()));
      if (hits.length) results.push({ rule, level: 'fail', detail: `Gefunden: ${hits.join(', ')}` });
    } else if (rule.type === 'pflicht') {
      if (terms.length && !hasAny(terms)) {
        results.push({ rule, level: 'fail', detail: `Es fehlt einer dieser Begriffe: ${terms.join(', ')}` });
      }
    } else {
      results.push({ rule, level: 'note', detail: '' });
    }
  }
  return { results, checked: active.length };
}
