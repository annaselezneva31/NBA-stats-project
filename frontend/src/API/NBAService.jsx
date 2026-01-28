import axios from "axios";

export default class NBAService {
  static async getListOfPlayers() {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/players`);
    return response.data;
  }

  static async getPlayerById(player_id) {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/player/${player_id}/common_info`,
    );
    return response.data;
  }

  static async getPlayerStats(player_id) {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/player/${player_id}/player_stats`,
    );
    return response.data;
  }

  static async getPlayerShotChartData(
    player_id,
    season_user,
    team_id,
    season_type_user,
  ) {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/player/${player_id}/shot_chart_data`,
      {
        params: {
          season_user,
          team_id,
          season_type_user,
        },
      },
    );
    return response.data;
  }
}
