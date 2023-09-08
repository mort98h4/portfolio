import { z, defineCollection } from 'astro:content';

const projects = defineCollection({
    type: 'data',
    schema: z.object({
        id: z.number(),
        title: z.string(),
        urls: z.array(
                z.object({
                    title: z.string(),
                    href: z.string()
                })
            ),
        image: z.string().optional(),
    })
});

export const collections = {
    'projects': projects,
};