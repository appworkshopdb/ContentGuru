from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from . import shadow_db
from .config import settings

app = FastAPI(title="Content-Kompass API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.allowed_origin],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok", "shadow_db_configured": settings.db_configured}


@app.get("/api/today")
def today():
    """Tagesansicht. Wird in Phase 1 aus den Daten der Shadow-DB und der Ideen-Engine gebaut."""
    try:
        shadow_db.get_articles_with_stock()
    except shadow_db.ShadowDbNotReady as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    raise HTTPException(status_code=501, detail="Ideen-Engine ist noch nicht implementiert.")


@app.get("/api/calendar")
def calendar():
    raise HTTPException(status_code=501, detail="Kalender-Endpunkt ist noch nicht implementiert.")
