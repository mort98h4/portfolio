import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const experiences = defineCollection({
    loader: file('./public/data/experiences.json'),
    schema: z.object({
        id: z.number(),
        institution: z.string(),
        position: z.string(),
        periodStart: z.string(),
        periodEnd: z.string().nullable(),
        description: z.string(),
        skills: z.array(
            z.object(
                {
                    name: z.string(),
                    icon: z.string().optional()
                }
            )
        )
    })
});

const educations = defineCollection({
    loader: file('./public/data/educations.json'),
    schema: z.object({
        id: z.number(),
        institution: z.string(),
        institutionShort: z.string().optional(),
        name: z.string(),
        level: z.string(),
        periodStart: z.string(),
        periodEnd: z.string().nullable(),
        description: z.string(),
        skills: z.array(
            z.object(
                {
                    name: z.string(),
                    icon: z.string().optional()
                }
            )
        )
    })
});

const skills = defineCollection({
    loader: file("public/data/skills.json"),
    schema: z.object({
        id: z.number(),
        type: z.string(),
        text: z.string(),
        icon: z.string().optional()
    })
});

const projects = defineCollection({
  loader: file('./public/data/projects.json'),
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

export const collections = { experiences: experiences, educations: educations, skills: skills, projects: projects };