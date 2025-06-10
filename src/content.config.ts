import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const experiences = defineCollection({
    loader: glob({ pattern: '**/[^_]*.json', base: './src/data/experiences' }),
    schema: z.object({
        id: z.number(),
        institution: z.string(),
        position: z.string(),
        periodStart: z.string(),
        periodEnd: z.string().nullable(),
        description: z.string()
    })
});

const educations = defineCollection({
    loader: glob({ pattern: '**/[^_]*.json', base: './src/data/educations' }),
    schema: z.object({
        id: z.number(),
        institution: z.string(),
        institutionShort: z.string().optional(),
        name: z.string(),
        level: z.string(),
        periodStart: z.string(),
        periodEnd: z.string().nullable(),
        description: z.string()
    })
});

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

export const collections = { experiences: experiences, educations: educations, projects: projects };