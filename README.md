# ContentGuru (Content-Kompass für SOUND.de)

Internes Tool, das dem Marketing-Team jeden Morgen priorisierte Content-Ideen für Social Media und Newsletter vorschlägt. Grundlage sind Shop-Daten (Aktionen, Sale, Renner/Penner, Neuheiten, Bestand), Termine (Black Friday, Weihnachten) sowie Branchen- und Trendsignale.

## Aufbau

| Ordner | Inhalt | Status |
| --- | --- | --- |
| `frontend/` | Web-App (Vite, React) mit Tagesansicht, Ideen-Detail und Content-Kalender | Demo-Daten, läuft auf GitHub Pages |
| `backend/` | API (FastAPI), liest später die Shadow-DB der JTL-Wawi (nur lesend) | Gerüst, noch nicht angebunden |
| `docs/` | Datenvertrag zwischen Shadow-DB, Backend und Frontend | Entwurf |

## Frontend lokal starten

```bash
cd frontend
npm install
npm run dev
```

Das Frontend läuft im Demo-Modus, solange `VITE_API_URL` nicht gesetzt ist. Zum Anbinden des Backends eine Datei `frontend/.env.local` mit `VITE_API_URL=http://localhost:8000` anlegen.

## Backend lokal starten (Gerüst)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # Zugangsdaten nur lokal eintragen
uvicorn app.main:app --reload
```

## GitHub Pages einrichten

1. Im Repository unter **Settings, Pages** als Quelle **GitHub Actions** wählen.
2. Ein Push auf `main` startet den Workflow `.github/workflows/pages.yml`, der das Frontend baut und veröffentlicht.
3. Die Seite ist danach unter `https://<konto>.github.io/<repo>/` erreichbar.

## Sicherheit: bitte beachten

- GitHub Pages veröffentlicht nur das Frontend. Es enthält ausschließlich Demo-Daten.
- Zugangsdaten zur Shadow-DB gehören nie ins Repository, nur in die lokale `.env` des Backends (ist in `.gitignore`).
- Die Shadow-DB liegt auf einer VM und wird nur vom Backend gelesen, nie direkt vom Browser. Das Backend läuft intern, die Seite auf Pages bleibt reine Demo, bis das Backend geschützt erreichbar ist.
- Das Repository ist derzeit öffentlich. Echte Preise, Margen oder Bestandsdaten dürfen hier nicht eingecheckt werden.

## Nächste Schritte

1. Schema der Shadow-DB klären und `docs/DATENVERTRAG.md` mit echten Tabellen und Spalten füllen.
2. `backend/app/shadow_db.py` implementieren (Artikel, Bestand, Renner/Penner, Aktionen, Neuheiten).
3. Regel-Engine und Score (siehe Konzept) im Backend umsetzen.
4. Tageszustellung per Slack, Teams oder Mail anbinden.
