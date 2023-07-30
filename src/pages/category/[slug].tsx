import { Box } from '@mui/material';
import { Content, Sidebar } from '@/components';
import { BlogsType } from '@/interfaces/blogs.interface';
import { CategoriesType } from '@/interfaces/categories.interface';
import Layout from '@/layout/layout';
import { BlogsService } from '@/services/blog.services';
import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import SEO from '@/layout/seo/seo';

const CategoryDetailedPage = ({
	blogs,
	latestBlogs,
	categories,
}: DetailedCategriesPageProps) => {
	const router = useRouter();

	return (
		<SEO metaTitle={`${router.query.slug}-cetagory`}>
			<Layout>
				<Box
					sx={{
						display: 'flex',
						gap: '20px',
						flexDirection: { xs: 'column', md: 'row' },
						padding: '20px',
					}}
				>
					<Sidebar latestBlogs={latestBlogs} categories={categories} />
					<Content blogs={blogs} />
				</Box>
			</Layout>
		</SEO>
	);
};

export default CategoryDetailedPage;

export const getServerSideProps: GetServerSideProps<
	DetailedCategriesPageProps
> = async ({ query }) => {
	const blogs = await BlogsService.getDetailedCategoriesBlog(
		query.slug as string
	);
	const latestBlogs = await BlogsService.getLatestBlogs();
	const categories = await BlogsService.getCategories();

	return {
		props: {
			blogs,
			latestBlogs,
			categories,
		},
	};
};

interface DetailedCategriesPageProps {
	blogs: BlogsType[];
	latestBlogs: BlogsType[];
	categories: CategoriesType[];
}
