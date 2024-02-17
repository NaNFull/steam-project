import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardHeader } from '@mui/material';
import ExpandMore from '@src/ui/mui/ExpandMore';

import type { Props } from './types';

function Header({ toggle, value }: Props) {
  return (
    <CardHeader
      title="Настройки данных таблицы"
      action={
        <ExpandMore aria-expanded={value} aria-label="Скрыть карточку" expand={value} onClick={toggle}>
          <ExpandMoreIcon />
        </ExpandMore>
      }
    />
  );
}

export default Header;
