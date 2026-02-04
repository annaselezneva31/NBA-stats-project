import PlayerPage from "../pages/PlayerPage";
import MainPage from "../pages/MainPage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import ErrorPage from "../pages/ErrorPage";
import LeaderBoardPage from "../pages/LeaderBoardPage";
import SchedulePage from "../pages/SchedulePage";
import TeamPage from "../pages/TeamPage";

export const privateRoutes = [
  { path: "/login", element: LoginPage },
  { path: "/main", element: MainPage },
  { path: "/about", element: AboutPage },
  { path: "/leaderboard", element: LeaderBoardPage },
  { path: "/schedule", element: SchedulePage },
  { path: "/player/:id", element: PlayerPage },
  { path: "/team/:id", element: TeamPage },
  { path: "/error", element: ErrorPage },
];
