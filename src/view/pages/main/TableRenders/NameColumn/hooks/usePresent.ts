import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

export const usePresent = (name: string) => {
  const { enqueueSnackbar } = useSnackbar();

  // Сохранение в буфер названия предмета
  const handleClick = useCallback(async () => {
    await window.navigator.clipboard.writeText(name);
    enqueueSnackbar(`Скопировано в буфер: ${name}`, { variant: 'success' });
  }, [enqueueSnackbar, name]);

  return { handleClick };
};
