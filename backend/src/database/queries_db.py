import os
from dotenv import load_dotenv
from pydantic import EmailStr
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash


from src.database.db import async_session_factory, async_engine, Base
from src.database.models import Users
from src.exceptions import NBALoginException, NBAException

load_dotenv()

ADMIN_PASS = os.getenv("ADMIN_PASS")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")


class QueriesDB:
    @staticmethod
    async def create_tables():
        async with async_engine.begin() as conn:
            # async_engine.echo = True
            await conn.run_sync(Base.metadata.drop_all) # delete all previous DB
            await conn.run_sync(Base.metadata.create_all)  # create new DB

    @staticmethod
    async def delete_tables():
        async with async_engine.begin() as conn:
            await conn.run_sync(Base.metadata.drop_all) # delete all previous DB

    @staticmethod
    async def add_admin():
        async with async_session_factory() as session:
            password = generate_password_hash(ADMIN_PASS, method="pbkdf2:sha256", salt_length=8)
            admin = Users(username=ADMIN_USERNAME, email=ADMIN_EMAIL, password=password, role="admin")
            session.add(admin)
            await session.flush()
            await session.commit()

    @staticmethod
    async def register_new_user(username: str, email: EmailStr, password: str) -> Users:
        async with async_session_factory() as session:
            try:
                password = generate_password_hash(password, method="pbkdf2:sha256", salt_length=8)
                new_user = Users(username=username, email=email, password=password, role="user")
                session.add(new_user)
                await session.flush() # send changes to db but does not commit
                await session.commit()
                await session.refresh(new_user)  # load the assigned ID
                return new_user
            except IntegrityError as e:
                # Rollback session to avoid blocking future queries
                await session.rollback()
                msg = str(e.orig)
                if "username" in msg:
                    raise NBALoginException(f"Username '{username}' already exists")
                elif "email" in msg:
                    raise NBALoginException(f"Email '{email}' already exists")
                else:
                    raise NBALoginException(f"User with given credentials already exists")
            except Exception as e:
                raise NBAException(str(e))

    @staticmethod
    async def login_user(email: EmailStr, password: str):
        async with async_session_factory() as session:
            result = await session.execute(select(Users).where(Users.email == email))
            user = result.scalars().first()
            if user is None:
                raise NBALoginException("User not found")

            if not check_password_hash(user.password, password):
                raise NBALoginException("Wrong password")

            return {'login': True, 'message': 'User is logged in', 'id': user.id}



