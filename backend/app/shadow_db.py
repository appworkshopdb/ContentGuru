"""Zugriff auf die Shadow-DB der JTL-Wawi (nur lesend).

Diese Datei ist die einzige Stelle, die die Datenbank kennt. Alle Funktionen liefern einfache
Python-Strukturen, die dem Datenvertrag in docs/DATENVERTRAG.md entsprechen. Tabellen- und Spaltennamen
werden erst eingetragen, wenn das Schema der Shadow-DB bekannt ist.
"""

from .config import settings


class ShadowDbNotReady(RuntimeError):
    pass


def _connect():
    if not settings.db_configured:
        raise ShadowDbNotReady("Shadow-DB ist nicht konfiguriert (siehe backend/.env.example).")
    # TODO: Verbindung aufbauen, z. B. mit pyodbc. Nur ein Benutzer mit Leserechten verwenden.
    raise ShadowDbNotReady("Verbindung zur Shadow-DB ist noch nicht implementiert.")


def get_articles_with_stock() -> list[dict]:
    """Artikel mit Preis, UVP, Bestand und Lieferzeit."""
    _connect()
    return []


def get_sales_ranking() -> list[dict]:
    """Renner und Penner: Verkäufe und Lagerdauer pro Artikel."""
    _connect()
    return []


def get_promotions() -> list[dict]:
    """Laufende und geplante Aktionen."""
    _connect()
    return []


def get_new_articles() -> list[dict]:
    """Neu angelegte Artikel."""
    _connect()
    return []
