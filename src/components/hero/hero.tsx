import { Avatar, Box, Typography } from '@mui/material';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import { format } from 'date-fns';
import { data } from '../config/constants';

import 'react-multi-carousel/lib/styles.css';
import { HeroProps } from './hero.props';
import { calculateEstimatedTimeToRead } from '@/helpers/time.format';
import { useRouter } from 'next/router';

const Hero = ({ blogs }: HeroProps) => {
	const router = useRouter();

	return (
		<Box width={'100%'} height={'70vh'} sx={{ backgroundColor: 'red' }}>
			<Carousel
				responsive={{
					mobile: {
						breakpoint: { max: 4000, min: 0 },
						items: 1,
					},
				}}
			>
				{blogs.map(item => (
					<Box
						key={item.id}
						sx={{ cursor: 'pointer' }}
						onClick={() => router.push(`/blog/${item.slug}`)}
					>
						<Box sx={{ position: 'relative', width: '100%', height: '70vh' }}>
							<Image
								src={item.image.url}
								alt={item.title}
								fill
								style={{ objectFit: 'cover' }}
							/>
							<Box
								sx={{
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									width: '100%',
									height: '100%',
									backgroundColor: 'rgba(0,0,0,0.6)',
								}}
							>
								<Box
									width={{ xs: '100%', sm: '70%' }}
									position={'relative'}
									color={'white'}
									sx={{
										top: '50%',
										transform: 'translateY(-50%)',
										paddingLeft: { xs: '10px', sm: '50px' },
									}}
									zIndex={999}
								>
									<Typography variant='h2'>{item.title}</Typography>
									<Typography variant='h5'>{item.excerpt}</Typography>
									<Box sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
										<Avatar
											alt={item.author.name}
											src={item.author.avatar.url}
										/>
										<Typography>{item.author.name}</Typography>
										<Box>
											{format(new Date(item.createdAt), 'dd MMM, yyyy')}{' '}
											&#x2022;{' '}
											{calculateEstimatedTimeToRead(item.description.text)} min
											read
										</Box>
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
				))}
			</Carousel>
		</Box>
	);
};

export default Hero;
