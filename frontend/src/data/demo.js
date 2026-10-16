// Demo-Daten für das Frontend. Preise und Bestand sind Beispiele (Stand Startseite sound.de, 16.10.2026).
// Im Betrieb ersetzt die API (siehe src/api.js) diese Daten durch Werte aus der Shadow-DB.

export const ideas = [
  {
    id: 'dashcam-zeitumstellung',
    score: 84,
    channel: 'Instagram Story',
    pillar: 'Produkt im Einsatz',
    trigger: 'Zeitumstellung 25.10.',
    title: 'Am Sonntag wird es früher dunkel: Dashcam als Sicherheits-Tipp',
    why: 'Die Uhren werden am 25.10. umgestellt, die Abendfahrten beginnen früher. Passt zu Dashcams und Kameras im Sortiment, die Kenwood DRV-A510 gibt es aktuell als B-Ware.',
    data: 'Kalender, Sale-Liste',
    detail: null,
  },
  {
    id: 'black-friday-countdown',
    score: 78,
    channel: 'Story, Newsletter',
    pillar: 'Angebot und Aktion',
    trigger: 'Black Friday in 42 Tagen',
    title: 'Wunschliste anlegen und Frühzugang zum Black Friday sichern',
    why: 'Der Vorlauf startet am 16.11. Wer früh Wunschlisten und Newsletter-Anmeldungen sammelt, hat am 27.11. eine warme Zielgruppe.',
    data: 'Kalender, Newsletter-Anmeldungen',
    detail: null,
  },
  {
    id: 'jbl-bassprotube-bware',
    score: 71,
    channel: 'Instagram Reel, TikTok',
    pillar: 'Angebot und Aktion',
    trigger: 'B-Ware-Einzelstück',
    title: 'B-Ware-Check: JBL BASSPRO Tube 12 mit Zustandsprüfung und Preis-Reveal',
    why: '239,00 € statt UVP 349,50 €, rund 32 % unter UVP. Einzelstück-Knappheit und ein starker Vorher-Nachher-Hook.',
    data: 'Sale-Liste, Bestand',
    detail: {
      tags: ['Instagram Reel', 'TikTok', 'Angebot und Aktion', 'B-Ware-Einzelstück'],
      whyNow:
        'B-Ware-Einzelstück mit hohem Preisvorteil: 239,00 € statt UVP 349,50 €, das sind rund 32 % unter UVP. Der Artikel liegt auf der Sale-Liste. Knappheit und ein klarer Vorher-Nachher-Hook machen ihn zu einem guten Kandidaten für ein kurzes Video.',
      hook: 'Der Subwoofer kostet neu 349,50 € (UVP). Wir haben ihn geprüft: Was taugt die B-Ware wirklich?',
      scenes: [
        { time: '0-3 s', title: 'Hook', text: 'Karton auf dem Tisch, Text: Neu 349,50 € (UVP). Was taugt die B-Ware?' },
        { time: '3-12 s', title: 'Auspacken und Prüfen', text: 'Gehäuse, Anschlüsse und Membran in Nahaufnahme, Zustand ehrlich benennen.' },
        { time: '12-24 s', title: 'Bass-Test', text: 'Kurzer Soundcheck im Auto oder Teststand, Pegelanzeige als Einblendung.' },
        { time: '24-30 s', title: 'Preis-Reveal', text: '239,00 € als große Einblendung, Hinweis auf Einzelstück, Link in der Bio.' },
      ],
      caption:
        'B-Ware, aber bereit für Bass. Wir haben den JBL BASSPRO Tube 12 geprüft und zeigen euch, was drin steckt.\n\nJetzt 239,00 € statt UVP 349,50 €. Es ist ein Einzelstück, der Zustand steht auf der Artikelseite.\n\nLink in der Bio. Fragen? Unser Team berät euch Mo bis Fr von 10 bis 17 Uhr.\n\n#carhifi #subwoofer #jbl #bware #soundde',
      captionNote:
        'Hinweis des Tools: Bei einem Preisvergleich mit Ermäßigung bitte die Angabe des niedrigsten Preises der letzten 30 Tage prüfen.',
      brief: [
        'Hochformat 9:16, Karton und Subwoofer in einer Totalen, dann Nahaufnahme der Membran und des Gehäuses',
        'Einblendung des Zustandschecks als Textkarte, ohne Herstellerlogos auf Fremdmaterial',
        'Letztes Bild: Preis-Reveal mit Shop-Link, Farben der Marke SOUND.de',
      ],
      criteria: [
        { name: 'Geschäftswert', value: 26, max: 30 },
        { name: 'Zeitnähe des Anlasses', value: 10, max: 25 },
        { name: 'Reichweitenpotenzial', value: 14, max: 20 },
        { name: 'Verfügbarkeit', value: 12, max: 15 },
        { name: 'Abwechslung', value: 9, max: 10 },
      ],
      checks: [
        { done: true, text: 'Preis und Rabatt gegen den Shop geprüft' },
        { done: true, text: 'Bestand live geprüft, Einzelstück vorhanden' },
        { done: false, text: 'B-Ware-Zustand in Caption oder Einblendung genannt' },
        { done: false, text: 'Niedrigster Preis der letzten 30 Tage bei Ermäßigung angegeben' },
        { done: false, text: 'Musik aus kommerziell zugelassener Bibliothek' },
        { done: false, text: 'Freigabe durch das Marketing-Team' },
      ],
    },
  },
  {
    id: 'sony-xs692es-bware',
    score: 68,
    channel: 'YouTube Short, Reel',
    pillar: 'Angebot und Aktion',
    trigger: 'Sale-Artikel',
    title: '410 € gegen 192 €: Sony XS-692ES als B-Ware im Soundcheck',
    why: 'Rund 53 % unter UVP. Der Preisvergleich ist der Hook, der Soundcheck liefert Vertrauen.',
    data: 'Sale-Liste',
    detail: null,
  },
  {
    id: 'hifonics-zeus-ford',
    score: 64,
    channel: 'Instagram Karussell, Facebook',
    pillar: 'Dein Auto, dein Sound',
    trigger: 'Fahrzeugserie',
    title: 'Upgrade in 10 Minuten: Hifonics ZEUS ZSF 6.2C für Ford',
    why: '229,00 €, sofort verfügbar, Lieferzeit 1 bis 3 Werktage. Gut für die Reihe fahrzeugspezifischer Upgrades.',
    data: 'Highlights, Bestand',
    detail: null,
  },
];

