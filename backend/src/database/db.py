from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import String
from typing import Annotated

from src.database.config_db import settings

# creating engine
async_engine = create_async_engine(url=settings.DATABASE_URL_asyncpg)

# Configure Session factory that will have predecided parameters, returns a ClASS, not an INSTANCE
async_session_factory = async_sessionmaker(async_engine)

str_256 = Annotated[str, 200]

class Base(DeclarativeBase):
    type_annotation_map = {
        str_256: String(256),
    }

    repr_cols_num = 3
    repr_cols = tuple()

    def __repr__(self):
        """
        Relationships are not used in repr(), as they can lead to unexpected loadings
        """
        # cols = [f'{col}={getattr(self, col)}' for col in self.__table__.columns.keys()]
        cols = []
        for i, col in enumerate(self.__table__.columns.keys()):
            if col in self.repr_cols or i < self.repr_cols_num:
                cols.append(f'{col}={getattr(self, col)}')
        return f"<{self.__class__.__name__} {', '.join(cols)}>"
