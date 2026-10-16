# Datenvertrag

Dieser Vertrag beschreibt, welche Daten das Backend aus der Shadow-DB der JTL-Wawi braucht und in welcher Form es sie liefert. Die Spalten- und Tabellennamen der Shadow-DB werden ergänzt, sobald das Schema vorliegt.

## Benötigte Daten aus der Shadow-DB

| Gruppe | Felder | Aktualisierung | Quelle in der Shadow-DB |
| --- | --- | --- | --- |
| Artikel | Artikelnummer, Name, Marke, Kategorie, Shop-Link, Bild | täglich | offen |
| Preis | aktueller Preis, UVP, niedrigster Preis der letzten 30 Tage | täglich | offen |
| Bestand | verfügbare Menge, Lieferzeit, B-Ware-Kennzeichen | mehrfach täglich | offen |
| Verkäufe | Stück pro Zeitraum (7, 30, 90 Tage), Lagerdauer | täglich | offen |
| Aktionen | Name, Zeitraum, betroffene Artikel, Rabatt | täglich | offen |
| Neuheiten | Anlagedatum, Artikel | täglich | offen |
| Marge | Einkaufspreis oder Marge je Artikel (nur intern) | wöchentlich | offen |

## Antworten des Backends

`GET /api/today` liefert:

```json
{
  "stats": [{ "label": "...", "value": "...", "note": "..." }],
  "ideas": [
    {
      "id": "string",
      "score": 71,
      "channel": "Instagram Reel, TikTok",
      "pillar": "Angebot und Aktion",
      "trigger": "B-Ware-Einzelstück",
      "title": "string",
      "why": "string",
      "data": "Sale-Liste, Bestand",
      "detail": null
    }
  ],
  "events": [{ "date": "25.10.", "name": "Zeitumstellung", "note": "string" }],
  "mix": [{ "name": "Angebot und Aktion", "share": 46 }],
  "sources": [{ "name": "Bestand", "state": "heute 06:30 Uhr" }]
}
```

`GET /api/calendar` liefert:

```json
{
  "events": { "2026-11-27": [{ "type": "anlass", "text": "Black Friday" }] },
  "suggestions": [{ "date": "Do 12.11.", "pillar": "Community", "title": "string" }]
}
```

Erlaubte Werte für `type`: `anlass`, `idee`, `entwurf`.

Ein Beispiel für ein vollständiges `detail`-Objekt steht in `frontend/src/data/demo.js`.

## Regeln

- Das Backend liest die Shadow-DB nur lesend, mit einem eigenen Benutzer mit Leserechten.
- Vor der Ausgabe werden Preis, Rabatt und Bestand erneut geprüft.
- Marge und Einkaufspreis werden nur für die Berechnung des Scores verwendet und nie an das Frontend geliefert.
