import HexagonIcon from '@mui/icons-material/Hexagon';
import CS2_URL from '@src/assets/images/steamGames/cs2.jpg';
import { selectedGame } from '@src/pages/MainPage/components/BaseFilters/FilterGame/gameTemplate';

const CS2Icon = () => {
  const tempGame = selectedGame.find(({ gameId }) => gameId === 730);

  if (!tempGame) return <HexagonIcon sx={{ '& path': { fill: '#F7AA25' } }} />;

  const { gameId, name } = tempGame;

  return <img alt={`${gameId} - ${name}`} loading="lazy" src={CS2_URL} width="20" />;
};

export default CS2Icon;
