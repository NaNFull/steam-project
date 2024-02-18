import { Box, InputLabel, MenuItem, TextField } from '@mui/material';

import { usePresent } from './hooks/usePresent';

function FilterGame() {
  const { data, defaultValue, gameId, onSetGameId } = usePresent();

  return (
    <Box>
      <InputLabel htmlFor="formatted-text-mask-input">Игра</InputLabel>
      <TextField
        select
        defaultValue={defaultValue}
        id="standard-select-currency"
        sx={{ width: 120 }}
        value={gameId}
        variant="standard"
        onChange={onSetGameId}
      >
        {data.map(({ ComponentIcon, gameId, name }) => (
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
