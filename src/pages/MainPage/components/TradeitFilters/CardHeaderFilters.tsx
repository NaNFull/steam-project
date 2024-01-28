import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { IconButtonProps } from '@mui/material';
import { Avatar, CardHeader, IconButton, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import type { DispatchWithoutAction } from 'react';

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

interface CardHeaderFiltersProps {
  toggle: DispatchWithoutAction;
  value: boolean;
}

function CardHeaderFilters({ toggle, value }: CardHeaderFiltersProps) {
  return (
    <CardHeader
      sx={{ bgcolor: grey[800] }}
      action={
        <ExpandMore aria-expanded={value} aria-label="Скрыть карточку" expand={value} onClick={toggle}>
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
  );
}

export default CardHeaderFilters;
