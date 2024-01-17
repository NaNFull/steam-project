import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { IconButtonProps } from '@mui/material';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  styled
} from '@mui/material';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { useSteamStore } from '@src/store/steam.store';
import { useBoolean } from 'usehooks-ts';

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

function TradeitFilters() {
  const { toggle: toggleExpanded, value: expanded } = useBoolean(true);
  const getTradeitData = useSteamStore(({ getTradeitData }) => getTradeitData);

  return (
    <Card>
      <CardHeader
        sx={{ bgcolor: grey[800] }}
        action={
          <ExpandMore aria-expanded={expanded} aria-label="show more" expand={expanded} onClick={toggleExpanded}>
            <ExpandMoreIcon />
          </ExpandMore>
        }
        avatar={
          <Avatar
            aria-label="recipe"
            src="https://tradeit.gg/_ipx/w_170/images/logo-full.svg"
            sx={{ borderRadius: 0, height: 32, width: 'auto' }}
          />
        }
      />
      <Collapse unmountOnExit in={expanded} timeout="auto">
        <CardContent>
          <Typography gutterBottom id="input-slider" mt={1}>
            temp
          </Typography>
          <Typography gutterBottom id="input-slider" mt={1}>
            temp
          </Typography>
          <Typography gutterBottom id="input-slider" mt={1}>
            temp
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'end' }}>
          <Button variant="contained" onClick={getTradeitData}>
            Загрузить данные с Tradeit
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );
}

export default TradeitFilters;
