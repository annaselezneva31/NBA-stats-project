from src.nba_client import NBAApiClient

class NBAService:
    def __init__(self):
        self.client = NBAApiClient()

    def get_list_of_teams(self):
        return self.client.get_list_of_teams()

    def get_list_of_players(self):
        return self.client.get_list_of_players()

    def get_leader_board(self, season_user: str, season_type_user: str, stat_filter_user: str, mode_user: str) -> dict:
        return self.client.get_leader_board(season_user=season_user,
                                            season_type_user=season_type_user,
                                            stat_filter_user=stat_filter_user,
                                            mode_user=mode_user)['resultSet']

    def _get_player_all_stats(self, player_id: str):
        stats = self.client.get_player_stats(player_id)['resultSets']
        season_totals = []
        career_highs = None
        player_teams_curr_year = []
        middleware = stats[0]['rowSet']
        for stat in middleware[::-1]:
            if not player_teams_curr_year:
                player_teams_curr_year.append({
                    'id': stat[3],
                    'name': stat[4],
                    'season': stat[1],
                })
                continue

            if player_teams_curr_year[0]['season'] != stat[1]:
                break

            player_teams_curr_year.insert(0, {
                'id': stat[3],
                'name': stat[4],
                'season': stat[1],
            })

        for stat in stats:
            if len(stat['rowSet']) == 0:
                continue

            if 'SeasonTotals' in stat['name']:
                season_totals.append(stat)

            if stat['name'] == 'CareerHighs':
                career_highs = stat

        return {'career_highs': career_highs, 'season_totals': season_totals, 'player_teams_curr_year': player_teams_curr_year}

    def get_shot_chart_data(self, player_id: str, season_user: str, team_id: str, season_type_user: str):
        response = self.client.get_player_shot_chart_data(player_id, season_user, team_id, season_type_user)[0]
        shot_data = response[['LOC_X', 'LOC_Y', 'SHOT_MADE_FLAG']]
        return {'shot_data': shot_data.to_dict(orient='records')}

    def get_player_common_info(self, player_id: str):
        response = self.client.get_player_common_info(player_id)
        common_info_df = response[0][['PERSON_ID', 'DISPLAY_FIRST_LAST', 'BIRTHDATE', 'COUNTRY', 'SCHOOL',
                           "HEIGHT", "WEIGHT", "JERSEY", "POSITION", "ROSTERSTATUS", "TEAM_ID",
                           "TEAM_NAME", "TEAM_ABBREVIATION", "TEAM_CITY", "FROM_YEAR", "TO_YEAR",
                           "DRAFT_YEAR", "DRAFT_ROUND", "DRAFT_NUMBER"]]
        [common_info] = common_info_df.to_dict(orient='records')
        career_highs = self._get_player_all_stats(player_id)['career_highs']
        player_teams_curr_year = self._get_player_all_stats(player_id)['player_teams_curr_year']

        return {'common_info': common_info, 'career_highs': career_highs, 'player_teams_curr_year': player_teams_curr_year}

    def get_player_stats(self, player_id: str):
        season_totals = self._get_player_all_stats(player_id)['season_totals']
        return {'season_totals': season_totals}