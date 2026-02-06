import uvicorn
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from typing import AsyncGenerator
from fastapi.middleware.cors import CORSMiddleware

from src.router import nba_router
from src.database.queries_db import QueriesDB
from src.exceptions import NBAException, NBALoginException

db = QueriesDB()

@asynccontextmanager
async def lifespan(app: FastAPI)  -> AsyncGenerator[None, None]:
    # app startup
    await db.create_tables()
    await db.add_admin()
    yield
    # app teardown
    await db.delete_tables()

nba_app = FastAPI(lifespan=lifespan)
nba_app.include_router(nba_router)

@nba_app.exception_handler(NBAException)
async def nba_app_exception_handler(req: Request, exc: NBAException):
    """
    Handles all NBAException-derived exceptions.
    """
    if isinstance(exc, NBALoginException):
        status_code = 400
    else:
        status_code = 500
    return JSONResponse(status_code=status_code,
                        content={"status_code": status_code, "errors": exc.message})

@nba_app.exception_handler(RequestValidationError)
async def nba_app_validation_exception_handler(req: Request, exc: RequestValidationError):
    """
    Handles Pydantic-derived exceptions.
    """
    errors = [{"field": e["loc"][-1], "message": e["msg"]} for e in exc.errors()]
    return JSONResponse(status_code=400,
                        content={"status_code": 400, "errors": errors})

@nba_app.exception_handler(Exception)
async def nba_app_global_exception_handler(req: Request, exc: Exception):
    """
    Handles catch-all unexpected errors
    """
    return JSONResponse(status_code=500,
                        content={"status_code": 500, "errors": f"Unexpected error: {str(exc)}"})

# CORS: List of allowed origins (e.g., your frontend application's URL)
origins = [
    "http://localhost:3000",
]

nba_app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specific origins
    allow_credentials=True, # Allows cookies/authorization headers to be sent
    allow_methods=["*"],    # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],    # Allows all headers
)


if __name__ == '__main__':
    uvicorn.run(
        app='src.main:nba_app',
    )