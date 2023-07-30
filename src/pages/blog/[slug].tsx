import { Sidebar } from '@/components';
import { calculateEstimatedTimeToRead } from '@/helpers/time.format';
import { BlogsType } from '@/interfaces/blogs.interface';
import { CategoriesType } from '@/interfaces/categories.interface';
import Layout from '@/layout/layout';
import SEO from '@/layout/seo/seo';
import { BlogsService } from '@/services/blog.services';
import { Avatar, Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

const DetailedBlogsPage = ({
	blog,
	categories,
	latestBlogs,
}: DetailedBlogsPageProps) => {
	return (
		<SEO metaTitle={blog.title}>
			<Layout>
				<Box
					sx={{
						display: 'flex',
						gap: '20px',
						flexDirection: { xs: 'column', md: 'row' },
						padding: '20px',
					}}
				>
					<Box width={{ xs: '100%', md: '70%' }}>
						<Box
							sx={{
								backgroundColor: 'black',
								padding: '20px',
								borderRadius: '8px',
								boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.1)',
							}}
							position={'relative'}
							width={'100%'}
							height={{ xs: '30vh', md: '50vh' }}
						>
							<Image
								src={blog.image.url}
								alt={blog.title}
								fill
								style={{ objectFit: 'cover', borderRadius: '10px' }}
							/>
						</Box>
						<Box display={'flex'} flexDirection={'column'} rowGap={'10px'}>
							<Box sx={{ display: 'flex', gap: '10px', marginTop: '40px' }}>
								<Avatar alt={blog.author.name} src={blog.author.avatar.url} />
								<Typography>{blog.author.name}</Typography>
								<Box>
									{format(new Date(blog.createdAt), 'dd MMM, yyyy')} &#x2022;{' '}
									{calculateEstimatedTimeToRead(blog.description.text)} min read
								</Box>
							</Box>
							<Typography variant='h3' marginTop={'20px'}>
								{' '}
								{blog.title}
							</Typography>
							<Typography color={'gray'}>{blog.excerpt}</Typography>
							<Divider />
							<div
								style={{ opacity: '0.8' }}
								dangerouslySetInnerHTML={{ __html: blog.description.html }}
							/>
						</Box>
					</Box>
					<Sidebar latestBlogs={latestBlogs} categories={categories} />
				</Box>
			</Layout>
		</SEO>
	);
};

export default DetailedBlogsPage;

export const getServerSideProps: GetServerSideProps<
	DetailedBlogsPageProps
> = async ({ query }) => {
	const blog = await BlogsService.getDetailedBlogs(query.slug as string);
	const latestBlogs = await BlogsService.getLatestBlogs();
	const categories = await BlogsService.getCategories();

	return {
		props: {
			blog,
			latestBlogs,
			categories,
		},
	};
};

interface DetailedBlogsPageProps {
	blog: BlogsType;
	latestBlogs: BlogsType[];
	categories: CategoriesType[];
}
