import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/projects" }),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    body: z.string(),
    urls: z.array(
        z.object({
            title: z.string(),
            href: z.string().url()
        })
    ),
    repositories: z.array(
        z.object({
            name: z.string(),
            href: z.string().url()
        })
    ),
    technologies: z.array(
        z.object(
            {
                name: z.string(),
                icon: z.string().optional()
            }
        )
    ),
    image: z.string().optional(),
  })
});

export const collections = { projects: projects };