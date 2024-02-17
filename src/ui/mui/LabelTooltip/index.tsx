import HelpIcon from '@mui/icons-material/Help';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export interface Props {
  text: string;
  textTooltip: string;
}

const LabelTooltip = ({ text, textTooltip }: Props) => (
  <Typography alignItems="center" display="flex">
    {text}
    <Tooltip title={textTooltip}>
      <IconButton>
        <HelpIcon sx={{ height: 20, width: 20 }} />
      </IconButton>
    </Tooltip>
  </Typography>
);

export default LabelTooltip;
