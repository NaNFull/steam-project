import { Box, InputLabel, MenuItem, TextField } from '@mui/material';
import type { ITradeitGameIds } from '@src/model/tradeitModel.types';
import { selectedGame } from '@src/pages/MainPage/components/BaseFilters/FilterGame/gameTemplate';
import { type ChangeEventHandler, useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';

function FilterGame() {
  const [gameId, setGameId] = useLocalStorage<ITradeitGameIds>('filterGameIdTradeit', selectedGame[1].gameId);

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

  return (
    <Box>
      <InputLabel htmlFor="formatted-text-mask-input">Игра</InputLabel>
      <TextField
        select
        defaultValue={selectedGame[1].gameId}
        id="standard-select-currency"
        sx={{ width: 120 }}
        value={gameId}
        variant="standard"
        onChange={onSetGameId}
      >
        {selectedGame.slice(1).map(({ ComponentIcon, gameId, name }) => (
          <MenuItem key={gameId} value={gameId}>
            <Box alignItems="center" columnGap={1} display="flex" sx={{ '& img': { borderRadius: 1 } }}>
              <ComponentIcon />
              {name}
            </Box>
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default FilterGame;
