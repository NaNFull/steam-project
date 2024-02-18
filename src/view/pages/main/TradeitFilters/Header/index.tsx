import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, CardHeader } from '@mui/material';
import { grey } from '@mui/material/colors';
import ExpandMore from '@src/ui/mui/ExpandMore';

import type { Props } from './types';

function Header({ toggle, value }: Props) {
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

export default Header;
