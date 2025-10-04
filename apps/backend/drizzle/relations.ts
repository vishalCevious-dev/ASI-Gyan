import { relations } from "drizzle-orm/relations";
import { users, blog, urlPost } from "./schema";

export const blogRelations = relations(blog, ({one}) => ({
	user: one(users, {
		fields: [blog.authorId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	blogs: many(blog),
	urlPosts: many(urlPost),
}));

export const urlPostRelations = relations(urlPost, ({one}) => ({
	user: one(users, {
		fields: [urlPost.authorId],
		references: [users.id]
	}),
}));