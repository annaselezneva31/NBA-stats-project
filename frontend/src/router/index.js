import PlayerPage from "../pages/PlayerPage";
import SearchPlayer from "../pages/SearchPlayer";

export const privateRoutes = [
  { path: "/player/:id", element: PlayerPage },
  { path: "/players", element: SearchPlayer },
];
