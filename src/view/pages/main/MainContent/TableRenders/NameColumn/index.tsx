import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, IconButton, Link, Stack } from '@mui/material';
import type { IDataItemInventory } from '@src/store/types.store';

import SkinImage from '../SkinImage';
import { usePresent } from './hooks/usePresent';

function NameColumn({ counts, id, imgURL, name, steamAppId }: IDataItemInventory) {
  const { handleClick } = usePresent(name);

  return (
    <Box
      key={id}
      aria-label="Предмет"
      className="name_column"
      sx={{
        alignItems: 'center',
        display: 'flex',
        gap: '1rem',
      }}
    >
      <SkinImage counts={counts} imgURL={imgURL} />
      <Stack alignItems="center" direction="row" spacing={1}>
        <Link
          color="inherit"
          href={`https://steamcommunity.com/market/listings/${steamAppId}/${name}`}
          target="_blank"
          underline="hover"
        >
          {name}
        </Link>
        <IconButton aria-label="copy" size="small" onClick={handleClick}>
          <ContentCopyIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default NameColumn;
