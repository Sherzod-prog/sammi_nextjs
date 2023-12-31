import { CategoriesType } from '@/interfaces/categories.interface';
import Layout from '@/layout/layout';
import SEO from '@/layout/seo/seo';
import { BlogsService } from '@/services/blog.services';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

const Index = ({ categories }: CategoryPageProps) => {
	const router = useRouter();

	return (
		<SEO metaTitle='All Categories'>
			<Layout>
				<Box
					width={{ xs: '100%', md: '80%' }}
					marginX={'auto'}
					marginTop={'10vh'}
					borderRadius={'8px'}
					height={{ xs: '30vh', md: '50vh' }}
					sx={{
						backgroundColor: 'black',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						rowGap: '10px',
					}}
				>
					<Typography variant='h3' fontFamily={'cursive'}>
						All Categories
					</Typography>
					<ButtonGroup
						variant='contained'
						aria-label='outlined primary button group'
					>
						{categories.map(item => (
							<Button
								key={item.slug}
								onClick={() => router.push(`/category/${item.slug}`)}
							>
								# {item.label}
							</Button>
						))}
					</ButtonGroup>
				</Box>
			</Layout>
		</SEO>
	);
};

export default Index;

export const getServerSideProps: GetServerSideProps<
	CategoryPageProps
> = async () => {
	const categories = await BlogsService.getCategories();
	return {
		props: {
			categories,
		},
	};
};

interface CategoryPageProps {
	categories: CategoriesType[];
}
