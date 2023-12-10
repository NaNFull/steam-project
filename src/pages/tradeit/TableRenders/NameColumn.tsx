import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, IconButton, Link, Stack } from '@mui/material';
import type { IDataItem } from '@src/pages/tradeit/types.ts';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

import SkinImage from './SkinImage.tsx';

function NameColumn({ count, id, imageId, name, steamAppId }: IDataItem) {
  const { enqueueSnackbar } = useSnackbar();

  // Сохранение в буфер названия предмета
  const handleClick = useCallback(async () => {
    await window.navigator.clipboard.writeText(name);
    enqueueSnackbar(`Скопировано в буфер: ${name}`, { variant: 'success' });
  }, [enqueueSnackbar, name]);

  return (
    <Box
      key={id}
      className="name_column"
      sx={{
        alignItems: 'center',
        display: 'flex',
        gap: '1rem'
      }}
    >
      <SkinImage count={count} gameId={steamAppId} imageId={imageId} />
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
