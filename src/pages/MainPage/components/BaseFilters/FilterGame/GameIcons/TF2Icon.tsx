import HexagonIcon from '@mui/icons-material/Hexagon';
import TF2_URL from '@src/assets/images/steamGames/tf2.jpg';
import { selectedGame } from '@src/pages/MainPage/components/BaseFilters/FilterGame/gameTemplate';

const TF2Icon = () => {
  const tempGame = selectedGame.find(({ gameId }) => gameId === 440);

  if (!tempGame) return <HexagonIcon sx={{ '& path': { fill: '#C48023' } }} />;

  const { gameId, name } = tempGame;

  return <img alt={`${gameId} - ${name}`} loading="lazy" src={TF2_URL} width="20" />;
};

export default TF2Icon;
