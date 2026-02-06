import datetime
import enum
from typing import Optional, Annotated
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey, text, CheckConstraint, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database.db import Base, str_256

intpk = Annotated[int, mapped_column(primary_key=True)]
created_at = Annotated[datetime.datetime, mapped_column(server_default=text("TIMEZONE('utc', now())"))]

class Roles(enum.Enum):
    admin = 'admin'
    user = 'user'

class Users(Base):
    __tablename__ = "users"
    id: Mapped[intpk]
    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]
    role: Mapped[Roles]
    # comments = relationship("Comments", back_populates="user")

# class Comments(Base):
#     __tablename__ = "comments"
#     id: Mapped[intpk]
#     author_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
#     author = relationship("Users", back_populates="comments")
#     text: Mapped[str_256] = mapped_column(String(50))
#     created_at: Mapped[created_at]
