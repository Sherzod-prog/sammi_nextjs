import { useState } from 'react';
import {
	AppBar,
	Box,
	Button,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Toolbar,
	Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { navItems } from '../config/constants';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Props {
	window?: () => Window;
}

const Navbar = ({ window }: Props) => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const router = useRouter();

	const handleDrawerToggle = () => {
		setMobileOpen(prevState => !prevState);
	};
	const container =
		window !== undefined ? () => window().document.body : undefined;

	const drawer = (
		<Box sx={{ textAlign: 'center' }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingX: '10px',
				}}
			>
				<Box
					onClick={() => router.push('/')}
					sx={{
						my: 2,
						display: 'flex',
						alignItems: 'center',
						gap: '5px',
					}}
				>
					<Image src={'favicon.svg'} alt={'logo'} width={50} height={50} />
					<Typography variant='h6'>Sammi</Typography>
				</Box>
				<CloseIcon onClick={handleDrawerToggle} sx={{ cursor: 'pointer' }} />
			</Box>
			<Divider />
			<List>
				{navItems.map(item => (
					<ListItem
						onClick={() => router.push(item.route)}
						key={item.route}
						disablePadding
					>
						<ListItemButton sx={{ textAlign: 'center' }}>
							<ListItemText primary={item.label} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<Box height={'10vh'} sx={{ display: 'flex' }}>
			<AppBar
				sx={{ height: '10vh', backgroundColor: '#141414' }}
				component='nav'
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Box
						onClick={() => router.push('/')}
						sx={{
							my: 2,
							alignItems: 'center',
							gap: '5px',
							flexGrow: 1,
							display: { xs: 'none', sm: 'flex' },
							cursor: 'pointer',
						}}
					>
						<Image src={'favicon.svg'} alt={'logo'} width={50} height={50} />
						<Typography variant='h5' component={'div'}>
							Sherz blog
						</Typography>
					</Box>
					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{navItems.map(item => (
							<Button
								onClick={() => router.push(item.route)}
								key={item.route}
								sx={{ color: '#fff' }}
							>
								{item.label}
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<Box component='nav'>
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: '100%',
						},
					}}
				>
					{drawer}
				</Drawer>
			</Box>
			Navbar
		</Box>
	);
};

export default Navbar;
