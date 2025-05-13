import os
import dotenv as env
from typing import Generator
from sqlmodel import Session, create_engine


env.load_dotenv()
engine = create_engine(os.getenv('DATABASE_URL'))


def get_db() -> Generator[Session, None, None]:
    global engine
    session = Session(bind=engine)
    try:
        yield session
    finally:
        session.close()