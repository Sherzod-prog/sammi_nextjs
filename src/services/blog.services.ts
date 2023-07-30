import { BlogsType } from '@/interfaces/blogs.interface';
import { CategoriesType } from '@/interfaces/categories.interface';
import { id } from 'date-fns/locale';
import { request, gql } from 'graphql-request';
const graphApi = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

export const BlogsService = {
	async getAllBlogs() {
		const query = gql`
			query GetBlogs {
				blogs {
					excerpt
					id
					slug
					title
					createdAt
					image {
						url
					}
					author {
						name
						avatar {
							url
						}
					}
					category {
						label
						slug
					}
					description {
						text
					}
				}
			}
		`;
		const result = await request<{ blogs: BlogsType[] }>(graphApi, query);
		return result.blogs;
	},

	async getLatestBlogs() {
		const query = gql`
			query GetLatestBlog {
				blogs(last: 2) {
					id
					slug
					title
					createdAt
					image {
						url
					}
					description {
						text
					}
					author {
						name
						avatar {
							url
						}
					}
				}
			}
		`;
		const result = await request<{ blogs: BlogsType[] }>(graphApi, query);
		return result.blogs;
	},

	async getCategories() {
		const query = gql`
			query GetCategories {
				categories {
					slug
					label
				}
			}
		`;
		const result = await request<{ categories: CategoriesType[] }>(
			graphApi,
			query
		);
		return result.categories;
	},

	async getDetailedBlogs(slug: string) {
		const query = gql`
			query GetDetailedBlog($slug: String!) {
				blog(where: { slug: $slug }) {
					excerpt
					id
					slug
					title
					createdAt
					image {
						url
					}
					author {
						name
						avatar {
							url
						}
					}
					category {
						label
						slug
					}
					description {
						html
						text
					}
				}
			}
		`;
		const result = await request<{ blog: BlogsType }>(graphApi, query, {
			slug,
		});
		return result.blog;
	},
	async getDetailedCategoriesBlog(slug: string) {
		const query = gql`
			query getCategoriesBlog($slug: String!) {
				blogs(where: { category: { slug: $slug } }) {
					excerpt
					id
					slug
					title
					createdAt
					image {
						url
					}
					author {
						name
						avatar {
							url
						}
					}
					category {
						label
						slug
					}
					description {
						text
					}
				}
			}
		`;
		const result = await request<{ blogs: BlogsType[] }>(graphApi, query, {
			slug,
		});
		return result.blogs;
	},
};
