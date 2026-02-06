from fastapi import APIRouter

from src.nba_service import NBAService
from src.database.queries_db import QueriesDB
from src.database.schemas import UserRegister, UserLogin


nba_router = APIRouter()
nba_service = NBAService()
db = QueriesDB()


@nba_router.post("/api/v1/register")
async def register_new_user(user: UserRegister) -> dict:
    user = await db.register_new_user(username=user.username, email=user.email, password=user.password)
    return {"message": "User added", "id": user.id}

@nba_router.post("/api/v1/login")
async def login_user(user: UserLogin):
    return await db.login_user(email=user.email, password=user.password)

@nba_router.get("/api/v1/players")
def get_list_of_players() -> list[dict]:
    return nba_service.get_list_of_players()

@nba_router.get("/api/v1/teams")
def get_list_of_teams() -> list[dict]:
    return nba_service.get_list_of_teams()

@nba_router.get("/api/v1/leader_board")
def get_leader_board(season_user: str, season_type_user: str, stat_filter_user: str, mode_user: str) -> dict:
    return nba_service.get_leader_board(season_user=season_user,
                                       season_type_user=season_type_user,
                                       stat_filter_user=stat_filter_user,
                                       mode_user=mode_user)

@nba_router.get("/api/v1/player/{player_id}/common_info")
def get_player_common_info(player_id: str) -> dict:
    return nba_service.get_player_common_info(player_id=player_id)

@nba_router.get("/api/v1/player/{player_id}/player_stats")
def get_player_stats(player_id: str) -> dict:
    return nba_service.get_player_stats(player_id=player_id)


@nba_router.get("/api/v1/player/{player_id}/shot_chart_data")
def get_player_shot_chart_data(player_id: str, season_user: str, team_id: str, season_type_user: str) -> dict:
    return nba_service.get_shot_chart_data(player_id=player_id,
                                           season_user=season_user,
                                           team_id=team_id,
                                           season_type_user=season_type_user)