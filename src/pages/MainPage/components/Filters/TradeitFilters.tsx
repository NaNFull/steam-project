import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import type { IconButtonProps } from '@mui/material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Stack,
  styled,
  TextField
} from '@mui/material';
import { grey } from '@mui/material/colors';
import type { ITradeitGameIds } from '@src/model/tradeitModel.types';
import { useSteamStore } from '@src/store/steam.store';
import { type ChangeEventHandler, type FocusEventHandler, useCallback, useState } from 'react';
import { useBoolean } from 'usehooks-ts';
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ expand, theme }) => ({
  marginLeft: 'auto',
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export interface SelectedGame {
  id: number;
  gameId: ITradeitGameIds;
  name: string;
  icon: string;
}

const selectedGame: SelectedGame[] = [
  {
    gameId: 730,
    icon: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/730/8dbc71957312bbd3baea65848b545be9eae2a355.jpg',
    id: 0,
    name: 'CS2'
  },
  {
    gameId: 252_490,
    icon: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/252490/820be4782639f9c4b64fa3ca7e6c26a95ae4fd1c.jpg',
    id: 1,
    name: 'RUST'
  },
  {
    gameId: 440,
    icon: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/440/e3f595a92552da3d664ad00277fad2107345f743.jpg',
    id: 2,
    name: 'TF2'
  },
  {
    gameId: 753,
    icon: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/753/1d0167575d746dadea7706685c0f3c01c8aeb6d8.jpg',
    id: 3,
    name: 'STEAM'
  }
];

function TradeitFilters() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100_000);
  const [gameId, setGameId] = useState<ITradeitGameIds>(selectedGame[0].gameId);
  const { toggle: toggleExpanded, value: expanded } = useBoolean(true);
  const getTradeitData = useSteamStore(({ getTradeitData }) => getTradeitData);

  const onSetGameId = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      const tempValue = Number.parseInt(value, 10);

      switch (tempValue) {
        case 730:
        case 252_490:
        case 440:
        case 753: {
          setGameId(tempValue);
        }
      }
    },
    [setGameId]
  );
  const handleInputMin = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      setMinPrice(value === '' ? 0 : Number(value));
    },
    [setMinPrice]
  );
  const blurInputMin = useCallback<FocusEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      const tempValue = value === '' ? 0 : Number(value);

      if (tempValue < 0) {
        setMinPrice(0);
      } else if (100_000 < tempValue) {
        setMinPrice(100_000);
      }
    },
    [setMinPrice]
  );
  const handleInputMax = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      setMaxPrice(value === '' ? 0 : Number(value));
    },
    [setMaxPrice]
  );
  const blurInputMax = useCallback<FocusEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      const tempValue = value === '' ? 0 : Number(value);

      if (tempValue < 0) {
        setMaxPrice(0);
      } else if (100_000 < tempValue) {
        setMaxPrice(100_000);
      }
    },
    [setMaxPrice]
  );

  return (
    <Card aria-label="Взаимодействие с сайтом Tradeit">
      <CardHeader
        sx={{ bgcolor: grey[800] }}
        action={
          <ExpandMore aria-expanded={expanded} aria-label="Скрыть карточку" expand={expanded} onClick={toggleExpanded}>
            <ExpandMoreIcon />
          </ExpandMore>
        }
        avatar={
          <Avatar
            aria-label="Лого Tradeit"
            src="https://tradeit.gg/_ipx/w_170/images/logo-full.svg"
            sx={{ borderRadius: 0, height: 32, width: 'auto' }}
          />
        }
      />
      <Collapse unmountOnExit in={expanded} timeout="auto">
        <CardContent>
          <Stack direction="row" spacing={1}>
            <Box>
              <InputLabel htmlFor="formatted-text-mask-input">Игра</InputLabel>
              <TextField
                select
                defaultValue={selectedGame[0].gameId}
                id="standard-select-currency"
                sx={{ width: 120 }}
                value={gameId}
                variant="standard"
                onChange={onSetGameId}
              >
                {selectedGame.map(({ gameId, icon, name }) => (
                  <MenuItem key={gameId} sx={{ '& > img': { flexShrink: 0, mr: 2 } }} value={gameId}>
                    <Box alignItems="center" columnGap={1} display="flex">
                      <img alt={`${gameId} - ${name}`} loading="lazy" src={icon} width="20" />
                      {name}
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box>
              <InputLabel htmlFor="formatted-text-mask-input">Цена</InputLabel>
              <Stack direction="row" spacing={1}>
                <TextField
                  id="input-remainder"
                  sx={{ width: 140 }}
                  value={minPrice}
                  variant="standard"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                  onBlur={blurInputMin}
                  onChange={handleInputMin}
                />
                <HorizontalRuleIcon />
                <TextField
                  id="input-profit"
                  sx={{ width: 140 }}
                  value={maxPrice}
                  variant="standard"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                  onBlur={blurInputMax}
                  onChange={handleInputMax}
                />
              </Stack>
            </Box>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'end' }}>
          <Button variant="contained" onClick={getTradeitData}>
            Загрузить данные с Tradeit
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );
}

export default TradeitFilters;
