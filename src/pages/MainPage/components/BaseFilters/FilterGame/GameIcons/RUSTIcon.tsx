import HexagonIcon from '@mui/icons-material/Hexagon';
import RUST_URL from '@src/assets/images/steamGames/rust.jpg';
import { selectedGame } from '@src/pages/MainPage/components/BaseFilters/FilterGame/gameTemplate';

const RUSTIcon = () => {
  const tempGame = selectedGame.find(({ gameId }) => gameId === 440);

  if (!tempGame) return <HexagonIcon sx={{ '& path': { fill: '#D0432C' } }} />;

  const { gameId, name } = tempGame;

  return <img alt={`${gameId} - ${name}`} loading="lazy" src={RUST_URL} width="20" />;
};

export default RUSTIcon;
