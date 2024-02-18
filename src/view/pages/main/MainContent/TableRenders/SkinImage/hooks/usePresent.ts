import type { Dispatch, MouseEvent } from 'react';
import { useCallback, useState } from 'react';

export const usePresent = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = useCallback<Dispatch<MouseEvent<HTMLElement>>>(({ currentTarget }) => {
    setAnchorEl(currentTarget);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return {
    anchorEl,
    handlePopoverClose,
    handlePopoverOpen,
    open: Boolean(anchorEl),
  };
};
