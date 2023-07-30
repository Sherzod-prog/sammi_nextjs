import { calculateEstimatedTimeToRead } from '@/helpers/time.format';
import { Avatar, Divider, Box, Typography } from '@mui/material/';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ContentProps } from './content.props';

const Content = ({ blogs }: ContentProps) => {
	const router = useRouter();

	return (
		<Box width={'70%'}>
			{blogs.map(item => (
				<Box
					// 04:23
					key={item.id}
					sx={{
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						padding: '20px',
						marginTop: '20px',
						borderRadius: '8px',
						boxShadow: '0px 8px 16px rgba(255, 255, 255, .1)',
						cursor: 'pointer',
					}}
					onClick={() => router.push(`/blog/${item.slug}`)}
				>
					<Box position={'relative'} width={'100%'} height={'50vh'}>
						<Image
							src={item.image.url}
							alt={item.title}
							fill
							style={{ objectFit: 'cover', borderRadius: '10px' }}
						/>
					</Box>
					<Typography variant='h4' marginTop={'30px'}>
						{item.title}
					</Typography>
					<Typography variant='body1' color={'gray'}>
						{item.excerpt}
					</Typography>
					<Divider sx={{ marginTop: '30px' }} />
					<Box sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
						<Avatar alt={item.author.name} src={item.author.avatar.url} />
						<Typography>{item.author.name}</Typography>
						<Box>
							{format(new Date(item.createdAt), 'dd MMM, yyyy')} &#x2022;{' '}
							{calculateEstimatedTimeToRead(item.description.text)} min read
						</Box>
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default Content;
