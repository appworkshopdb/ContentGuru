import os

from dotenv import load_dotenv

load_dotenv()


class Settings:
    db_host = os.getenv("SHADOW_DB_HOST", "")
    db_port = int(os.getenv("SHADOW_DB_PORT", "1433"))
    db_name = os.getenv("SHADOW_DB_NAME", "")
    db_user = os.getenv("SHADOW_DB_USER", "")
    db_password = os.getenv("SHADOW_DB_PASSWORD", "")
    allowed_origin = os.getenv("ALLOWED_ORIGIN", "http://localhost:5173")

    @property
    def db_configured(self) -> bool:
        return bool(self.db_host and self.db_name and self.db_user)


settings = Settings()
