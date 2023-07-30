import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { SidebarProps } from './sidebar.props';

const Sidebar = ({ latestBlogs, categories }: SidebarProps) => {
	const router = useRouter();
	return (
		<>
			<Box width={'30%'}>
				<Box
					position={'sticky'}
					top={'100px'}
					sx={{ transition: 'all 0.3s ease' }}
				>
					<Box padding={'20px'} border={'1px solid gray'} borderRadius={'8px'}>
						<Typography variant='h5'>Latest blog</Typography>

						<Box>
							{latestBlogs.map(blog => (
								<Box
									sx={{ cursor: 'pointer' }}
									onClick={() => router.push(`/blog/${blog.slug}`)}
									key={blog.id}
									marginTop={'20px'}
								>
									<Box
										sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
									>
										<Image
											src={blog.image.url}
											alt={blog.title}
											width={100}
											height={100}
											style={{ objectFit: 'cover', borderRadius: '8px' }}
										/>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												marginTop: '20px',
											}}
										>
											<Typography variant='body1'>{blog.title}</Typography>
											<Box
												sx={{
													display: 'flex',
													gap: '10px',
													marginTop: '20px',
												}}
											>
												<Avatar
													src={blog.author.avatar.url}
													alt={blog.author.name}
												/>
												<Box>
													<Typography variant='body2'>
														{blog.author.name}
													</Typography>
													<Box sx={{ opacity: '0.7' }}>
														{format(new Date(blog.createdAt), 'dd MMM, yyyy')}
													</Box>
												</Box>
											</Box>
										</Box>
									</Box>
									<Divider sx={{ marginTop: '20px' }} />
								</Box>
							))}
						</Box>
					</Box>
					<Box
						padding={'20px'}
						border={'1px solid gray'}
						marginTop={'20px'}
						borderRadius={'8px'}
					>
						<Typography>Category</Typography>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								marginTop: '20px',
							}}
						>
							{categories.map(nav => (
								<Fragment key={nav.slug}>
									<Button
										onClick={() => router.push(`/category/${nav.slug}`)}
										fullWidth
										sx={{ justifyContent: 'flex-start', height: '50px' }}
									>
										{nav.label}
									</Button>
									<Divider />
								</Fragment>
							))}
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Sidebar;
