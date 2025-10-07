import { relations } from "drizzle-orm/relations";
import { users, blog } from "./schema";

export const blogRelations = relations(blog, ({one}) => ({
	user: one(users, {
		fields: [blog.authorId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	blogs: many(blog),
}));