export const upcomingEvents = [
  { date: '25.10.', name: 'Zeitumstellung', note: 'in 9 Tagen, Thema Abendfahrt und Sicht' },
  { date: '31.10.', name: 'Halloween', note: 'in 15 Tagen, Bass-Test Gruselsound' },
  { date: '11.11.', name: 'Singles’ Day', note: 'in 26 Tagen, Solo-Angebote aus Restposten' },
  { date: '27.11.', name: 'Black Friday', note: 'in 42 Tagen, Vorlauf ab 16.11.' },
];

export const mix = [
  { name: 'Angebot und Aktion', share: 46 },
  { name: 'Produkt im Einsatz', share: 22 },
  { name: 'Dein Auto, dein Sound', share: 16 },
  { name: 'Community', share: 10 },
  { name: 'Wissen und Ratgeber', share: 6 },
];

export const sources = [
  { name: 'Aktionen und Sale', state: 'heute 03:10 Uhr' },
  { name: 'Bestand', state: 'heute 06:30 Uhr' },
  { name: 'Renner und Penner', state: 'heute 03:10 Uhr' },
  { name: 'Kalender und Trends', state: 'heute 04:00 Uhr' },
];

export const stats = [
  { label: 'Neue Ideen heute', value: '5', note: '2 davon mit Anlass in den nächsten 10 Tagen' },
  { label: 'Bis Black Friday', value: '42 Tage', note: 'Freitag, 27.11.2026, Vorlauf ab 16.11.' },
  { label: 'Bestandshinweise', value: '2', note: 'Renner mit knappem Bestand, kein Push empfohlen' },
  { label: 'Annahmequote, letzte 4 Wochen', value: '38 %', note: 'Ziel im MVP: mindestens 30 %' },
];

// Kalender: Schlüssel = ISO-Datum. type: anlass | idee | entwurf
export const calendarEvents = {
  '2026-10-25': [{ type: 'anlass', text: 'Zeitumstellung' }],
  '2026-10-29': [{ type: 'idee', text: 'Reel: Gruselsound-Bass-Test' }],
  '2026-10-31': [{ type: 'anlass', text: 'Halloween' }],
  '2026-11-04': [{ type: 'idee', text: 'Karussell: DSP erklärt' }],
  '2026-11-06': [{ type: 'entwurf', text: 'Entwurf: Community-Repost' }],
  '2026-11-10': [{ type: 'idee', text: 'Story: Teaser Solo-Angebote' }],
  '2026-11-11': [
    { type: 'anlass', text: 'Singles’ Day, Martinstag' },
    { type: 'idee', text: 'Aktion: Solo-Angebote' },
  ],
  '2026-11-16': [{ type: 'anlass', text: 'Black-Friday-Vorlauf startet' }],
  '2026-11-17': [{ type: 'idee', text: 'Newsletter: Frühzugang' }],
  '2026-11-20': [{ type: 'entwurf', text: 'Entwurf: Geschenkideen-Teaser' }],
  '2026-11-24': [{ type: 'idee', text: 'Reel: Top 5 Vorschau' }],
  '2026-11-27': [
    { type: 'anlass', text: 'Black Friday' },
    { type: 'idee', text: 'Live-Stories mit Top-Deals' },
  ],
  '2026-11-29': [{ type: 'anlass', text: '1. Advent' }],
  '2026-11-30': [
    { type: 'anlass', text: 'Cyber Monday' },
    { type: 'idee', text: 'Reel: Radio-Lautsprecher-Bundles' },
  ],
  '2026-12-06': [{ type: 'anlass', text: 'Nikolaus' }],
};

export const suggestions = [
  { date: 'Do 12.11.', pillar: 'Community', title: 'Kundenvideo-Repost aus der Cashback-Aktion, mit Einbau-Highlights' },
  { date: 'Mi 18.11.', pillar: 'Wissen und Ratgeber', title: 'Welcher Subwoofer passt in meinen Kofferraum? Mit dem 3D-Kofferraum' },
  { date: 'Sa 21.11.', pillar: 'Marke und Team', title: 'Behind the Scenes: So geht ein Black-Friday-Paket aus dem Lager' },
];
