import { Badge } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { memo } from 'react';

import { usePresent } from './hooks/usePresent';
import type { Props } from './types';

function SkinImage({ counts, imgURL }: Props) {
  const { anchorEl, handlePopoverClose, handlePopoverOpen, open } = usePresent();

  return (
    <Badge
      badgeContent={counts}
      color="error"
      sx={{
        '& > .MuiBadge-badge': {
          right: '15%',
          top: '90%',
        },
      }}
    >
      <Typography
        aria-haspopup="true"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <img alt="avatar" className="skin_img" loading="lazy" src={imgURL} style={{ borderRadius: '50%' }} />
      </Typography>
      <Popover
        disableRestoreFocus
        anchorEl={anchorEl}
        id="mouse-over-popover"
        open={open}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
        sx={{
          pointerEvents: 'none',
        }}
        transformOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
        onClose={handlePopoverClose}
      >
        <img
          alt="avatar"
          className="skin_img_popover"
          height={400}
          loading="lazy"
          src={imgURL}
          style={{ borderRadius: '50%' }}
        />
      </Popover>
    </Badge>
  );
}

export default memo(SkinImage);
