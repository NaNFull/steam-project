import { Badge, Skeleton } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { type Dispatch, memo, type MouseEvent, useCallback, useEffect, useState } from 'react';

type LoadImageFunction = (gameId: number, imageId: string) => Promise<string | undefined>;

const loadImage: LoadImageFunction = async function (gameId, imageId) {
  try {
    const url = new URL('http://localhost:3002/api/Tradeit/Images');

    url.searchParams.set('gameId', gameId.toString());
    url.searchParams.set('imageId', imageId.toString());

    const response = await fetch(url.href);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blob = await response.blob();

    return blob ? URL.createObjectURL(blob) : undefined;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

interface SkinImageProps {
  gameId: number;
  count: number;
  imageId?: string;
}

function SkinImage({ count, gameId, imageId }: SkinImageProps) {
  const [imgURL, setImgURL] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = useCallback<Dispatch<MouseEvent<HTMLElement>>>(({ currentTarget }) => {
    setAnchorEl(currentTarget);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (imageId) {
      loadImage(gameId, imageId)
        .then((response) => {
          if (response) {
            setImgURL(response);
          }
        })
        .catch((error) => console.error('Fetch error:', error));
    }
  }, [gameId, imageId]);

  if (!imageId) return <Skeleton height={50} variant="circular" width={50} />;

  return (
    <Badge
      badgeContent={count}
      color="error"
      sx={{
        '& > .MuiBadge-badge': {
          right: '15%',
          top: '90%'
        }
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
          vertical: 'top'
        }}
        sx={{
          pointerEvents: 'none'
        }}
        transformOrigin={{
          horizontal: 'left',
          vertical: 'top'
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
