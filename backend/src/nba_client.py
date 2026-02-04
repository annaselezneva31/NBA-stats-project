from nba_api.stats.endpoints import shotchartdetail, playercareerstats, commonplayerinfo, LeagueLeaders, teaminfocommon
from nba_api.stats.static import players, teams
from src.utils import error_handler

custom_headers = {
    'Host': 'stats.nba.com',
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
}

class NBAApiClient:
    @staticmethod
    @error_handler
    def get_list_of_teams() -> list:
        return teams.get_teams()

    @staticmethod
    @error_handler
    def get_list_of_players() -> list:
        return players.get_players()

    @staticmethod
    @error_handler
    def get_player_common_info(player_id: str) -> dict:
        response = commonplayerinfo.CommonPlayerInfo(player_id=player_id)
        return response.get_data_frames()

    @staticmethod
    @error_handler
    def get_player_shot_chart_data(player_id: str, season_user: str, team_id: str, season_type_user: str):
        response = shotchartdetail.ShotChartDetail(
                    team_id=team_id,
                    player_id=player_id,
                    context_measure_simple='FGA',
                    season_nullable=season_user,
                    season_type_all_star=season_type_user,
                )
        return response.get_data_frames()

    @staticmethod
    @error_handler
    def get_player_stats(player_id: str):
        response = playercareerstats.PlayerCareerStats(player_id=player_id)
        return response.get_dict()

    @staticmethod
    @error_handler
    def get_team_by_id(team_id: str):
        response = teaminfocommon.TeamInfoCommon(team_id=team_id)
        return response.get_dict()

    @staticmethod
    @error_handler
    def get_leader_board(season_user: str, season_type_user: str, stat_filter_user: str, mode_user: str) -> dict:
        response = LeagueLeaders(season=season_user,
                                   scope="S",
                                   season_type_all_star=season_type_user,
                                   stat_category_abbreviation=stat_filter_user,
                                   per_mode48=mode_user,
                                   headers=custom_headers,
                                   timeout=100)
        return response.get_dict()

    # def schedule_page():
    #     schedule_whole = nba_ep.ScheduleLeagueV2(season="2025-26").get_data_frames()
    #     schedule = schedule_whole[0][
    #         ["gameDate", "gameStatusText", "gameLabel", "arenaCity", "homeTeam_teamName", "awayTeam_teamName",
    #          "homeTeam_score", "awayTeam_score"]]
    #     return render_template("schedule.html",
    #                            tables=[schedule.to_html(classes='table table-stripped hover order-column',
    #                                                     index=False,
    #                                                     table_id="data")])