import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    location: z.string(),
    projectType: z.enum(['Custom Home', 'Renovation', 'Multi-Family', 'Light Commercial']),
    services: z.array(z.string()),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    summary: z.string(),
    coverImage: z.string(),
    gallery: z.array(z.string()).optional().default([]),
    ogImage: z.string().optional(),
    credits: z.string().optional(),
  }),
});

export const collections = { projects };
