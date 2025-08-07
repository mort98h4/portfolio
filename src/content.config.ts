import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const experience = z.object({
    institution: z.string(),
    position: z.string(),
    periodStart: z.string(),
    periodEnd: z.string().nullable(),
    description: z.string(),
    skills: z.array(
        z.string()
    )
});

const education = z.object({
    institution: z.string(),
    institutionShort: z.string().optional(),
    name: z.string(),
    level: z.string(),
    periodStart: z.string(),
    periodEnd: z.string().nullable(),
    description: z.string(),
    skills: z.array(
        z.string()
    )
});

const skill = z.object({
    type: z.string(),
    text: z.string()
});

const experiences = defineCollection({
    loader: file('./src/content/data/experiences.json'),
    schema: z.object({
        id: z.number(),
        da: experience,
        en: experience
    })
});

const references = defineCollection({
    loader: file('./src/content/data/references.json'),
    schema: z.object({
        id: z.number(),
        name: z.string(),
        currentPosition: z.string(),
        formerPosition: z.string().nullable(),
        phone: z.object({
            href: z.string(),
            text: z.string()
        }),
        email: z.object({
            href: z.string(),
            text: z.string()
        })
    })
});

const educations = defineCollection({
    loader: file('./src/content/data/educations.json'),
    schema: z.object({
        id: z.number(),
        da: education,
        en: education
    })
});

const skills = defineCollection({
    loader: file("./src/content/data/skills.json"),
    schema: z.object({
        id: z.number(),
        icon: z.string().optional(),
        da: skill,
        en: skill
    })
});

const projects = defineCollection({
  loader: file('./public/data/projects.json'),
  schema: z.object({
    id: z.number(),
    name: z.string(),
    description: z.object({
        da: z.string(),
        en: z.string()
    }),
    urls: z.array(
        z.object({
            text: z.string(),
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
        z.string()
    ),
    imagePath: z.string().optional(),
    images: z.array(
        z.object({
            fileName: z.string(),
            alt: z.object({
                da: z.string(),
                en: z.string()
            })
        })
    ),
  })
});

export const collections = { experiences: experiences, references: references, educations: educations, skills: skills, projects: projects };