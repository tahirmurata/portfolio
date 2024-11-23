// import { z, defineCollection } from 'astro:content';
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: "**\/*.md", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        tags: z.array(z.string()),
        image: z.string().optional(),
        slug: z.string(),
    }),
});

const projects = defineCollection({
    loader: file("./src/content/projects/project.json"),
    schema: z.object({
        title: z.string(),
        tags: z.array(z.enum(["Go", "PostgreSQL", "Vue"])),
        description: z.string(),
        links:
            z.array(z.object({
                name: z.enum(["GitHub", "Go Package", "Blog",]),
                url: z.string()
            }))
    }),
});

export const collections = {
    blog,
    projects,
};