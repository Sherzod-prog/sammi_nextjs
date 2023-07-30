import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { format } from 'date-fns';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
	return (
		<Box
			padding='20px'
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				backgroundColor: '#141414',
				color: 'white',
			}}
			borderTop={'1px solid rgba(255, 255, 255, 0.5)'}
		>
			<Typography>{format(new Date(), 'yyyy')} yil SAMMI</Typography>
			<Box sx={{ display: 'flex', gap: '10px' }}>
				<TelegramIcon />
				<InstagramIcon />
				<YouTubeIcon />
			</Box>
		</Box>
	);
};

export default Footer;
