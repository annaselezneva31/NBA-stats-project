from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from src.router import nba_router

app = FastAPI()

app.include_router(nba_router)

# CORS: List of allowed origins (e.g., your frontend application's URL)
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specific origins
    allow_credentials=True, # Allows cookies/authorization headers to be sent
    allow_methods=["*"],    # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],    # Allows all headers
)


if __name__ == '__main__':
    uvicorn.run(
        app='src.main:app',
    )