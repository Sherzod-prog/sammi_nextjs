import { BlogsType } from '@/interfaces/blogs.interface';
import { CategoriesType } from '@/interfaces/categories.interface';

export interface SidebarProps {
	latestBlogs: BlogsType[];
	categories: CategoriesType[];
}
