import HexagonIcon from '@mui/icons-material/Hexagon';
import STEAM_URL from '@src/assets/images/steamGames/steam.jpg';
import { selectedGame } from '@src/pages/MainPage/components/BaseFilters/FilterGame/gameTemplate';

const STEAMIcon = () => {
  const tempGame = selectedGame.find(({ gameId }) => gameId === 753);

  if (!tempGame) return <HexagonIcon sx={{ '& path': { fill: '#1B2838' } }} />;

  const { gameId, name } = tempGame;

  return <img alt={`${gameId} - ${name}`} loading="lazy" src={STEAM_URL} width="20" />;
};

export default STEAMIcon;
